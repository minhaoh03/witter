import './App.css';

import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners'

import { WeetComponent, CreateWeet } from './weets'
import { CreateUser, LoginUser } from './users'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Suspense fallback={<ClimbingBoxLoader/>}>
          <NavLink to="/weet">
            Create 
          </NavLink>
          <NavLink to="/">
            Home
          </NavLink>
          <NavLink to="/register">
            Register
          </NavLink>
          <NavLink to="/login">
            Login
          </NavLink>
          <Routes>
            <Route path="/" element={<WeetComponent/>}/>
            <Route path="/weet" element={<CreateWeet/>}/>
            <Route path="/register" element={<CreateUser/>}/>
            <Route path="/login" element={<LoginUser/>}/>
          </Routes>
        </Suspense>
      </Router>
    )
  }
}

export default App;
