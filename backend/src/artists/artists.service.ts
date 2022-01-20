/**
 * Data Model Interfaces
 */

import { Artist } from "./artist.interface";
import { Artists } from "./artists.interface";
import pool from "../db";
import fetch from "cross-fetch";
import { QueryConfig, QueryResult } from "pg";
/**
 * Service Methods 
 */


/*
    Structure is a bit whacky, should this be a "post" req, and the auth router call this post req once?
*/

export const saveAllArtists = async (access_token, user_id: number): Promise<void> => { 
    if ( user_id === -1 ) {
        console.log("NO ID============!!!!!!!!!!")
        return
    }

    const params = new URLSearchParams()
    params.append('time_range', 'short_term')
    params.append('limit', '25')
    params.append('offset', '0')

    const artistsresponse: Response = await fetch('https://api.spotify.com/v1/me/top/artists?' + params,
        {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        })
    const artistdata = await artistsresponse.json() // artistdata.items: Artists

    const topartists = artistdata.items

    // this is bad code, should not loop like this
    // should be able to upsert using single query with many values
    // OR insert with json_populate_recordset or something
    try {
        let count = 1
        for (const artist of topartists) {
            const insertQuery: QueryConfig = {
                text: "INSERT INTO artists (artist_name, image_url, rank, user_id, link) "
                    + "VALUES ($1, $2, $3, $4, $5) ",
                values: [artist.name, artist.images[1].url, count, user_id, artist.external_urls.spotify]
            }
            const updateQuery: QueryConfig = {
                text: "UPDATE artists SET artist_name = $1, image_url = $2, link = $3 WHERE user_id = $4 AND rank = $5 RETURNING artist_name",
                values: [artist.name, artist.images[1].url, artist.external_urls.spotify, user_id, count]
            }
            console.log(insertQuery.values[2]);
                
            const updres = await pool.query(updateQuery)
            console.log(updres);
            
            if (updres.rowCount === 0)
            {
                const insres = await pool.query(insertQuery)
                if (insres.rowCount !== 0) console.log("inserted artist");
                
            }

            count++
        }
    } catch (error) {
        console.error(error);
    }
}

// export const find = async (id: number): Promise<Artist> => artists[id];

// use this for creating something ( an artist/user/whatever perhaps) 
// to be saved in database!! not this key-value-pair-list

// export const create = async (newArtist: Artist): Promise<Artist> => {
//     const id = new Date().valueOf();

//     artists[id] = {
//         // id, // if i would have used BaseItem etc
//         ...newArtist,
//     };

//     return artists[id];
// };


// same shit but for update ( CRUD )

// UPDATE

// export const update = async (
//     id: number,
//     itemUpdate: BaseItem
//   ): Promise<Item | null> => {
//     const item = await find(id);
  
//     if (!item) {
//       return null;
//     }
  
//     items[id] = { id, ...itemUpdate };
  
//     return items[id];
//   };

// DELETE

// export const remove = async (id: number): Promise<null | void> => {
//     const item = await find(id);
  
//     if (!item) {
//       return null;
//     }
  
//     delete items[id];
//   };