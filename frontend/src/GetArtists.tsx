import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {Artist, TimeTerm, TimePeriod} from './PersonalPage'

interface Props{
    rangeTerm: TimeTerm
    timePeriodRange: TimePeriod
}

const GetArtists = ({rangeTerm, timePeriodRange}: Props) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState(searchParams.get("access_token"))
    const [artistList, setArtistList] = useState<Artist[]>([])
    useEffect(() => {
        const params = new URLSearchParams()
        params.append('time_range', rangeTerm)
        params.append('limit', '25')
        params.append('offset', '0')

        fetch('https://api.spotify.com/v1/me/top/artists?' + params,
            {
                headers: {
                    'Authorization': 'Bearer ' + query
                }
            })
            .then(res => res.json())
            .then(data => {
                let newArtistList: Artist[] = []
                console.log(data)
                const topartist = data.items
                let count = 1
                topartist.forEach((artist: any) => {
                    let newArtist: Artist = {
                        name: artist.name,
                        image: artist.images[1].url,
                        index: count,
                        imageSize: 320,
                        link: artist.href
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
                    <h3>Your Top Artists {timePeriodRange}</h3>
                    
                    <div className="imageBoxCapsule">
                    {artistList.map((artist, index) => {
                        return (
                            <div key={index} className="imageDivBox"> <p>{index + 1}. {artist.name}</p><img className='imageDiv' src={artist.image} /></div>
                        )
                    })}
                </div>
            </div>
     </div>
     )
}

export default GetArtists;