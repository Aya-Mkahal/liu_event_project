import React, { useState } from "react";
import EventTable from "./EventTable";
import AddEventForm from "./AddEventForm";
import './styles.css';
function App() {
  const params = new URLSearchParams(window.location.search);
  const role = params.get("role") || "student";

  const [events, setEvents] = useState([
    { name: "AI Workshop", desc: "Learn the basics of AI and machine learning.", date: "2025-10-05" },
    { name: "Startup Pitch Competition", desc: "Pitch your startup idea and win prizes!", date: "2025-10-12" }
  ]);

  const addEvent = (event) => setEvents([...events, event]);

  return (
    <div className="App">
      <header>
        <nav>
          <div className="logo">LIU Events</div>
          <ul>
            <li><a href="#">Sign In</a></li>
            <li><a href="#">Sign Out</a></li>
          </ul>
        </nav>
      </header>

      <main>
        {role === "dr" && <AddEventForm addEvent={addEvent} />}
        <EventTable events={events} role={role} />
      </main>

      <footer>
        <p>
          ©️ 2025 <a href="https://www.liu.edu.lb" target="_blank" rel="noreferrer">LIU - Lebanese International University</a>
        </p>
      </footer>
    </div>
  );
}

export default App;