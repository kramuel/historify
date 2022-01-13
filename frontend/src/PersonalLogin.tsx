interface Props {
    loginRoute: string
}

const PersonalLogin = ({loginRoute}: Props) => {
    // const backendLoginRoute = 'http://localhost:5005/login'
    
    return(
        <div className="PersonalLoginBoxCapsule">
        <div className="PersonalLoginBox">
            <a href={loginRoute} className="PersonalLoginLink">
                <div className="PersonalLoginTextCapsule"> 
                <img className="PersonaolLoginSpotifyIcon" src="https://upload.wikimedia.org/wikipedia/commons/7/71/Spotify.png"></img>
                </div>Get Your Personal History Here 
                <div className="PersonalLoginArrowIcon">&#129130;</div>
            </a>
        </div>
        </div>
    );
}

export default PersonalLogin;