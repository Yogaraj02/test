import { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [editId, setEditId] = useState(null);

  const saveItem = (e) => {
    e.preventDefault();
    if (!name.trim() || !department.trim()) return;
    const item = { id: editId ?? Date.now(), name: name.trim(), department };
    setItems(editId === null ? [...items, item]
      : items.map((old) => old.id === editId ? item : old));
    setName(''); setDepartment(''); setEditId(null);
  };

  const editItem = (item) => {
    setName(item.name); setDepartment(item.department); setEditId(item.id);
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    if (editId === id) { setName(''); setDepartment(''); setEditId(null); }
  };

  return (
    <div>
      <h1>Employee Management</h1>
      <form onSubmit={saveItem}>
        <input aria-label="Employee name" placeholder="Employee name" value={name}
          onChange={(e) => setName(e.target.value)} required />
        <input aria-label="Department" placeholder="Department" value={department}
          onChange={(e) => setDepartment(e.target.value)} required />
        <button>{editId === null ? 'Add Employee' : 'Update Employee'}</button>
      </form>
      <h2>Employee List</h2>
      {items.length === 0 && <p>No employees yet</p>}
      {items.map((item) => (
        <div key={item.id}>
          <p>Name: {item.name}</p>
          <p>Department: {item.department}</p>
          <button onClick={() => editItem(item)}>Edit</button>
          <button onClick={() => deleteItem(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
