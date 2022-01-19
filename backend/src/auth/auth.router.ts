/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import fetch from "cross-fetch";
import { generateRandomString } from "../utils/randomString";
import { stateKey, client_id, redirect_uri, client_secret } from "..";
import pool from "../db";





const storeSessionUserName = (req: Request, userName) => {
    req.session.userName = userName
    console.log("did we ARRIVE=======================");
    console.log(userName);
    

}

const addOrUpdateUserinDB = async (userQueryRows, access_token, refresh_token, user_name) => {
    if (userQueryRows[0]) {

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
        console.log(typeof (req.session))
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
            console.log("user already has session?? = ", userName);
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

authRouter.get('/callback', async function (req: Request, res: Response) {
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

        try {
            const tokenresponse = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    "Authorization": "Basic " + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: authBody,
            })
            const tokendata = await tokenresponse.json()
            console.log(tokendata)

            const access_token = tokendata.access_token
            const refresh_token = tokendata.refresh_token

            //check if user exists
            const userresponse = await fetch("https://api.spotify.com/v1/me", {
                headers: {
                    "Authorization": "Bearer " + access_token
                }
            })
            const userdata = await userresponse.json()
            console.log(userdata)

            const user_name = userdata.id

            const userQuery = "SELECT * FROM users WHERE user_name = '" + user_name + "';"
            const { rows: userQueryRows } = await pool.query(userQuery)

            console.log("db_user = ", userQueryRows[0])

            // await this or no
            addOrUpdateUserinDB(userQueryRows, access_token, refresh_token, user_name)


            // get artists and tracks 8)
            const params = new URLSearchParams()
            params.append('time_range', 'short_term')
            params.append('limit', '5')
            params.append('offset', '0')

            const artistsresponse = await fetch('https://api.spotify.com/v1/me/top/artists?' + params,
                {
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    }
                })
            const artistdata = await artistsresponse.json()

            console.log(artistdata)
            const topartist = artistdata.items

            let count = 1
            //fixa tablen så jag inte lägger till session när den redan finns elelr nåt
            topartist.forEach(async (artist: any) => {
                const instertstring = "INSERT INTO artists (artist_name, image_url, rank, user_id, link) VALUES('"
                    + artist.name + "','"
                    + artist.images[1].url
                    + "','" + count.toString()
                    + "','" + userQueryRows[0].user_id
                    + "','" + artist.external_urls.spotify
                    + "');"
                try {
                    await pool.query(instertstring)
                } catch (error) {
                    console.error(error);

                }
                count++
            });


            storeSessionUserName(req, user_name)
            res.redirect("http://localhost:3005/profile")
        } catch (error) {
            console.error("token, user or artists fetch error: ", error);
        }
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