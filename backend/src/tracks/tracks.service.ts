import { QueryConfig } from "pg"
import pool from "../db"
import fetch from "cross-fetch"


export const saveAllTracks = async (access_token: string, user_id: number, term: string): Promise<void> => {
    const params = new URLSearchParams()
    params.append('time_range', term)
    params.append('limit', '25')
    params.append('offset', '0')

    const tracksresponse = await fetch('https://api.spotify.com/v1/me/top/tracks?' + params,
        {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        })
    const tracksdata = await tracksresponse.json()

    const toptracks = tracksdata.items // tracks type maybe?

    // this is bad code, should not loop like this
    // should be able to upsert using single query with many values
    // OR insert with json_populate_recordset or something

    try {
        let count = 1
        for (const track of toptracks) {
            const insertQuery: QueryConfig = {
                text: "INSERT INTO tracks (track_name, artist_name, image_url, rank, user_id, link, range_term) "
                    + "VALUES ($1, $2, $3, $4, $5, $6, $7) ",
                values: [track.name, track.artists[0].name, track.album.images[1].url, count, user_id, track.external_urls.spotify, term]
            }
            const updateQuery: QueryConfig = {
                text: "UPDATE tracks SET track_name = $1, artist_name = $2, image_url = $3, link = $4 WHERE user_id = $5 AND rank = $6 AND range_term = $7 RETURNING track_name",
                values: [track.name, track.artists[0].name, track.album.images[1].url, track.external_urls.spotify, user_id, count, term]
            }

            const updres = await pool.query(updateQuery)

            if (updres.rowCount === 0) {
                const insres = await pool.query(insertQuery)
                if (insres.rowCount !== 0) console.log("inserted track with id = ", user_id);
            }
            count++
        }
    } catch (error) {
        console.error(error);
    }
}