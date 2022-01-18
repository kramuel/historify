import express, { Request, Response } from 'express';
import cors from 'cors';
import { Pool } from 'pg'; // uses env to connect
import { generateRandomString } from './utils/randomString';
import dotenv from 'dotenv'
import fetch from 'cross-fetch'
import { URLSearchParams } from 'url';
import cookieParser from 'cookie-parser';



dotenv.config({ path: '/home/kramuel/Projects/historify/.env' })

const port = parseInt(process.env.PORT) || parseInt(process.env.API_PORT)
const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const redirect_uri = `http://localhost:${port}/auth/callback`

const app = express()
app.use(cors())
app.use(cookieParser())
const pool = new Pool()


const stateKey = 'spotify_auth_state';



app.get('/now', async (req: Request, res: Response) => {
    try {
        const { rows } = await pool.query('SELECT NOW()')
        res.status(200).send(rows[0].now)
    } catch (err) {
        console.log(err)
    }
})

app.get('/login', function (req: Request, res: Response) {

    const state: string = generateRandomString(16);
    const scope: string = 'user-top-read playlist-read-private';
    res.cookie(stateKey, state);

    const params = new URLSearchParams()
    params.append('response_type', 'code')
    params.append('client_id', client_id)
    params.append('scope', scope)
    params.append('redirect_uri', redirect_uri)
    params.append('state', state)
    res.redirect('https://accounts.spotify.com/authorize?' +
        params);
});


app.get('/auth/callback', function (req: Request, res: Response) {
    console.log("callback 1")
    // check req.params.state if equal to random state, if not - >terminate

    // check if error etc

    const code = req.query.code as string; // type check lmao
    const queryState = req.query.state || null;
    console.log("code = " + code)
    console.log("state = " + queryState)

    const storedState = req.cookies ? req.cookies[stateKey] : null;
    console.log("storedState = " + storedState)
    if (queryState === null || storedState !== queryState) {
        res.redirect('/#' + (new URLSearchParams({ 'error': 'state_mismatch' })))

        console.warn("state mismatch, could be intercepted");
    } else {
        // state was OK, cookie not needed anymore?
        res.clearCookie(stateKey)

        const authBody = new URLSearchParams();
        authBody.append('code', code)
        authBody.append('redirect_uri', redirect_uri)
        authBody.append('grant_type', 'authorization_code')

        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                "Authorization": "Basic " + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: authBody,
        })
            .then((response) => response.json())
            .then(data => {
                console.log(data)

                const access_token = data.access_token
                const refresh_token = data.refresh_token

                // what does the '?' do
                res.redirect('http://localhost:3005/homepage?'+ new URLSearchParams({'access_token': access_token, 'refresh_token': refresh_token}))

                // const params = new URLSearchParams()
                // params.append('time_range', 'short_term')
                // params.append('limit', '5')
                // params.append('offset', '0')

                // fetch('https://api.spotify.com/v1/me/top/artists?' + params,
                //     {
                //         headers: {
                //             'Authorization': 'Bearer ' + access_token
                //         }
                //     })
                //     .then(res => res.json())
                //     .then(data => {
                //         const items = data.items
                //         let index = 1
                //         items.forEach(element => {
                //             console.log(index, ' ', element.name)
                //             index++
                //         });
                //     })
                //     .catch(err => console.error(err))

            })
            .catch((err) => {
                // Do somthing
                console.error('Error: ', err)
            })
    }

});

// app.get('/callback', function (req: Request, res: Response) {
//     // check req.params.state if equal to random state, if not - >terminate

//     // check if error etc
//     authCode = req.params.code;
// })




app.listen(port, () => {
    console.log(`api listening at http://0.0.0.0:${port}`)

})

// The main one
// user-top-read
    // Get a Users Top Artists and Tracks

//maybe these will be used
// user-read-private
    // Get Current Users Profile

// user-read-recently-played
    // Get Current User's Recently Played Tracks




// AUTH flow-chart
// https://developer.spotify.com/assets/AuthG_AuthoriztionCode.png
