/**
 * Required External Modules
 */
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import session from 'express-session'
import connectPgSimple from 'connect-pg-simple';
import pool from './db';
import { authRouter } from './auth/auth.router';
import { artistsRouter } from './artists/artists.router';

/**
 * App Variables
 */

dotenv.config({ path: '/home/kramuel/Projects/historify/.env' })
export const PORT: number = parseInt(process.env.API_PORT as string)
export const client_id: string = process.env.SPOTIFY_CLIENT_ID
export const client_secret: string = process.env.SPOTIFY_CLIENT_SECRET
export const redirect_uri: string = `http://localhost:${PORT}/auth/callback`
export const stateKey: string = 'spotify_auth_state';
const secret: string = process.env.COOKIE_SECRET
const conString: string = "pg://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOST + ":" + process.env.DB_PORT + "/" + process.env.DB_NAME

/**
 *  App Configuration
 */


const app = express()
app.use(cors({credentials: true, origin: ["http://localhost:3005", "http://localhost:5005"]}))
app.use(cookieParser())


const PGSession = connectPgSimple(session)
app.use(session({
    store: new PGSession({
        pool: pool,
        tableName: 'session',
        conString: conString,
        
    }),
    secret: secret,
    cookie: {
        secure: false, // https
        // httpOnly: true,
        // sameSite: true,
        maxAge: 24 * 60 * 60 * 1000,
        
    },
    saveUninitialized: true,
    resave: false,
}))

app.use((req,res,next) => {
    // if (!req.session.userName) {
    //     console.log("SESSION=== ", req.session);
        
    // }
    // res.setHeader('Access-Control-Allow-Credentials', 'include')
    next();
})
// USE WITH NGINGX LATER
// location /fonts {
//     # this will echo back the origin header
//     if ($http_origin ~ "example.org$") {
//         add_header "Access-Control-Allow-Origin" $http_origin;
//     }
// }


app.use(helmet())
/*
https://www.reddit.com/r/node/comments/ksth2o/express_helmet_the_musthave_seatbelt_for_a_secure/
-CSP (Content-Security-Policy) header is a double- edge sword. 
-You need to know what it can do or you can run into some weird bugs, 
-and Helmet just abstracts it.
 
-Just want to mention: many features of helmet are only useful if 
-you're not serving your app through something like NGINX.
So I wouldn't call it "must-have".
*/

// remember to add HTTPS ( SSL )

/**
 * Server Activation
 */




app.use("/auth", authRouter)
app.use("/artists", artistsRouter)

app.listen(PORT, () => {
    console.log(`api listening at http://0.0.0.0:${PORT}`)

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
