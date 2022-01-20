import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Track, TimeTerm, TimePeriod } from './PersonalPage'

enum SelectCountry {
    SWEDEN = "SWEDEN",
    GLOBAL = "GLOBAL",
    USA = "USA",
    ARGENTINA = "ARGENTINA"
}

enum CountryText {
    SWEDEN = "in Sweden",
    GLOBAL = "Globally",
    USA = "in USA",
    ARGENTINA = "in Argentina",
}

const GetPublicPlaylist = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState(searchParams.get("access_token"))
    const [playListTracks, setplayListTracks] = useState<Track[]>([])
    const [playlistCountry, setPlaylistCountry] = useState<string>(SelectCountry.SWEDEN)
    const [countryText, setCountryText] = useState<string>(CountryText.SWEDEN)
    const [selectedButton, setSelectedButton] = useState<number>(1)

    const OnClickHandler = (Country: SelectCountry, CountryText: CountryText) => {
        setPlaylistCountry(Country);
        setCountryText(CountryText);
        if (Country === SelectCountry.SWEDEN) {
            setSelectedButton(1);
        }
        else if (Country === SelectCountry.GLOBAL) {
            setSelectedButton(2);
        }
        else if (Country === SelectCountry.USA) {
            setSelectedButton(3);
        }
        else if (Country === SelectCountry.ARGENTINA) {
            setSelectedButton(4);
        }
    }


    useEffect(() => {

        fetch('http://localhost:5005/playlists/' + playlistCountry, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                let newplayListTracks: Track[] = []
                let count = 1
                data.forEach((track: any) => {
                    let newTrack: Track = {
                        artistname: track.artist_name,
                        name: track.track_name,
                        image: track.image_url,
                        index: track.rank,
                        imageSize: 320,
                        link: track.link
                    }
                    newplayListTracks.push(newTrack)
                    count++
                });

                setplayListTracks(newplayListTracks)
            })
            .catch(err => console.error(err))

    }, [playlistCountry]
    )
    return (
        <div className="PersonalGraphCapsule">
            <div className="GraphList">
                <div className="TimeTermButtons">
                    <button className={selectedButton === 1 ? "GraphListButtonSelected" : "GraphListButton"} onClick={() => OnClickHandler(SelectCountry.SWEDEN, CountryText.SWEDEN)}>Sweden</button>
                    <button className={selectedButton === 2 ? "GraphListButtonSelected" : "GraphListButton"} onClick={() => OnClickHandler(SelectCountry.GLOBAL, CountryText.GLOBAL)}>Globally</button>
                    <button className={selectedButton === 3 ? "GraphListButtonSelected" : "GraphListButton"} onClick={() => OnClickHandler(SelectCountry.USA, CountryText.USA)}>USA</button>
                    <button className={selectedButton === 4 ? "GraphListButtonSelected" : "GraphListButton"} onClick={() => OnClickHandler(SelectCountry.ARGENTINA, CountryText.ARGENTINA)}>Argentina</button>
                </div>
                <h3>Top Tracks {countryText} </h3>
                <div className="imageBoxCapsule">
                    {playListTracks.map((tracks, index) => {
                        return (
                            <div key={index} className="imageDivBox" onClick={() => window.open(tracks.link + "?si=8f0fefabbde14156", "_blank")}> <p>{index + 1}. {tracks.name} - {tracks.artistname}</p><img className='imageDiv' src={tracks.image} /></div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default GetPublicPlaylist;