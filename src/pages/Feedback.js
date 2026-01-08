import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Feedback = () => {
  const [name, setName] = useState(localStorage.getItem('userName') || '');
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const role = localStorage.getItem('role');

  // Only students can submit feedback
  if (role !== 'student') {
    return (
      <div>
        <Header />
        <main>
          <section className="access-restricted">
            <h2>Feedback Submission</h2>
            <p>Only students can submit feedback.</p>
            <p>Dr/Admin can view feedback in the <Link to="/view-feedback">View Feedback</Link> page.</p>
            <div style={{ marginTop: '2em' }}>
              <Link to="/view-feedback" className="view-feedback-button">
                View Community Feedback
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, rating, feedback })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Success - reset form
        setName('');
        setEmail('');
        setRating(5);
        setFeedback('');
        setSubmitted(true);
        
        // Hide success message after 3 seconds
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setError(data.error || 'Failed to submit feedback');
      }
    } catch (err) {
      setError('Network error - check if backend is running');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <main>
        <section className="feedback-section">
          <h1>Share Your Feedback</h1>
          <p>
            We value your opinion! Please share your experience with LIU Event Hub.
          </p>

          {submitted && (
            <div className="success-message">
              ✅ Thank you for your feedback!
            </div>
          )}

          {error && (
            <div style={{ 
              backgroundColor: '#f8d7da', 
              color: '#721c24', 
              padding: '10px', 
              borderRadius: '4px',
              marginBottom: '15px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@liu.edu.lb"
                required
              />
            </div>

            <div className="form-group">
              <label>Rating</label>
              <div className="rating-container">
                <div className="star-buttons">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`star-button ${star <= rating ? 'active' : ''}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <span className="rating-display">{rating} out of 5 stars</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="feedback">Your Feedback</label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us about your experience, suggestions, or any issues..."
                rows="5"
                required
              />
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>

          <div className="feedback-info">
            <h3>Why Your Feedback Matters</h3>
            <ul>
              <li>Helps us improve event organization</li>
              <li>Guides future event planning</li>
              <li>Ensures better user experience</li>
              <li>Creates a stronger LIU community</li>
            </ul>
            <div style={{ marginTop: '1em' }}>
              <p>Want to see what others are saying? <Link to="/view-feedback">View Community Feedback</Link></p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Feedback;