/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as ArtistService from "./artists.service"
import { Artist } from "./artist.interface";
import { Artists } from "./artists.interface";
import pool from "../db";
import { QueryConfig, QueryResult } from "pg";

/**
 * Router Definition
 */

export const artistsRouter = express.Router();

/**
 * Controller Definitions
 */


// GET artists

artistsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const { userName } = req.session
        if (!userName) {
            return res.status(401).send("not authorized")
        }

        const userQuery: QueryConfig = {
            text: "SELECT user_id FROM users WHERE user_name= $1",
            values: [ userName ]
        }
        const userResult: QueryResult = await pool.query(userQuery)

        const artistQuery: QueryConfig = {
            text: "SELECT * FROM artists WHERE user_id = $1",
            values: [ userResult.rows[0].user_id ]
        } 
        const artistResult: QueryResult = await pool.query(artistQuery)
        // console.log(artistResult.rows)

        res.status(200).send(artistResult.rows)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

// GET artists/:id

// POST artists

// should this post request be used for when a user logs in => we post the data to the db?

// PUT artists/:id

// DELETE artists/:id