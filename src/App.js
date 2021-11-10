import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Navbar from './components/Navbar';
import Customers from './pages/Customers';
import Trainings from './pages/Trainings';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/trainings" element={<Trainings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
