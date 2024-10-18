import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Switch from 'react-router-dom';
import Login from './pages/Login';
import Navbar from './components/common/Navbar';
import Signup from './pages/Signup';
import Home from './pages/Home'; 
import { Outlet } from 'react-router-dom';
import About from './pages/About';

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
