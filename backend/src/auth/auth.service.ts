// how do i seperate services , controllers , routes

import { Request } from "express";
import pool from "../db";
import { QueryConfig, QueryResult } from "pg";

export const storeSessionUserName = (req: Request, userName): void => {
    req.session.userName = userName
    console.log(`User "${userName}" has been stored in session`);
}

export const addOrUpdateUserinDB = async (userQueryRows, access_token, refresh_token, user_name): Promise<number> => {
    let user_id: number = -1

    if (userQueryRows) {
        // user already exists
        try {
            const updatequery: QueryConfig = {
                text: "UPDATE users SET access_token = $1, refresh_token = $2 WHERE user_name = $3 RETURNING user_name",
                values: [access_token, refresh_token, user_name]
            }
            const updateResult: QueryResult = await pool.query(updatequery)

            user_id = updateResult.rows[0].user_id;
        } catch (error) {
            console.error(error);
        }
    } else {
        // add new user
        try {
            const insertstring = "INSERT INTO users (user_name, access_token, refresh_token) VALUES ($1, $2, $3) RETURNING user_id"
            const insertvalues = [user_name, access_token, refresh_token]

            const insertResult: QueryResult = await pool.query(insertstring, insertvalues)
            console.log("INSERT???==== ", insertResult)
            user_id = insertResult.rows[0].user_id
        } catch (error) {
            console.error(error);
        }
    }
    return user_id;
}

export const getUserId = async (access_token: string, refresh_token: string, user_name: string): Promise<number> => {

    // check if user < 0 or does error catch if user problems query form db??

    try {
        const userQuery: QueryConfig = {
            text: "SELECT * FROM users WHERE user_name = $1;",
            values: [user_name]
        }
        const userQueryRes: QueryResult = await pool.query(userQuery)

        const user_id: number = await addOrUpdateUserinDB(userQueryRes.rows[0], access_token, refresh_token, user_name)

        return user_id

    } catch (error) {
        console.error(error)
        return -1
    }

}