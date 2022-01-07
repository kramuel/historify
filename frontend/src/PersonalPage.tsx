import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { PureComponent, useState } from 'react';

const series2 = [
    {
    name: 'KAnye',
    color: 'red',
    data: [
    {x: 'Week 1', y: 1},
    {x: 'Week 2', y: 2},
    {x: 'Week 3', y: 3},
    {x: 'Week 4', y: 8},
    {x: 'Week 5', y: 2},
    ]
},
{
    name: 'CARTi',
    color: 'black',
    data: [
        {x: 'Week 1', y: 9},
        {x: 'Week 2', y: 4},
        {x: 'Week 3', y: 8},
        {x: 'Week 4', y: 5},
        {x: 'Week 5', y: 10},
    ],
},
{
    name: 'Maggio',
    color: 'blue',
    data: [
        {x: 'Week 1', y: 2},
        {x: 'Week 2', y: 6},
        {x: 'Week 3', y: 7},
        {x: 'Week 4', y: 8},
        {x: 'Week 5', y: 1},
    ],
},
{
    name: 'X-COAST',
    color: 'magenta',
    data: [
    {x: 'Week 1', y: 1},
    {x: 'Week 2', y: 10},
    {x: 'Week 3', y: 3},
    {x: 'Week 4', y: 6},
    {x: 'Week 5', y: 9},
    ]
},
{
    name: 'Kylie Minogue',
    color: 'Gold',
    data: [
    {x: 'Week 1', y: 3},
    {x: 'Week 2', y: 10},
    {x: 'Week 3', y: 4},
    {x: 'Week 4', y: 2},
    {x: 'Week 5', y: 1},
    ]
},
];

const series = [
    {
    name: 'Drake',
    color: 'red',
    data: [
    {x: 'Week 1', y: 6},
    {x: 'Week 2', y: 4},
    {x: 'Week 3', y: 8},
    {x: 'Week 4', y: 1},
    {x: 'Week 5', y: 9},
    ]
},
{
    name: 'Elvis',
    color: 'black',
    data: [
        {x: 'Week 1', y: 2},
        {x: 'Week 2', y: 3},
        {x: 'Week 3', y: 5},
        {x: 'Week 4', y: 8},
        {x: 'Week 5', y: 1},
    ],
},
{
    name: 'Taylor Swift',
    color: 'blue',
    data: [
        {x: 'Week 1', y: 1},
        {x: 'Week 2', y: 4},
        {x: 'Week 3', y: 5},
        {x: 'Week 4', y: 6},
        {x: 'Week 5', y: 7},
    ],
},
{
    name: 'Lana Del Ray',
    color: 'magenta',
    data: [
    {x: 'Week 1', y: 4},
    {x: 'Week 2', y: 4},
    {x: 'Week 3', y: 6},
    {x: 'Week 4', y: 3},
    {x: 'Week 5', y: 7},
    ]
},
{
    name: 'Lynyrd Skynyrd',
    color: 'Gold',
    data: [
    {x: 'Week 1', y: 10},
    {x: 'Week 2', y: 1},
    {x: 'Week 3', y: 2},
    {x: 'Week 4', y: 5},
    {x: 'Week 5', y: 4},
    ]
},
];


// {
//     "items": [
//       {
//         "external_urls": {
//           "spotify": "https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x"
//         },
//         "followers": {
//           "href": null,
//           "total": 16046667
//         },
//         "genres": [
//           "chicago rap",
//           "rap"
//         ],
//         "href": "https://api.spotify.com/v1/artists/5K4W6rqBFWDnAN6FQUkS6x",
//         "id": "5K4W6rqBFWDnAN6FQUkS6x",
//         "images": [
//           {
//             "height": 640,
//             "url": "https://i.scdn.co/image/ab6761610000e5eb867008a971fae0f4d913f63a",
//             "width": 640
//           },
//           {
//             "height": 320,
//             "url": "https://i.scdn.co/image/ab67616100005174867008a971fae0f4d913f63a",
//             "width": 320
//           },
//           {
//             "height": 160,
//             "url": "https://i.scdn.co/image/ab6761610000f178867008a971fae0f4d913f63a",
//             "width": 160
//           }
//         ],
//         "name": "Kanye West",
//         "popularity": 95,
//         "type": "artist",
//         "uri": "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"
//       },

const PersonalPage = () => {
    const [artistData, setArtistData] = useState(series);

    function changeArtistData(data: any) {
        setArtistData(data);
    }
    return(
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
    <Line key={index} type="monotone" stroke={s.color} strokeWidth={3} dot={{fill: s.color, r: 5}} name={s.name} dataKey="y" data={s.data} />)})}
        <XAxis dataKey="x" allowDuplicatedCategory={false} />
        <YAxis tickCount={10} reversed domain={[1, 10]} interval={0}/>
        <Tooltip />
    </LineChart>
    </div>
    <div className="GraphList">
        <h3>Your Top Artists This Week</h3>
        <ol>
        {artistData.map((s, index) =>{
            return(
                <li key={index}>{s.name}</li>
            )
        })}
        </ol>
    </div>
    </div>
    </div>
    );
}

export default PersonalPage;