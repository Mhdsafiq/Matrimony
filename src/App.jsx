import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import Interests from './pages/Interests';
import About from './pages/About';
import Matches from './pages/Matches';
import ComingSoon from './pages/ComingSoon';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/interests" element={<Interests />} />
          <Route path="/about" element={<About />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<ComingSoon title="Page Not Found" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
