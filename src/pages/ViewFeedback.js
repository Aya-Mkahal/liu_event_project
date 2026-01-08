import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const ViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [ratingFilter, setRatingFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, average: 0 });

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        // Get all feedback
        const response = await fetch('http://localhost:5000/api/feedback');
        const data = await response.json();
        setFeedbacks(data);
        setFilteredFeedbacks(data);
        
        // Get stats
        const statsResponse = await fetch('http://localhost:5000/api/feedback-stats');
        const statsData = await statsResponse.json();
        setStats(statsData);
      } catch (error) {
        console.error('Failed to fetch feedback:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeedback();
  }, []);

  useEffect(() => {
    // Filter feedbacks based on rating
    let filtered = feedbacks;
    
    if (ratingFilter !== 'all') {
      filtered = filtered.filter(fb => fb.rating === parseInt(ratingFilter));
    }
    
    setFilteredFeedbacks(filtered);
  }, [ratingFilter, feedbacks]);

  const role = localStorage.getItem('role');

  return (
    <div>
      <Header />
      <main>
        <section className="feedback-view-section">
          <h1>Community Feedback</h1>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '2em' }}>
            See what others are saying about LIU Event Hub
          </p>
          
          {/* Stats Card */}
          <div className="stats-card">
            <div className="stat-item">
              <h3>Total Feedback</h3>
              <p className="stat-number">{stats.total || 0}</p>
            </div>
            <div className="stat-item">
              <h3>Average Rating</h3>
              <p className="stat-number">
                {stats.average ? parseFloat(stats.average).toFixed(1) : '0.0'} ⭐
              </p>
            </div>
            <div className="stat-item">
              <h3>Want to Share?</h3>
              {role === 'student' ? (
                <Link to="/feedback" className="give-feedback-link">
                  Give Feedback
                </Link>
              ) : (
                <p style={{ fontSize: '0.9em', color: '#666' }}>
                  Only students can submit feedback
                </p>
              )}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="filters">
            <select 
              value={ratingFilter} 
              onChange={(e) => setRatingFilter(e.target.value)}
              className="rating-select"
              disabled={loading}
            >
              <option value="all">⭐ All Ratings</option>
              <option value="5">⭐ 5 Stars</option>
              <option value="4">⭐ 4 Stars</option>
              <option value="3">⭐ 3 Stars</option>
              <option value="2">⭐ 2 Stars</option>
              <option value="1">⭐ 1 Star</option>
            </select>
          </div>

          {/* Feedback List */}
          {loading ? (
            <div className="no-feedback">
              <p>Loading feedback...</p>
            </div>
          ) : filteredFeedbacks.length === 0 ? (
            <div className="no-feedback">
              <p>No feedback submissions yet. Be the first to share your thoughts!</p>
              {role === 'student' && (
                <Link to="/feedback" className="view-feedback-button" style={{ marginTop: '1em' }}>
                  Submit First Feedback
                </Link>
              )}
            </div>
          ) : (
            <div className="feedback-list">
              {filteredFeedbacks.map((fb) => (
                <div key={fb.id} className="feedback-card">
                  <div className="feedback-header">
                    <div>
                      <h3>{fb.name}</h3>
                      <p className="feedback-email">{fb.email}</p>
                    </div>
                    <div className="feedback-rating">
                      {'⭐'.repeat(fb.rating)}
                      <span className="rating-number">({fb.rating}/5)</span>
                    </div>
                  </div>
                  
                  <div className="feedback-body">
                    <p>{fb.feedback}</p>
                  </div>
                  
                  <div className="feedback-footer">
                    <span className="feedback-date">
                      {new Date(fb.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ViewFeedback;