import { Link } from 'react-router-dom';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <h1>Bienvenido al Sistema de Inventario Pyme</h1>
      <nav>
        <ul>
          <li><Link to="/productos">Gestión de Productos</Link></li>
          <li><Link to="/movimientos">Gestión de Movimientos</Link></li>
        </ul>
      </nav>
    </div>
  );
}
