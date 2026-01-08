import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../images/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem('role'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('role');
      setRole(null);
      navigate('/login');
    }
  };

  return (
    <nav>
      <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img 
          src={Logo} 
          alt="LIU Logo" 
          style={{ width: '50px', height: '50px' }}
        />
        <span>LIU Events</span>
      </div>

      <ul>
        {location.pathname !== '/' && <li><Link to="/">Home</Link></li>}
        
        {/* Show MyEvents for all logged in users */}
        {role && <li><Link to="/myevents">My Events</Link></li>}
        
        {/* Show Submit Feedback only for students */}
        {role === 'student' && <li><Link to="/feedback">Submit Feedback</Link></li>}
        
        {/* Show View Feedback for everyone (logged in) */}
        {role && <li><Link to="/view-feedback">View Feedback</Link></li>}
        
        {!role && <li><Link to="/login">Sign In</Link></li>}
        {role && <li><button onClick={handleLogout}>Sign Out</button></li>}
      </ul>
    </nav>
  );
};

export default Navbar;