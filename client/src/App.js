import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './Components/Home/index';
import Profile from './Components/Profile/index'
import Modal from './Components/Modal'

import NavbarMain from './Components/NavbarMain';


function App() {

  const [modalImage, setModalImage] = useState(null)

  return (
    <Router>

      <NavbarMain />
      <Switch>
        <Route exact path="/" render={()=> <Home modalImage={modalImage} setModalImage={setModalImage}/>} />
        <Route exact path='/:id' component={Profile} />
      </Switch>
      {modalImage && <Modal modalImage={modalImage} setModalImage={setModalImage} />}
    </Router>
  );
}

export default App;
