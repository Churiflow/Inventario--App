// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Movimientos from './pages/Movimientos';
import './App.css'; // Asegúrate de importar este archivo para aplicar estilos globales

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/movimientos" element={<Movimientos />} />
        </Routes>
      </div>
    </Router>
  );
}
