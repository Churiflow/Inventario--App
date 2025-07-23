import { useState } from 'react';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

export default function Productos() {
  const [refresh, setRefresh] = useState(false);

  // Se llama para refrescar la lista cuando se agrega un producto nuevo
  const handleAdded = () => setRefresh(!refresh);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gestión de Productos</h1>
      <ProductForm onAdded={handleAdded} />
      <ProductList key={refresh} />
    </div>
  );
}
