import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './Navbar';
import PersonalLogin from './PersonalLogin';
import PersonalPage from './PersonalPage';
import GeneralSpotifyHistory from './GeneralSpotifyHistory';
import AboutPage from './AboutPage';

function App() {
  const backendLoginRoute = 'http://localhost:5005/login' // dev -> use nginx for production???
  //if not alreadty logged in check etc
  // ( now PersonalLogin component acts as loginbutton, doesnt check if we are already logged in )

  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<><PersonalLogin loginRoute={backendLoginRoute}/><GeneralSpotifyHistory/></>}/>
      <Route path="profile" element={<><PersonalPage/></>}></Route>
      <Route path="about" element={<AboutPage />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;