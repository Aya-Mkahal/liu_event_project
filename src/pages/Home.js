import React, { useState, useEffect } from 'react';  // SINGLE IMPORT
import Header from '../components/Header';
import Footer from '../components/Footer';
import EventTable from '../components/eventTable';
import WelcomePic from '../images/pic1.png'; 

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        // Keep using empty array or show error message
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  return (
    <div>
      <Header />
      <main>
        <section className="hero" style={{ textAlign: 'center' }}>
          <h1>Welcome to LIU Event Hub</h1>
          <p>Discover, join, and organize events on campus</p>

          {/* Welcome Image */}
          <img 
            src={WelcomePic}
            alt="Welcome"
            style={{ 
              maxWidth: '40%',
              marginTop: '20px',
              borderRadius: '10px'
            }}
          />

          <p
            style={{
              textAlign: 'center',
              fontSize: '1.1rem',
              color: '#444',
              marginTop: '1em',
            }}
          >
            We're excited to have you here! Explore upcoming events and get involved in the vibrant LIU community.
          </p>
        </section>

        <section className="events">
          <h2>Upcoming Events</h2>
          
          {loading ? (
            <p style={{ textAlign: 'center', padding: '2em' }}>
              Loading events...
            </p>
          ) : events.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '2em', color: '#666' }}>
              No upcoming events at the moment. Check back soon!
            </p>
          ) : (
            <EventTable
              events={events}
              myEvents={[]}
              onJoin={() => {}}
              onDrop={() => {}}
              readOnly={true}
            />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;