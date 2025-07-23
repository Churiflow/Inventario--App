import { pool } from '../db.js';

export const getAllMovements = async (req, res) => {
  const result = await pool.query(
    `SELECT sm.*, p.name as product_name 
     FROM stock_movements sm 
     JOIN products p ON sm.product_id = p.id
     ORDER BY sm.created_at DESC`
  );
  res.json(result.rows);
};

export const getMovementById = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    `SELECT sm.*, p.name as product_name 
     FROM stock_movements sm 
     JOIN products p ON sm.product_id = p.id
     WHERE sm.id = $1`,
    [id]
  );
  if (result.rows.length === 0) return res.status(404).json({ message: 'Movimiento no encontrado' });
  res.json(result.rows[0]);
};

export const createMovement = async (req, res) => {
  const { product_id, type, quantity, note } = req.body;

  if (!['entrada', 'salida'].includes(type)) {
    return res.status(400).json({ message: "El tipo debe ser 'entrada' o 'salida'" });
  }

  // Validar cantidad positiva
  if (quantity <= 0) {
    return res.status(400).json({ message: 'La cantidad debe ser mayor a cero' });
  }

  try {
    await pool.query('BEGIN');

    // Insertar movimiento
    const insertResult = await pool.query(
      `INSERT INTO stock_movements (product_id, type, quantity, note) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [product_id, type, quantity, note]
    );

    // Actualizar stock del producto
    const stockChange = type === 'entrada' ? quantity : -quantity;

    const updateResult = await pool.query(
      `UPDATE products SET stock = stock + $1 WHERE id = $2 RETURNING *`,
      [stockChange, product_id]
    );

    // Si stock negativo, revertir
    if (updateResult.rows[0].stock < 0) {
      await pool.query('ROLLBACK');
      return res.status(400).json({ message: 'No hay stock suficiente para esta salida' });
    }

    await pool.query('COMMIT');

    res.status(201).json(insertResult.rows[0]);
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ message: 'Error en la base de datos' });
  }
};

export const updateMovement = async (req, res) => {
  // Opcional: implementación avanzada si quieres editar movimientos
  res.status(501).json({ message: 'No implementado' });
};

export const deleteMovement = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('BEGIN');

    // Obtener movimiento
    const movementResult = await pool.query(
      'SELECT * FROM stock_movements WHERE id = $1',
      [id]
    );

    if (movementResult.rows.length === 0) {
      await pool.query('ROLLBACK');
      return res.status(404).json({ message: 'Movimiento no encontrado' });
    }

    const movement = movementResult.rows[0];
    const stockChange = movement.type === 'entrada' ? -movement.quantity : movement.quantity;

    // Actualizar stock producto
    const updateResult = await pool.query(
      'UPDATE products SET stock = stock + $1 WHERE id = $2 RETURNING *',
      [stockChange, movement.product_id]
    );

    if (updateResult.rows[0].stock < 0) {
      await pool.query('ROLLBACK');
      return res.status(400).json({ message: 'No se puede eliminar, stock negativo' });
    }

    // Eliminar movimiento
    await pool.query('DELETE FROM stock_movements WHERE id = $1', [id]);

    await pool.query('COMMIT');

    res.json({ message: 'Movimiento eliminado' });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ message: 'Error en la base de datos' });
  }
};
