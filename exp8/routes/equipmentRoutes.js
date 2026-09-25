import express from 'express';
import {
  getAllEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment
} from '../controllers/equipmentController.js';
import { apiKeyAuth } from '../middleware/auth.js';

const router = express.Router();

// Public Read Endpoints
router.get('/', getAllEquipment);
router.get('/:id', getEquipmentById);

// Protected Write Endpoints (Requires Bearer token)
router.post('/', apiKeyAuth, createEquipment);
router.put('/:id', apiKeyAuth, updateEquipment);
router.delete('/:id', apiKeyAuth, deleteEquipment);

export default router;
