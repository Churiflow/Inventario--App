import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/MovementForm.css';

export default function MovementForm({ onAdded }) {
  const [products, setProducts] = useState([]);
  const [movement, setMovement] = useState({
    product_id: '',
    type: 'entrada',
    quantity: 1,
    note: '',
  });

  useEffect(() => {
    axios.get('http://localhost:3001/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setMovement({ ...movement, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/api/movements', movement)
      .then(() => {
        setMovement({ product_id: '', type: 'entrada', quantity: 1, note: '' });
        onAdded();
      })
      .catch((err) => {
        console.error(err);
        alert('Error al registrar movimiento');
      });
  };

  return (
    <form className="movement-form" onSubmit={handleSubmit}>
      <select name="product_id" value={movement.product_id} onChange={handleChange} required>
        <option value="">Selecciona un producto</option>
        {products.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>

      <select name="type" value={movement.type} onChange={handleChange}>
        <option value="entrada">Entrada</option>
        <option value="salida">Salida</option>
      </select>

      <input
        type="number"
        name="quantity"
        min="1"
        value={movement.quantity}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="note"
        placeholder="Nota (opcional)"
        value={movement.note}
        onChange={handleChange}
      />

      <button type="submit">Registrar Movimiento</button>
    </form>
  );
}
