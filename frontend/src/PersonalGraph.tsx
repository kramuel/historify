import React, { PureComponent, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



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
        {x: 'Week 1', y: 2},
        {x: 'Week 2', y: 3},
        {x: 'Week 3', y: 5},
        {x: 'Week 4', y: 8},
        {x: 'Week 5', y: 1},
    ],
},
{
    name: 'Maggio',
    color: 'blue',
    data: [
        {x: 'Week 1', y: 1},
        {x: 'Week 2', y: 4},
        {x: 'Week 3', y: 5},
        {x: 'Week 4', y: 6},
        {x: 'Week 5', y: 7},
    ],
}
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
}
];

const PersonalGraph = () => {

    const [artistData, setArtistData] = useState(series);

    function changeArtistData() {
        setArtistData(series2);
    }
    return(
        <div></div>
    // <div className="PersonalGraphCapsule">
    
    // <div className="GraphBox">
    // <div id="GraphText">Your Artists Ranking Through Time</div>
    // <button onClick={changeArtistData}></button>
    
    // <LineChart
    //     width={800}
    //     height={500}
    //     data={artistData}
    //     margin={{
    //     top: 10,
    //     right: 30,
    //     left: 20,
    //     bottom: 5,
    //     }}
    // >
    //     {artistData.map((s, index) => {
    // return (
    // <Line key={index} type="monotone" stroke={s.color} strokeWidth={3} dot={{fill: s.color, r: 5}} name={s.name} dataKey="y" data={s.data} />)})}
    //     <XAxis dataKey="x" allowDuplicatedCategory={false} />
    //     <YAxis tickCount={10} reversed domain={[1, 10]} interval={0}/>
    //     <Tooltip />
    // </LineChart>
    // </div>
    // <div className="GraphList">
    //     <h3>Your Top Artists This Week</h3>
    //     <ol>
    //         <li>Drake</li>
    //         <li>Playboi Carti</li>
    //         <li>Clairo</li>
    //         <li>Mac DeMarco</li>
    //         <li>blink-182</li>
    //         <li>Miki Matsubara</li>
    //     </ol>
    // </div>
    // </div>
);
}

export default PersonalGraph;