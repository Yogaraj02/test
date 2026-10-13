import { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [editId, setEditId] = useState(null);

  const saveItem = (e) => {
    e.preventDefault();
    if (!name.trim() || !amount.trim() || Number(amount) <= 0) return;
    const item = { id: editId ?? Date.now(), name: name.trim(), amount };
    setItems(editId === null ? [...items, item]
      : items.map((old) => old.id === editId ? item : old));
    setName(''); setAmount(''); setEditId(null);
  };

  const editItem = (item) => {
    setName(item.name); setAmount(item.amount); setEditId(item.id);
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    if (editId === id) { setName(''); setAmount(''); setEditId(null); }
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <form onSubmit={saveItem}>
        <input aria-label="Expense name" placeholder="Expense name" value={name}
          onChange={(e) => setName(e.target.value)} required />
        <input aria-label="Amount" placeholder="Amount" value={amount}
          onChange={(e) => setAmount(e.target.value)} type="number" min="0.01" step="0.01" required />
        <button>{editId === null ? 'Add Expense' : 'Update Expense'}</button>
      </form>
      <h2>Total Expense: ₹{items.reduce((sum, item) => sum + Number(item.amount), 0).toFixed(2)}</h2>
      <h2>Expense List</h2>
      {items.length === 0 && <p>No expenses yet</p>}
      {items.map((item) => (
        <div key={item.id}>
          <p>Name: {item.name}</p>
          <p>Amount: ₹{item.amount}</p>
          <button onClick={() => editItem(item)}>Edit</button>
          <button onClick={() => deleteItem(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
