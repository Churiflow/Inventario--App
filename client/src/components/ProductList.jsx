// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../styles/ProductList.css';

// export default function ProductList() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:3001/api/products')
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <div className="product-list">
//       <h2>Lista de Productos</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Nombre</th>
//             <th>Código</th>
//             <th>Descripción</th>
//             <th>Categoría</th>
//             <th>Precio</th>
//             <th>Stock</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((p) => (
//             <tr key={p.id}>
//               <td>{p.id}</td>
//               <td>{p.name}</td>
//               <td>{p.code}</td>
//               <td>{p.description}</td>
//               <td>{p.category}</td>
//               <td>${Number(p.price).toLocaleString()}</td>
//               <td>{p.stock}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ProductList.css';
import { motion } from 'framer-motion';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <motion.div 
      className="product-list-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="product-title">📦 Lista de Productos</h2>
      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Código</th>
              <th>Precio</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <motion.tr 
                key={p.id}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.description || 'Sin descripción'}</td>
                <td>{p.category || 'Sin categoría'}</td>
                <td>{p.code || 'N/A'}</td>
                <td>${Number(p.price).toFixed(2)}</td>
                <td>{p.stock}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
