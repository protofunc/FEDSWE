import './App.css';
import React, { Component } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import DataTable from './components/DataTable';
import Nav from './components/Nav';
import SignIn from './components/SignIn';
import Registration from './components/Registration';
import MyProfile from './components/MyProfile';
import Home from './components/Home';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Nav />
        <div>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/careers' element={<DataTable />}/>
            <Route path='/registration' element={<Registration />}/>
            <Route path='/profile' element={<MyProfile />}/> 
            <Route path='/signin' element={<SignIn />}/> 
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}