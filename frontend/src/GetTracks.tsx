import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {Track, TimeTerm, TimePeriod} from './PersonalPage'

interface Props{
    rangeTerm: TimeTerm
    timePeriodRange: TimePeriod
}

const GetTracks = ({rangeTerm, timePeriodRange}: Props) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState(searchParams.get("access_token"))
    const [artistList, setArtistList] = useState<Track[]>([])
    useEffect(() => {
        const params = new URLSearchParams()
        params.append('time_range', rangeTerm)
        params.append('limit', '25')
        params.append('offset', '0')

        fetch('https://api.spotify.com/v1/me/top/tracks?' + params,
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
                toptracks.forEach((artist: any) => {
                    let newArtist: Track = {
                        name: artist.name,
                        image: artist.album.images[1].url,
                        index: count,
                        imageSize: 320,
                        artistname: artist.artists[0].name,
                        link: artist.external_urls.spotify
                    }
                    newArtistList.push(newArtist)
                    count++
                });

                setArtistList(newArtistList)
            })
            .catch(err => console.error(err))
    }, [rangeTerm]
    )
    return(
    <div className="PersonalGraphCapsule">
                <div className="GraphList">
                    <h3>Your Top Tracks {timePeriodRange}</h3>
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

export default GetTracks;