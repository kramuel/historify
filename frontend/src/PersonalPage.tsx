import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { PureComponent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';


const series2 = [
    {
        name: 'KAnye',
        color: 'red',
        data: [
            { x: 'Week 1', y: 1 },
            { x: 'Week 2', y: 2 },
            { x: 'Week 3', y: 3 },
            { x: 'Week 4', y: 8 },
            { x: 'Week 5', y: 2 },
        ]
    },
    {
        name: 'CARTi',
        color: 'black',
        data: [
            { x: 'Week 1', y: 9 },
            { x: 'Week 2', y: 4 },
            { x: 'Week 3', y: 8 },
            { x: 'Week 4', y: 5 },
            { x: 'Week 5', y: 10 },
        ],
    },
    {
        name: 'Maggio',
        color: 'blue',
        data: [
            { x: 'Week 1', y: 2 },
            { x: 'Week 2', y: 6 },
            { x: 'Week 3', y: 7 },
            { x: 'Week 4', y: 8 },
            { x: 'Week 5', y: 1 },
        ],
    },
    {
        name: 'X-COAST',
        color: 'magenta',
        data: [
            { x: 'Week 1', y: 1 },
            { x: 'Week 2', y: 10 },
            { x: 'Week 3', y: 3 },
            { x: 'Week 4', y: 6 },
            { x: 'Week 5', y: 9 },
        ]
    },
    {
        name: 'Kylie Minogue',
        color: 'Gold',
        data: [
            { x: 'Week 1', y: 3 },
            { x: 'Week 2', y: 10 },
            { x: 'Week 3', y: 4 },
            { x: 'Week 4', y: 2 },
            { x: 'Week 5', y: 4 },
        ]
    },
];

const series = [
    {
        name: 'Drake',
        color: 'red',
        data: [
            { x: 'Week 1', y: 6 },
            { x: 'Week 2', y: 4 },
            { x: 'Week 3', y: 8 },
            { x: 'Week 4', y: 1 },
            { x: 'Week 5', y: 9 },
        ]
    },
    {
        name: 'Elvis',
        color: 'black',
        data: [
            { x: 'Week 1', y: 2 },
            { x: 'Week 2', y: 3 },
            { x: 'Week 3', y: 5 },
            { x: 'Week 4', y: 8 },
            { x: 'Week 5', y: 1 },
        ],
    },
    {
        name: 'Taylor Swift',
        color: 'blue',
        data: [
            { x: 'Week 1', y: 1 },
            { x: 'Week 2', y: 4 },
            { x: 'Week 3', y: 5 },
            { x: 'Week 4', y: 6 },
            { x: 'Week 5', y: 8 },
        ],
    },
    {
        name: 'Lana Del Ray',
        color: 'magenta',
        data: [
            { x: 'Week 1', y: 4 },
            { x: 'Week 2', y: 4 },
            { x: 'Week 3', y: 6 },
            { x: 'Week 4', y: 3 },
            { x: 'Week 5', y: 7 },
        ]
    },
    {
        name: 'Lynyrd Skynyrd',
        color: 'green',
        data: [
            { x: 'Week 1', y: 10 },
            { x: 'Week 2', y: 1 },
            { x: 'Week 3', y: 2 },
            { x: 'Week 4', y: 5 },
            { x: 'Week 5', y: 4 },
        ]
    },
];


const spotifydata = [
    {
        "external_urls": {
            "spotify": "https://open.spotify.com/artist/699OTQXzgjhIYAHMy9RyPD"
        },
        "followers": {
            "href": null,
            "total": 5833915
        },
        "genres": [
            "atl hip hop",
            "plugg",
            "rap",
            "trap"
        ],
        "href": "https://api.spotify.com/v1/artists/699OTQXzgjhIYAHMy9RyPD",
        "id": "699OTQXzgjhIYAHMy9RyPD",
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab6761610000e5eb504ff11d788162fbf8078654",
                "width": 640
            },
            {
                "height": 320,
                "url": "https://i.scdn.co/image/ab67616100005174504ff11d788162fbf8078654",
                "width": 320
            },
            {
                "height": 160,
                "url": "https://i.scdn.co/image/ab6761610000f178504ff11d788162fbf8078654",
                "width": 160
            }
        ],
        "name": "Playboi Carti",
        "popularity": 89,
        "type": "artist",
        "uri": "spotify:artist:699OTQXzgjhIYAHMy9RyPD"
    },
    {
        "external_urls": {
            "spotify": "https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x"
        },
        "followers": {
            "href": null,
            "total": 16046667
        },
        "genres": [
            "chicago rap",
            "rap"
        ],
        "href": "https://api.spotify.com/v1/artists/5K4W6rqBFWDnAN6FQUkS6x",
        "id": "5K4W6rqBFWDnAN6FQUkS6x",
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab6761610000e5eb867008a971fae0f4d913f63a",
                "width": 640
            },
            {
                "height": 320,
                "url": "https://i.scdn.co/image/ab67616100005174867008a971fae0f4d913f63a",
                "width": 320
            },
            {
                "height": 160,
                "url": "https://i.scdn.co/image/ab6761610000f178867008a971fae0f4d913f63a",
                "width": 160
            }
        ],
        "name": "Kanye West",
        "popularity": 95,
        "type": "artist",
        "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
    },
    {
        "external_urls": {
            "spotify": "https://open.spotify.com/artist/0LcJLqbBmaGUft1e9Mm8HV"
        },
        "followers": {
            "href": null,
            "total": 7222495
        },
        "genres": [
            "europop",
            "swedish pop"
        ],
        "href": "https://api.spotify.com/v1/artists/0LcJLqbBmaGUft1e9Mm8HV",
        "id": "0LcJLqbBmaGUft1e9Mm8HV",
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab6761610000e5eb118de0c58b11e1fd54b66640",
                "width": 640
            },
            {
                "height": 320,
                "url": "https://i.scdn.co/image/ab67616100005174118de0c58b11e1fd54b66640",
                "width": 320
            },
            {
                "height": 160,
                "url": "https://i.scdn.co/image/ab6761610000f178118de0c58b11e1fd54b66640",
                "width": 160
            }
        ],
        "name": "ABBA",
        "popularity": 84,
        "type": "artist",
        "uri": "spotify:artist:0LcJLqbBmaGUft1e9Mm8HV"
    },
    {
        "external_urls": {
            "spotify": "https://open.spotify.com/artist/67lytN32YpUxiSeWlKfHJ3"
        },
        "followers": {
            "href": null,
            "total": 639607
        },
        "genres": [
            "psychedelic hip hop",
            "underground hip hop"
        ],
        "href": "https://api.spotify.com/v1/artists/67lytN32YpUxiSeWlKfHJ3",
        "id": "67lytN32YpUxiSeWlKfHJ3",
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab6761610000e5ebb4435845acb9da6f206af96c",
                "width": 640
            },
            {
                "height": 320,
                "url": "https://i.scdn.co/image/ab67616100005174b4435845acb9da6f206af96c",
                "width": 320
            },
            {
                "height": 160,
                "url": "https://i.scdn.co/image/ab6761610000f178b4435845acb9da6f206af96c",
                "width": 160
            }
        ],
        "name": "Yung Lean",
        "popularity": 71,
        "type": "artist",
        "uri": "spotify:artist:67lytN32YpUxiSeWlKfHJ3"
    },
    {
        "external_urls": {
            "spotify": "https://open.spotify.com/artist/1RyvyyTE3xzB2ZywiAwp0i"
        },
        "followers": {
            "href": null,
            "total": 10996434
        },
        "genres": [
            "atl hip hop",
            "hip hop",
            "pop rap",
            "rap",
            "southern hip hop",
            "trap"
        ],
        "href": "https://api.spotify.com/v1/artists/1RyvyyTE3xzB2ZywiAwp0i",
        "id": "1RyvyyTE3xzB2ZywiAwp0i",
        "images": [
            {
                "height": 640,
                "url": "https://i.scdn.co/image/ab6761610000e5eb38c1a72909cb7dd8e2a1f30d",
                "width": 640
            },
            {
                "height": 320,
                "url": "https://i.scdn.co/image/ab6761610000517438c1a72909cb7dd8e2a1f30d",
                "width": 320
            },
            {
                "height": 60,
                "url": "https://i.scdn.co/image/ab6761610000f17838c1a72909cb7dd8e2a1f30d",
                "width": 60
            }
        ],
        "name": "Future",
        "popularity": 91,
        "type": "artist",
        "uri": "spotify:artist:1RyvyyTE3xzB2ZywiAwp0i"
    }
]

