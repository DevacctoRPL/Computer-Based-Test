import { Router } from 'express';
import UjianController from '../controllers/detail_ujianController.js';

const detailUjianRoutes = Router();

detailUjianRoutes.get('/detil-ujian', UjianController.getAllDetailUjian);
detailUjianRoutes.get('/detil-ujian/:id', UjianController.getDetailUjianById);
detailUjianRoutes.post('/detil-ujian', UjianController.addDetailUjian);
detailUjianRoutes.put('/detil-ujian/:id', UjianController.updateDetailUjian);
detailUjianRoutes.delete('/detil-ujian/:id', UjianController.deleteDetailUjian);

export default detailUjianRoutes;
