import { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState(null);

  const clearForm = () => {
    setId(''); setName(''); setPrice(''); setEditId(null);
  };

  // ADD ITEM
  const addItem = () => {
    if (!id.trim() || !name.trim() || price === '') {
      alert('Enter all details');
      return;
    }
    if (!Number.isFinite(Number(price)) || Number(price) < 0) {
      alert('Enter a valid price of zero or more');
      return;
    }
    if (items.some((item) => item.id === id.trim())) {
      alert('ID already exists');
      return;
    }
    setItems([...items, { id: id.trim(), name: name.trim(), price }]);
    clearForm();
  };

  // EDIT ITEM: FILL INPUTS
  const editItem = (item) => {
    setId(item.id); setName(item.name); setPrice(item.price);
    setEditId(item.id);
  };

  // UPDATE ITEM BY ID
  const updateItem = () => {
    if (editId === null) {
      alert('Click Edit first');
      return;
    }
    if (!name.trim() || price === '') {
      alert('Enter new name and price');
      return;
    }
    if (!Number.isFinite(Number(price)) || Number(price) < 0) {
      alert('Enter a valid price of zero or more');
      return;
    }
    setItems(items.map((item) => item.id === editId
      ? { ...item, name: name.trim(), price } : item));
    clearForm();
  };

  // DELETE ITEM BY ID
  const deleteItem = (deleteId) => {
    setItems(items.filter((item) => item.id !== deleteId));
    if (editId === deleteId) clearForm();
  };

  return (
    <div>
      <h1>Item Management System</h1>
      <label htmlFor="id">ID: </label>
      <input id="id" value={id} onChange={(e) => setId(e.target.value)} disabled={editId !== null} />
      <br /><br />
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
      <br /><br />
      <label htmlFor="price">Price: </label>
      <input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} min="0" />
      <br /><br />
      <button onClick={addItem} disabled={editId !== null}>Add Item</button>
      <button onClick={updateItem}>Update Item</button>
      <button onClick={clearForm}>Cancel</button>
      <h2>Display Items</h2>
      {items.length === 0 ? <p>No items available</p> : items.map((item) => (
        <div key={item.id}>
          <p>ID: {item.id}</p>
          <p>Name: {item.name}</p>
          <p>Price: ₹{item.price}</p>
          <button onClick={() => editItem(item)}>Edit</button>
          <button onClick={() => deleteItem(item.id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
