/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as ArtistService from "./artists.service"
import { Artist } from "./artist.interface";
import { Artists } from "./artists.interface";
import pool from "../db";

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
        const {userName} = req.session
        console.log("session username = " + userName);

        if (!userName) {
            return res.status(505).send("not authorized")
            
        }
        const querystringone = "SELECT user_id FROM users WHERE user_name='" + userName + "';"
        //const artists: Artist[] = await ArtistService.findAll();
        const { rows: rowsone } = await pool.query(querystringone)
        console.log(rowsone);

        const querystringtwo = "SELECT * FROM artists WHERE user_id='" + rowsone[0].user_id + "';"
        const { rows: rowstwo } = await pool.query(querystringtwo)
        console.log(rowstwo);

        const artists = {
            name: "Bon Jobi"
        }

        res.status(200).send(rowstwo)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

// GET artists/:id

// POST artists

// PUT artists/:id

// DELETE artists/:id