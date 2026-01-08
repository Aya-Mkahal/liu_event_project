import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EventTable from '../components/eventTable';
import AddEditEventForm from '../components/AddEditEventForm';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  // Fetch all events for this user
  const fetchEvents = async () => {
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5000/api/my-events', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      console.log('Fetched events:', data);

      // data is already an array with joined info for students
      if (Array.isArray(data)) setEvents(data);
      else setEvents([]);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // STUDENT: Join event
  const handleJoin = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}/join`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to join event');
      fetchEvents();
    } catch (error) {
      alert(error.message);
    }
  };

  // STUDENT: Leave / DOCTOR: Delete event
  const handleDrop = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed operation');
      fetchEvents();
    } catch (error) {
      alert(error.message);
    }
  };

  // DOCTOR: Add event
  const handleAddEvent = async (newEvent) => {
    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEvent),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to create event');
      fetchEvents();
      alert('Event created successfully!');
    } catch (error) {
      alert(error.message);
    }
  };

  // DOCTOR: Edit event
  const handleEditEvent = async (updatedEvent) => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${updatedEvent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedEvent),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to update event');
      fetchEvents();
      setEditingEvent(null);
      alert('Event updated successfully!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <Header />
      <main style={{ padding: '20px' }}>
        <section className="my-events-section">
          <h2 style={{ marginBottom: '15px' }}>My Events</h2>

          <EventTable
            events={events}
            onJoin={handleJoin}
            onDrop={handleDrop}
            onEdit={setEditingEvent}
            role={role}
          />
        </section>

        {role === 'dr' && (
          <section className="add-event-section" style={{ marginTop: '30px' }}>
            <h2 style={{ marginBottom: '10px' }}>{editingEvent ? 'Edit Event' : 'Add Event'}</h2>

            <AddEditEventForm
              eventToEdit={editingEvent}
              onAddEvent={handleAddEvent}
              onEditEvent={handleEditEvent}
            />
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MyEvents;
