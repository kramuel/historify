/**
 * Required External Modules and Interfaces
 */


import express, { Request, Response } from "express";
import pool from "../db";
import { QueryConfig, QueryResult } from "pg";

/**
 * Router Definition
 */

export const tracksRouter = express.Router();

/**
 * Controller Definitions
 */


// GET artists

tracksRouter.get("/", async (req: Request, res: Response) => {
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

        const tracksQuery: QueryConfig = {
            text: "SELECT * FROM tracks WHERE user_id = $1",
            values: [ userResult.rows[0].user_id ]
        } 
        const tracksResult: QueryResult = await pool.query(tracksQuery)
        // console.log(artistResult.rows)

        res.status(200).send(tracksResult.rows)
    } catch (e) {
        res.status(500).send(e.message)
    }
})