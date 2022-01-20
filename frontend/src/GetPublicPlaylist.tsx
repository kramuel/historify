import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {Track, TimeTerm, TimePeriod} from './PersonalPage'

enum SelectCountry{
    SWEDEN = "37i9dQZEVXbLoATJ81JYXz",
    GLOBAL = "37i9dQZEVXbMDoHDwVN2tF",
    USA = "37i9dQZEVXbLRQDuF5jeBp",
    ARGENTINA = "37i9dQZEVXbMMy2roB9myp"
}

enum CountryText{
    SWEDEN = "in Sweden",
    GLOBAL = "Globally",
    USA = "in USA",
    ARGENTINA = "in Argentina",
}

const GetPublicPlaylist = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState(searchParams.get("access_token"))
    const [artistList, setArtistList] = useState<Track[]>([])
    const [playlistCountry, setPlaylistCountry] = useState("37i9dQZEVXbLoATJ81JYXz")
    const [countryText, setCountryText] = useState("Sweden")
    const [selectedButton, setSelectedButton] = useState<number>(1)

    const OnClickHandler = (Country: SelectCountry, CountryText: CountryText) =>{
        setPlaylistCountry(Country); 
        setCountryText(CountryText); 
        if (Country === SelectCountry.SWEDEN)
        {
            setSelectedButton(1);
        }
        else if(Country === SelectCountry.GLOBAL){
            setSelectedButton(2);
        }
        else if(Country === SelectCountry.USA){
            setSelectedButton(3);
        }
        else if(Country === SelectCountry.ARGENTINA){
            setSelectedButton(4);
        }
    }


    useEffect(() => {
        const params = new URLSearchParams()
        params.append('limit', '50')
        params.append('offset', '0')

        fetch("https://api.spotify.com/v1/playlists/"+ playlistCountry + "/tracks?" + params,
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
    }, [playlistCountry]
    )
    return(
    <div className="PersonalGraphCapsule">
                <div className="GraphList">
                    <div className="TimeTermButtons">
                        <button className={selectedButton===1 ? "GraphListButtonSelected" : "GraphListButton"} onClick={() => OnClickHandler(SelectCountry.SWEDEN, CountryText.SWEDEN)}>Sweden</button>
                        <button className={selectedButton===2 ? "GraphListButtonSelected" : "GraphListButton"} onClick={() => OnClickHandler(SelectCountry.GLOBAL, CountryText.GLOBAL)}>Globally</button>
                        <button className={selectedButton===3 ? "GraphListButtonSelected" : "GraphListButton"} onClick={() => OnClickHandler(SelectCountry.USA, CountryText.USA)}>USA</button>
                        <button className={selectedButton===4 ? "GraphListButtonSelected" : "GraphListButton"} onClick={() => OnClickHandler(SelectCountry.ARGENTINA, CountryText.ARGENTINA)}>Argentina</button>
                    </div>
                    <h3>Top Tracks {countryText} </h3>
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