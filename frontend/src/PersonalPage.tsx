import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { PureComponent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import GetTracks from './GetTracks';
import GetArtists from './GetArtists';

export interface Artist {
    name: string
    index: number
    image: string
    imageSize: number
    link: string
}

export interface Track {
    name: string
    index: number
    image: string
    imageSize: number
    artistname: string
    link: string
}

export enum TimeTerm{
    SHORT_TERM = 'short_term',
    MEDIUM_TERM = 'medium_term',
    LONG_TERM = 'long_term'
}

export enum TimePeriod{
    SHORT_TERM = 'This Month',
    MEDIUM_TERM = 'The Last 6 Months',
    LONG_TERM = 'Forever'
}

const PersonalPage = () => {
    const [rangeTerm, setRangeTerm] = useState<TimeTerm>(TimeTerm.SHORT_TERM)
    const [timePeriodRange, setTimePeriodRange] = useState<TimePeriod>(TimePeriod.SHORT_TERM)
    const [showArtists, setShowArtists] = useState<Boolean>(false)
    const [showTracks, setShowTracks] = useState<Boolean>(false)
    const [selectedButton, setSelectedButton] = useState<number>(1)
    
    const OnClickHandler = (Term: TimeTerm, Period: TimePeriod) =>{
        setRangeTerm(Term); 
        setTimePeriodRange(Period); 
        if (Term === TimeTerm.SHORT_TERM)
        {
            setSelectedButton(1);
        }
        else if(Term === TimeTerm.MEDIUM_TERM){
            setSelectedButton(2);
        }
        else if(Term === TimeTerm.LONG_TERM){
            setSelectedButton(3);
        }
    }

    return (
        <div className="GeneralSpotifyHistoryBox">
            <h3>Erik's Spotify History</h3>
            <div className="GeneralSpotifyContentCapsule">
                <button className="ChangeDataButton" onClick={() => {setShowArtists(true); setShowTracks(false)}}>SHOW ARTISTS</button>
                <button id='knapp2' className="ChangeDataButton" onClick={() => {setShowArtists(false); setShowTracks(true)}}>SHOW TRACKS</button>
            </div>
            <div className="TimeTermButtons">
                <button className={selectedButton===1 ? "GraphListButtonSelected" : "GraphListButton"} onClick={() => OnClickHandler(TimeTerm.SHORT_TERM, TimePeriod.SHORT_TERM)}>Last Month</button>
                <button className={selectedButton===2 ? "GraphListButtonSelected" : "GraphListButton"} onClick={() => OnClickHandler(TimeTerm.MEDIUM_TERM, TimePeriod.MEDIUM_TERM)}>Last 6 Months</button>
                <button className={selectedButton===3 ? "GraphListButtonSelected" : "GraphListButton"} onClick={() => OnClickHandler(TimeTerm.LONG_TERM, TimePeriod.LONG_TERM)}>Last Few Years</button>
            </div>
            { showTracks ? <GetTracks rangeTerm={rangeTerm} timePeriodRange={timePeriodRange}/> : <GetArtists rangeTerm={rangeTerm} timePeriodRange={timePeriodRange}/>}
        </div>
    );
}

export default PersonalPage;