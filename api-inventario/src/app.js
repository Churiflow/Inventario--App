// Paso 5: Configura Express (src/app.js)
import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import movementRoutes from './routes/movementRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/movements', movementRoutes);

export default app;
