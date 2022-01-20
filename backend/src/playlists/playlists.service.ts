import { QueryConfig } from "pg"
import pool from "../db"
import fetch from "cross-fetch"
import { SelectCountry } from ".."


export const saveAllPlaylists = async (access_token, playlistCountry) => {
    try {
        const playlistID: string = SelectCountry[playlistCountry].id
        const playlistval: number = SelectCountry[playlistCountry].val

        const params = new URLSearchParams()
        params.append('limit', '25')
        params.append('offset', '0')
        params.append('fields', "items(track(name,external_urls(spotify),album(images),artists(name)))")

        const playlistresponse = await fetch("https://api.spotify.com/v1/playlists/" + playlistID + "/tracks?" + params,
            {
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            })
        const playlistdata = await playlistresponse.json()

        const playlisttracks = playlistdata.items

        // this is bad code, should not loop like this
        // should be able to upsert using single query with many values
        // OR insert with json_populate_recordset or something

        let count = 1
        for (const track of playlisttracks) {
            const insertQuery: QueryConfig = {
                text: "INSERT INTO tracks (track_name, artist_name, image_url, rank, user_id, link, range_term) "
                    + "VALUES ($1, $2, $3, $4, $5, $6, $7) ",
                values: [track.track.name, track.track.artists[0].name, track.track.album.images[1].url, count, playlistval, track.track.external_urls.spotify, 'right_now']
            }
            const updateQuery: QueryConfig = {
                text: "UPDATE tracks SET track_name = $1, artist_name = $2, image_url = $3, link = $4 WHERE user_id = $5 AND rank = $6 RETURNING track_name",
                values: [track.track.name, track.track.artists[0].name, track.track.album.images[1].url, track.track.external_urls.spotify, playlistval, count]
            }

            const updres = await pool.query(updateQuery)

            if (updres.rowCount === 0) {
                const insres = await pool.query(insertQuery)
                if (insres.rowCount !== 0) console.log("inserted track with id = ", playlistCountry);
            }
            count++
        }
    } catch (error) {
        console.error(error);
    }
}

