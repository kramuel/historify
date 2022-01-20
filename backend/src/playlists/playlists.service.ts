import { QueryConfig } from "pg"
import pool from "../db"
import fetch from "cross-fetch"

const SelectCountry = {
    SWEDEN: {id: "37i9dQZEVXbLoATJ81JYXz", val: 987987987},
    GLOBAL: {id: "37i9dQZEVXbMDoHDwVN2tF", val: 123908120},
    USA: {id: "37i9dQZEVXbLRQDuF5jeBp", val: 145345544},
    ARGENTINA: {id: "37i9dQZEVXbMMy2roB9myp", val: 878444874}
}

// export const saveAllPlaylists = async (access_token: string): Promise<void> => {

//     saveSwedenPlaylist(access_token, swe)
//     saveUSAPlaylist()
//     saveArgentinaPlaylist()
//     saveGlobalPlaylist()

// }

export const saveAllPlaylists = async (access_token, playlistCountry) => {

    const playlistID: string = SelectCountry[playlistCountry].id
    console.log(playlistID);
    

    const params = new URLSearchParams()
    params.append('limit', '50')
    params.append('offset', '0')

    const playlistresponse = await fetch("https://api.spotify.com/v1/playlists/" + playlistID + "/tracks?" + params,
        {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        })
    const playlistdata = await playlistresponse.json()

    const playlisttracks = playlistdata.items 
    console.log(playlisttracks)


    // this is bad code, should not loop like this
    // should be able to upsert using single query with many values
    // OR insert with json_populate_recordset or something
    try {
        let count = 1
        for (const track of playlisttracks) {
            const insertQuery: QueryConfig = {
                text: "INSERT INTO tracks (track_name, artist_name, image_url, rank, user_id, link) "
                    + "VALUES ($1, $2, $3, $4, $5, $6) ",
                values: [track.name, track.artists[0].name, track.album.images[1].url, count, SelectCountry[playlistCountry].val, track.external_urls.spotify]
            }
            const updateQuery: QueryConfig = {
                text: "UPDATE tracks SET track_name = $1, artist_name = $2, image_url = $3, link = $4 WHERE user_id = $5 AND rank = $6 RETURNING track_name",
                values: [track.name, track.artists[0].name, track.album.images[1].url, track.external_urls.spotify, SelectCountry[playlistCountry].val, count]
            }

            const updres = await pool.query(updateQuery)
            console.log(updres);

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

const saveUSAPlaylist = () => {

}

const saveArgentinaPlaylist = () => {

}

const saveGlobalPlaylist = () => {

}