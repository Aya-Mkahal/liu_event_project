import React from 'react';

const EventTable = ({ events, onJoin, onDrop, onEdit, role }) => {
  if (!events || events.length === 0)
    return <p style={{ textAlign: 'center', marginTop: '20px' }}>No events available.</p>;

  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <thead>
        <tr style={{ backgroundColor: '#f5f5f5' }}>
          <th style={thStyle}>Title</th>
          <th style={thStyle}>Description</th>
          <th style={thStyle}>Date</th>
          <th style={thStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.id} style={{ borderBottom: '1px solid #ddd' }}>
            <td style={tdStyle}>{event.name}</td>
            <td style={tdStyle}>{event.description}</td>
            <td style={tdStyle}>{event.date?.split("T")[0]}</td> {/* Show only date */}
            <td style={tdStyle}>
              {role === 'student' && (
                <>
                  {!event.joined ? (
                    <button style={btnStyle} onClick={() => onJoin(event.id)}>
                      Join
                    </button>
                  ) : (
                    <button style={btnDropStyle} onClick={() => onDrop(event.id)}>
                      Leave
                    </button>
                  )}
                </>
              )}

              {role === 'dr' && (
                <>
                  <button style={btnStyle} onClick={() => onEdit(event)}>
                    Edit
                  </button>
                  <button style={btnDropStyle} onClick={() => onDrop(event.id)}>
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const thStyle = { textAlign: 'left', padding: '10px', fontWeight: 'bold' };
const tdStyle = { padding: '10px' };
const btnStyle = { marginRight: '10px', padding: '5px 12px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' };
const btnDropStyle = { padding: '5px 12px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' };

export default EventTable;
