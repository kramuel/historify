/**
 * Required External Modules and Interfaces
 */


import express, { Request, Response } from "express";
import pool from "../db";
import { QueryConfig, QueryResult } from "pg";
import { SelectCountry } from "..";

/**
 * Router Definition
 */


export const playlistsRouter = express.Router();

/**
 * Controller Definitions
 */

playlistsRouter.get("/", (req,res)=>{
    res.send("hello")
})

playlistsRouter.get("/:country", async (req: Request, res: Response) => {
    const country = req.params.country
    console.log(country);
    
    try {
        const { userName } = req.session
        if (!userName) {
            return res.status(401).send("not authorized")
        }


        const playlistQuery: QueryConfig = {
            text: "SELECT * FROM tracks WHERE user_id = $1",
            values: [ SelectCountry[country].val ]
        } 
        const playlistResult: QueryResult = await pool.query(playlistQuery)
        // console.log(artistResult.rows)

        res.status(200).send(playlistResult.rows)
    } catch (e) {
        res.status(500).send(e.message)
    }


})