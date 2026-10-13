import { useState } from "react";

function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [trips, setTrips] = useState([]);
  const [editId, setEditId] = useState(null);

  function addTrip() {
    if (from === "" || to === "" || date === "") {
      alert("Please fill all fields");
      return;
    }

    if (editId === null) {
      const newTrip = {
        id: Date.now(),
        from: from,
        to: to,
        date: date
      };

      setTrips([...trips, newTrip]);
    } else {
      setTrips(
        trips.map((trip) =>
          trip.id === editId
            ? { ...trip, from: from, to: to, date: date }
            : trip
        )
      );

      setEditId(null);
    }

    setFrom("");
    setTo("");
    setDate("");
  }

  function editTrip(trip) {
    setFrom(trip.from);
    setTo(trip.to);
    setDate(trip.date);
    setEditId(trip.id);
  }

  function deleteTrip(id) {
    setTrips(trips.filter((trip) => trip.id !== id));

    if (editId === id) {
      setEditId(null);
      setFrom("");
      setTo("");
      setDate("");
    }
  }

  return (
    <div>
      <h1>Trip Management System</h1>

      <input
        type="text"
        placeholder="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />

      <br /><br />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <br /><br />

      <button onClick={addTrip}>
        {editId === null ? "Add Trip" : "Update Trip"}
      </button>

      <h2>Trip List</h2>

      {trips.length === 0 ? (
        <p>No trips available</p>
      ) : (
        trips.map((trip) => (
          <div key={trip.id}>
            <h3>{trip.from} to {trip.to}</h3>
            <p>Date: {trip.date}</p>

            <button onClick={() => editTrip(trip)}>
              Edit
            </button>

            <button onClick={() => deleteTrip(trip.id)}>
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default App;