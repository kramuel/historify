const PersonalPage = () => {
    return(
        <div className="GeneralSpotifyHistoryBox">
        <h3>Erik's Top History This Year</h3>
        <div className="GeneralSpotifyContentCapsule">
            <div className="GeneralSpotifyImageBox">
                <p>Top Songs</p>
                <img className="GeneralSpotifyImage" src="https://i.scdn.co/image/ab67616d0000b273a90d170c61fb7d063d47161d"></img>
            </div>
            <div className="GeneralSpotifyImageBox">
                <p>Top Artists</p>
                <img className="GeneralSpotifyImage" src="https://i.scdn.co/image/ab67616d0000b273e31a279d267f3b3d8912e6f1"></img>
            </div>
            <div className="GeneralSpotifyImageBox">
                <p>Top Genres</p>
                <img className="GeneralSpotifyImage" src="https://i.scdn.co/image/ab67616d0000b273ec6e9c13eeed14eedbd5f7c9"></img>
            </div>
        </div>
    </div>
    );
}

export default PersonalPage;