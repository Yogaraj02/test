import { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [editId, setEditId] = useState(null);

  const saveItem = (e) => {
    e.preventDefault();
    if (!name.trim() || !course.trim()) return;
    const item = { id: editId ?? Date.now(), name: name.trim(), course };
    setItems(editId === null ? [...items, item]
      : items.map((old) => old.id === editId ? item : old));
    setName(''); setCourse(''); setEditId(null);
  };

  const editItem = (item) => {
    setName(item.name); setCourse(item.course); setEditId(item.id);
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    if (editId === id) { setName(''); setCourse(''); setEditId(null); }
  };

  return (
    <div>
      <h1>Student Management</h1>
      <form onSubmit={saveItem}>
        <input aria-label="Student name" placeholder="Student name" value={name}
          onChange={(e) => setName(e.target.value)} required />
        <input aria-label="Course" placeholder="Course" value={course}
          onChange={(e) => setCourse(e.target.value)} required />
        <button>{editId === null ? 'Add Student' : 'Update Student'}</button>
      </form>
      <h2>Student List</h2>
      {items.length === 0 && <p>No students yet</p>}
      {items.map((item) => (
        <div key={item.id}>
          <p>Name: {item.name}</p>
          <p>Course: {item.course}</p>
          <button onClick={() => editItem(item)}>Edit</button>
          <button onClick={() => deleteItem(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
