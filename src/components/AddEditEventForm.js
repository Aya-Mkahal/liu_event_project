import React, { useState, useEffect } from "react";

const AddEditEventForm = ({ eventToEdit, onAddEvent, onEditEvent }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (eventToEdit) {
      setName(eventToEdit.name);
      setDescription(eventToEdit.description);

      // Keep only the date part (YYYY-MM-DD)
      setDate(eventToEdit.date?.split("T")[0] || "");
    }
  }, [eventToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const eventData = { name, description, date };

    if (eventToEdit) {
      onEditEvent({ ...eventToEdit, ...eventData });
    } else {
      onAddEvent(eventData);
      setName("");
      setDescription("");
      setDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
      <h3>{eventToEdit ? "Edit Event" : "Add Event"}</h3>

      <label htmlFor="eventName">Event Name</label>
      <input
        type="text"
        id="eventName"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="eventDesc">Description</label>
      <textarea
        id="eventDesc"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="3"
        required
      />

      <label htmlFor="eventDate">Date</label>
      <input
        type="date"
        id="eventDate"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <button type="submit" style={{ padding: "8px 12px", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
        {eventToEdit ? "Save Changes" : "Add Event"}
      </button>
    </form>
  );
};

export default AddEditEventForm;
