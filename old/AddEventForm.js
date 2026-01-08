import React, { useState } from "react";

function AddEventForm({ addEvent }) {
  const [form, setForm] = useState({ name: "", desc: "", date: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.desc && form.date) {
      addEvent(form);
      setForm({ name: "", desc: "", date: "" });
    }
  };

  return (
    <section className="add-event-section">
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <label>Event Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <label>Description</label>
        <textarea
          rows="3"
          value={form.desc}
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
        ></textarea>

        <label>Date</label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <button type="submit">Add Event</button>
      </form>
    </section>
  );
}

export default AddEventForm;