import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {Track, TimeTerm, TimePeriod} from './PersonalPage'

interface Props{
    rangeTerm: TimeTerm
    timePeriodRange: TimePeriod
}



const GetPublicPlaylist = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState(searchParams.get("access_token"))
    const [artistList, setArtistList] = useState<Track[]>([])
    useEffect(() => {
        const params = new URLSearchParams()
        params.append('limit', '50')
        params.append('offset', '0')

        fetch('https://api.spotify.com/v1/playlists/37i9dQZEVXbLoATJ81JYXz/tracks?' + params,
            {
                headers: {
                    'Authorization': 'Bearer ' + query
                }
            })
            .then(res => res.json())
            .then(data => {
                let newArtistList: Track[] = []
                console.log(data)
                const toptracks = data.items
                let count = 1
                toptracks.forEach((item: any) => {
                    let newArtist: Track = {
                        name: item.track.name,
                        image: item.track.album.images[0].url,
                        index: count,
                        imageSize: 320,
                        artistname: item.track.artists[0].name,
                        link: item.track.external_urls.spotify
                    }
                    newArtistList.push(newArtist)
                    count++
                });

                setArtistList(newArtistList)
            })
            .catch(err => console.error(err))
    }, []
    )
    return(
    <div className="PersonalGraphCapsule">
                <div className="GraphList">
                    <h3>Sweden's Top Tracks </h3>
                    <div className="imageBoxCapsule">
                    {artistList.map((artist, index) => {
                        return (
                            <div key={index} className="imageDivBox" onClick={()=> window.open(artist.link + "?si=8f0fefabbde14156", "_blank")}> <p>{index + 1}. {artist.name} - {artist.artistname}</p><img className='imageDiv' src={artist.image} /></div>
                        )
                    })}
                </div>
            </div>
     </div>
     )
}

export default GetPublicPlaylist;