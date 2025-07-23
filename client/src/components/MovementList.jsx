import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MovementList.css';

export default function MovementList() {
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/movements')
      .then((res) => setMovements(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="movement-list">
      <h2>Lista de Movimientos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Nota</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {movements.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.product_name}</td>
              <td>{m.type}</td>
              <td>{m.quantity}</td>
              <td>{m.note}</td>
              <td>{new Date(m.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
