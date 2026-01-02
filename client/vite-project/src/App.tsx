/**
 * Project: Exclusive Drop Frontend
 * Developer: Ilya Zeldner
 */
import { useState, useEffect, Component } from 'react'
import Login from './pages/login'
import Register from './pages/register'
import StarterPage from './pages/starterPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChooseProfile from './pages/chooseProfile'
import axios, { AxiosError } from "axios";
const API_BASE = "/api";
import Layout from './components/NavigationAndSwitcher/Layout';
import Navigationbar from './components/NavigationAndSwitcher/NavigationBar';
import ForgotPassword from './pages/forgotPass';
import AddProfile from './pages/addprofile';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StarterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chooseProfile" element={<ChooseProfile />} />
        <Route path="/addprofile" element={<AddProfile />} />
        <Route path="/forgotPassword" element={<ForgotPassword />}/>
      </Routes> 
     
    </BrowserRouter>
    
  );
}

export default App;