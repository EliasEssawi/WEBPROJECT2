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

interface Order {
  _id: string;
  email: string;
}
interface DropStatus {
  remaining: number;
  soldOut: boolean;
}

function App() {
  const [email, setEmail] = useState<string>(""); // User email input
  const [orders, setOrders] = useState<Order[]>([]); // List of orders
  const [status, setStatus] = useState<DropStatus>({
    remaining: 5,
    soldOut: false,
  });
  const [message, setMessage] = useState<string>(""); // User feedback message

  const [refreshTrigger, setRefreshTrigger] = useState<number>(0); // State-driven trigger

  const triggerRefresh = () => setRefreshTrigger((prev) => prev + 1); // Increment to trigger refresh

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resStatus, resOrders] = await Promise.all([
          axios.get<DropStatus>(`${API_BASE}/status`),
          axios.get<Order[]>(`${API_BASE}/orders`),
        ]);
        setStatus(resStatus.data); // Update status state
        setOrders(resOrders.data); // Update orders state
      } catch (err) {
        console.error("Backend Sync Failed" + err);
      }
    };

    fetchData();
  }, [refreshTrigger]); // Re-run effect when refreshTrigger changes

  useEffect(() => {
    const interval = setInterval(() => {
      triggerRefresh();
    }, 5000);
    return () => clearInterval(interval);
  }, []); // Empty dependency array to set up interval once

  const handleJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("Processing...");
    try {
      const res = await axios.post<{ message: string }>(`${API_BASE}/buy`, {
        email,
      });
      setMessage(res.data.message); // Show success message
      setEmail("");

      triggerRefresh();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>; // Type assertion
      setMessage(error.response?.data?.message || "Join failed."); // Show error message
    }
  };

  const handleReset = async () => {
    try {
      await axios.post(`${API_BASE}/reset`); // No body needed
      setMessage("System Reset"); // Show reset message
      triggerRefresh(); // Refresh data after reset
    } catch (err) {
      setMessage("Reset failed" + err);
    }
  };

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
