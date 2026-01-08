import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import MyEvents from './pages/MyEvents';
import Feedback from './pages/Feedback';
import ViewFeedback from './pages/ViewFeedback';
import './styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myevents" element={<MyEvents />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/view-feedback" element={<ViewFeedback />} />
      </Routes>
    </Router>
  );
}

export default App;