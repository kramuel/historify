const Navbar = () => {
    return (
      <nav className="navbar">
        <div className="links">
          <a href="/">Homepage</a>
          <a href="profile">Your Profile</a>
          <a href="about">About</a>
        </div>
        <button className="SpotifyLoginButton">Log in to Spotify</button>
      </nav>
    );
  }
  export default Navbar;