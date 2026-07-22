import React from 'react';
import { HashRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Home from './src/pages/Home';
import Variables from './src/pages/Variables';
import VariableDetails from './src/pages/VariableDetails';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <div className="header-content">
            <NavLink to="/" className="logo">
              <span>🚗 VIN Decoder</span>
            </NavLink>
            <nav className="nav" aria-label="Main Navigation">
              <NavLink 
                to="/" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end
              >
                Home
              </NavLink>
              <NavLink 
                to="/variables" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Variables
              </NavLink>
            </nav>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/variables" element={<Variables />} />
            <Route path="/variables/:variableId" element={<VariableDetails />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="container">
            <p style={{ margin: 0 }}>
              &copy; {new Date().getFullYear()} VIN Decoder. Data provided by NHTSA API.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
