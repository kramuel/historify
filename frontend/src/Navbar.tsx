interface Props {
  loginRoute: string
}

const Navbar = ({loginRoute}: Props) => {
    return (
      <nav className="navbar">
        <div className="links">
          <a href="/">Homepage</a>
          <a href="profile">My Profile</a>
          <a href="about">About</a>
        </div>
        {/* <button className="SpotifyLoginButton">Log in to Spotify</button> */}
      </nav>
    );
  }
  export default Navbar;