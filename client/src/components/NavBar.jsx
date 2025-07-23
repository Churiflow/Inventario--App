import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css'; // Luego te paso estilos para que quede choro
import { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  return (
    <nav className="navbar">
      <h2 className="navbar-logo">Inventario Pyme</h2>
      <ul className="navbar-links">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? 'active' : '')} 
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/productos" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Productos
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/movimientos" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Movimientos
          </NavLink>
        </li>
      </ul>
        <button onClick={toggleDarkMode}>
          {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
        </button>
    </nav>
  );
  
}



