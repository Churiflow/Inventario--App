import { Router } from 'express';
import * as movementController from '../controllers/movementController.js';

const router = Router();

router.get('/', movementController.getAllMovements);
router.get('/:id', movementController.getMovementById);
router.post('/', movementController.createMovement);
router.put('/:id', movementController.updateMovement);
router.delete('/:id', movementController.deleteMovement);

export default router;
