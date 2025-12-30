/**
 * Project: Exclusive Drop Frontend
 * Developer: Ilya Zeldner
 */
import { useState, useEffect, Component } from 'react'
import './App.css'
import Login from './pages/login'
import Register from './pages/register'
import StarterPage from './pages/starterPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChooseProfile from './pages/chooseProfile'
import axios, { AxiosError } from "axios";

const API_BASE = "/api";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StarterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chooseProfile" element={<ChooseProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
