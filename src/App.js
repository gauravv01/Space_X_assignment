import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Payload from './pages/Payload';
import constants from './data/constants';
import './App.css';


const App = () => {
  return(
      <Routes>
        <Route exact path={constants.HOME_PAGE} element={<Home />} />
        <Route path={constants.PAYLOAD_PAGE} element={<Payload />} />
      </Routes>
  )
  };

export default App;
