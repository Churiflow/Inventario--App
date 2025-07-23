import { pool } from '../db.js';

export const getAllProducts = async (req, res) => {
  const result = await pool.query('SELECT * FROM products ORDER BY id');
  res.json(result.rows);
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
  if (result.rows.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(result.rows[0]);
};

export const createProduct = async (req, res) => {
  const { name, code, description, category, price, stock } = req.body;
  const result = await pool.query(
    'INSERT INTO products (name, code, description, category, price, stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [name, code, description, category, price, stock]
  );
  res.status(201).json(result.rows[0]);
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, code, description, category, price, stock } = req.body;
  const result = await pool.query(
    'UPDATE products SET name=$1, code=$2, description=$3, category=$4, price=$5, stock=$6 WHERE id=$7 RETURNING *',
    [name, code, description, category, price, stock, id]
  );
  res.json(result.rows[0]);
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
  res.json({ message: 'Producto eliminado' });
};