function getRandomColor(ColorIndex: number) {
    var color = "blue"
    if (ColorIndex == 0) {
        color = "red"
    }
    if (ColorIndex == 1) {
        color = "blue"
    }
    if (ColorIndex == 2) {
        color = "black"
    }
    if (ColorIndex == 3) {
        color = "magenta"
    }
    if (ColorIndex == 4) {
        color = "green"
    }
    return color;
}

interface Artist {
    name: string
    index: number
    image: string
    imageSize: number
}

const PersonalPage = () => {
    const [artistData, setArtistData] = useState(series)
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState(searchParams.get("access_token"))
    const [artistList, setArtistList] = useState<Artist[]>([])
    function changeArtistData(data: any) {
        setArtistData(data);
    }

    useEffect(() => {

        fetch('http://localhost:5005/artists/', {
            credentials: 'include'
        }) // credentials
            .then(res => res.json())
            .then(data => {
                const newArtistList: Artist[] = []
                // NYI correct types
                data.forEach((artist: any ) => {
                    let newArtist: Artist = {
                        name: artist.artist_name,
                        image: artist.image_url,
                        index: artist.rank,
                        imageSize: 320
                    }
                    newArtistList.push(newArtist)
                    })

                setArtistList(newArtistList)                

            })
            .catch(err => console.error(err))
    }, []
    )


    return (
        <div className="GeneralSpotifyHistoryBox">
            <h3>Erik's Top History This Year</h3>
            <div className="GeneralSpotifyContentCapsule">
                <div className="GeneralSpotifyImageBox" onClick={() => changeArtistData(series2)}>
                    <p>Top Songs</p>
                    <img className="GeneralSpotifyImage" src="https://i.scdn.co/image/ab67616d0000b273a90d170c61fb7d063d47161d"></img>
                </div>
                <div className="GeneralSpotifyImageBox" onClick={() => changeArtistData(series)}>
                    <p>Top Artists</p>
                    <img className="GeneralSpotifyImage" src="https://i.scdn.co/image/ab67616d0000b273e31a279d267f3b3d8912e6f1"></img>
                </div>
                <div className="GeneralSpotifyImageBox">
                    <p>Top Genres</p>
                    <img className="GeneralSpotifyImage" src="https://i.scdn.co/image/ab67616d0000b273ec6e9c13eeed14eedbd5f7c9"></img>
                </div>
            </div>

            <div className="PersonalGraphCapsule">

                <div className="GraphBox">
                    <div id="GraphText">Your Artists Ranking Through Time</div>

                    <LineChart
                        width={800}
                        height={450}
                        data={artistData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        {artistData.map((s, index) => {
                            return (
                                <Line key={index} type="monotone" stroke={s.color} strokeWidth={3} dot={{ fill: s.color, r: 5 }} name={s.name} dataKey="y" data={s.data} />)
                        })}
                        <XAxis dataKey="x" allowDuplicatedCategory={false} />
                        <YAxis tickCount={10} reversed domain={[1, 10]} interval={0} />
                        <Tooltip />
                    </LineChart>
                </div>
                <div className="GraphList">
                    <h3>Your Top Artists This Week</h3>
                    {artistList.map((artist, index) => {
                        return (
                            <div className="ArtistList">
                                <div key={index}> {index + 1}. <img src={artist.image} /> {artist.name} </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default PersonalPage;