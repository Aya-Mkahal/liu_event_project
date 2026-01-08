import React from "react";

function EventTable({ events, role }) {
  return (
    <section className="my-events-section">
      <h2>My Events</h2>
      <table className="events-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, i) => (
            <tr key={i}>
              <td>{event.name}</td>
              <td>{event.desc}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>
                {role === "student" ? (
                  <button className="join-button">Join</button>
                ) : (
                  <button className="drop-button">Drop</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default EventTable;