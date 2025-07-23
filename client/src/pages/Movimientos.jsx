import { useState } from 'react';
import MovementForm from '../components/MovementForm';
import MovementList from '../components/MovementList';

export default function Movimientos() {
  const [refresh, setRefresh] = useState(false);

  const handleAdded = () => setRefresh(!refresh);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gestión de Movimientos</h1>
      <MovementForm onAdded={handleAdded} />
      <MovementList key={refresh} />
    </div>
  );
}
