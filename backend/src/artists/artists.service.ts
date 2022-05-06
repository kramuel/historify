/**
 * Data Model Interfaces
 */

import pool from "../db";
import fetch from "cross-fetch";
import { QueryConfig, QueryResult } from "pg";
/**
 * Service Methods 
 */


/*
    Structure is a bit whacky, should this be a "post" req, and the auth router call this post req once?
*/

export const saveAllArtists = async (access_token, user_id: number, term: string): Promise<void> => { 
    try {
        const params = new URLSearchParams()
        params.append('time_range', term)
        params.append('limit', '25')
        params.append('offset', '0')

        const artistsresponse: Response = await fetch('https://api.spotify.com/v1/me/top/artists?' + params,
            {
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            })
        const artistdata = await artistsresponse.json() 

        const topartists = artistdata.items

        // this is bad code, should not loop like this
        // should be able to upsert using single query with many values
        // OR insert with json_populate_recordset or something
        
        let count = 1
        for (const artist of topartists) {
            const insertQuery: QueryConfig = {
                text: "INSERT INTO artists (artist_name, image_url, rank, user_id, link, range_term) "
                    + "VALUES ($1, $2, $3, $4, $5, $6) ",
                values: [artist.name, artist.images[1].url, count, user_id, artist.external_urls.spotify, term]
            }
            const updateQuery: QueryConfig = {
                text: "UPDATE artists SET artist_name = $1, image_url = $2, link = $3 WHERE user_id = $4 AND rank = $5 AND range_term = $6 RETURNING artist_name",
                values: [artist.name, artist.images[1].url, artist.external_urls.spotify, user_id, count, term]
            }
            const updres = await pool.query(updateQuery)
            
            

            if (updres.rowCount === 0)
            {
                const insres = await pool.query(insertQuery)
                if (insres.rowCount === 0) console.log("DID NOT insert artist");
                else console.log(`artist at rank: ${count} INSERTED for user_id: ${user_id}`);
            }
            else
            {
                console.log(`artist at rank: ${count} updated for user_id: ${user_id}`);
            }
            count++
        }
    } catch (error) {
        console.error(error);
    }
}

// PUT

// UPDATE

// DELETE