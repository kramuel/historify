import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './Navbar';
import PersonalLogin from './PersonalLogin';
import PersonalPage from './PersonalPage';
import GeneralSpotifyHistory from './GeneralSpotifyHistory';
import AboutPage from './AboutPage';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<><PersonalLogin/><GeneralSpotifyHistory/></>}/>
      <Route path="profile" element={<><PersonalPage/></>}></Route>
      <Route path="about" element={<AboutPage />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;