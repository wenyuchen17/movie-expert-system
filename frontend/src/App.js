import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/NavBar/navbar';
import Home from './components/Home/home';
import Popular from './components/Popular/popular';
import Create from './components/Create/create';
import Profile from './components/Profile/profile';
import Edit from './components/Profile/edit';
import Favorite from './components/Profile/favorite';


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={Home} />
        <Route path="/popular" component={Popular} />
        <Route path="/create" component={Create} />
        <Route path="/profile" component={Profile} />
        <Route path="/edit" component={Edit} />
        <Route path="/favorite" component={Favorite} />
      </div>
    </Router>
  );
}

export default App;