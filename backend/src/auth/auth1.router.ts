/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import fetch from "cross-fetch";
import { generateRandomString } from "../utils/randomString";
import { stateKey, client_id, redirect_uri, client_secret } from "..";
import pool from "../db";
import { SessionWithUser } from "../../types/sessionwithuser";




const storeSessionUserName = (req: Request, userName) => {
    req.session.userName = userName
    console.log("did we ARRIVE=======================");
    
}

/**
 * Router Definition
 */

export const authRouter = express.Router();
// const pool = new Pool() 
// should export pool from somewhere(db.ts) but didnt get it working

/**
 * Controller Definitions
 */


// GET 
authRouter.get('/now', async (req: Request, res: Response) => {
    try {
        console.log(typeof(req.session))
        const { rows } = await pool.query('SELECT NOW()')
        res.status(200).send(rows[0].now)
    } catch (err) {
        console.log(err)
    }
})

authRouter.get("/login", async (req: Request, res: Response) => {



    try {
        const { userName } = req.session
        if (userName) {
            console.log("user already has session??");
            res.redirect("http://localhost:3005/homepage")

        }

        const state: string = generateRandomString(16);
        const scope: string = 'user-top-read';
        res.cookie(stateKey, state, { maxAge: 20000 }); // httponly no work?

        const params = new URLSearchParams()
        params.append('response_type', 'code')
        params.append('client_id', client_id)
        params.append('scope', scope)
        params.append('redirect_uri', redirect_uri)
        params.append('state', state)
        res.redirect('https://accounts.spotify.com/authorize?' + params);
    } catch (e) {
        res.status(500).send(e.message)
    }
})

authRouter.get('/callback', function (req: Request, res: Response) {
    
    const code = req.query.code as string;
    const queryState = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;
    console.log("== cookiestate = ", storedState, "|| querystate= ", queryState)

    if (queryState === null || storedState !== queryState) {
        res.redirect('/#' + (new URLSearchParams({ 'error': 'state_mismatch' })))

        console.warn("state mismatch, could be intercepted");
    } else {
        res.clearCookie(stateKey)

        const authBody = new URLSearchParams();
        authBody.append('code', code)
        authBody.append('redirect_uri', redirect_uri)
        authBody.append('grant_type', 'authorization_code')
        let userName = ""

        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                "Authorization": "Basic " + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: authBody,
        })
            .then((response) => response.json())
            .then( data => {
                console.log(data)

                const access_token = data.access_token
                const refresh_token = data.refresh_token

                //check if user exists
                fetch("https://api.spotify.com/v1/me", {
                    headers: {
                        "Authorization": "Bearer " + access_token
                    }
                })
                    .then((res) => res.json())
                    .then(async (data) => {
                        console.log(data)
                        const user_name = data.id
                        userName = user_name
                        // 
                        

                        const querystring = "SELECT * FROM users WHERE user_name = '" + user_name + "';"
                        const { rows: queryrows } = await pool.query(querystring)


                        // OBS bör ha try catch, bör köra antingen then eller await
                        // bör nog göra om allt till try catch awat för att levla ut det 
                        // = mer tydligt
                        console.log("db_user = ", queryrows[0])
                        if (queryrows[0]) {

                            // user already exists
                            // update access_token??
                            const updatestring = "UPDATE users SET access_token = '" + access_token + "', refresh_token = '" + refresh_token + "' WHERE user_name = '" + user_name + "' RETURNING user_name;"
                            // testa med \ för ny rad ELELR testa med typ node-postgres och gör obejcts
                            // https://node-postgres.com/features/queries
                            const { rows: updaterows } = await pool.query(updatestring)
                            if (updaterows[0]) {
                                console.log("updaterows response = ", updaterows[0])
                            }
                        } else {
                            // add new user

                            const insertstring = "INSERT INTO users (user_name, access_token, refresh_token) VALUES ('" + user_name + "','" + access_token + "','" + refresh_token + "');"
                            // testa med \ för ny rad ELELR testa med typ node-postgres och gör obejcts
                            // https://node-postgres.com/features/queries
                            const { rows: insertrows } = await pool.query(insertstring)
                            if (insertrows[0]) {
                                console.log("insertrows response = ", insertrows[0])
                            }
                        }


                        // get artists and tracks 8)

                        const querystringone = "SELECT user_id FROM users WHERE user_name='" + user_name + "';"
                        //const artists: Artist[] = await ArtistService.findAll();
                        const { rows: user_row } = await pool.query(querystringone)
                        console.log("user_row = " + user_row);
        
                        const params = new URLSearchParams()
                        params.append('time_range', 'short_term')
                        params.append('limit', '5')
                        params.append('offset', '0')
        
                        fetch('https://api.spotify.com/v1/me/top/artists?' + params,
                            {
                                headers: {
                                    'Authorization': 'Bearer ' + access_token
                                }
                            })
                            .then(res => res.json())
                            .then(data => {
                                let newArtistList = []
                                console.log(data)
                                const topartist = data.items
        
        
                                let count = 1
                                topartist.forEach((artist: any) => {
                                    let newArtist = {
                                        name: artist.name,
                                        image: artist.images[1].url,
                                        index: count,
                                        imageSize: 320
                                    }
                                    const instertstring = "INSERT INTO artists (artist_name, image_url, rank, user_id, link) VALUES('" + artist.name + "','" + artist.images[1].url + "','" + count.toString() + "','" + user_row[0].user_id + "','" + artist.external_urls.spotify+"');"
                                    pool.query(instertstring)
                                        .then()
                                        .catch(e => console.error(e))  
                                    
                                    newArtistList.push(newArtist)
                                    count++
                                });
        
                            })
                            .catch(err => console.error(err))

                    })
                    .catch(e => console.error(e))

                // == new user has token saved in db OR token is updated in db

                // send cookie to browser to remember who is current user

                // check cookie and use access_token to fetch data for them

                // redirect to frontend after sending cookie

                // user (with cookie in browser) can now fetch data from artist router
                // cookie saved in users table ( hash of username+user_id??)



            })
            .catch((err) => {
                console.error('Error: ', err)
            })
        
        // storeSessionUserName(req, userName)
        res.redirect("http://localhost:5005/")
    }

});



authRouter.get("/logout", async (req: Request, res: Response) => {
    try {
        res.status(200).send("not yet implemented, please log out via spotify.com")
    } catch (e) {
        res.status(500).send(e.message)
    }
})

// POST 

// PUT 

// DELETE 