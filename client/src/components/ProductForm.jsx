import { useState } from 'react';
import axios from 'axios';
import '../styles/ProductForm.css';

export default function ProductForm({ onAdded }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/api/products', {
        name,
        code,
        description,
        category,
        price: Number(price),
        stock: Number(stock),
      });
      onAdded();
      // limpiar campos si quieres
      setName('');
      setCode('');
      setDescription('');
      setCategory('');
      setPrice('');
      setStock('');
    } catch (error) {
      console.error(error);
      alert('Error al agregar producto');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Código"
        value={code}
        onChange={e => setCode(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Categoría"
        value={category}
        onChange={e => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={e => setPrice(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={e => setStock(e.target.value)}
        required
      />
      <button type="submit">Agregar Producto</button>
    </form>
  );
}
