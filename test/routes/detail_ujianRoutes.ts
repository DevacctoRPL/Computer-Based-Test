import { Router } from 'express';
import UjianController from '../controllers/detail_ujianController.js';

const detailUjianRoutes = Router();

detailUjianRoutes.get('/detail-ujian/:id', UjianController.getDetailUjianById);
detailUjianRoutes.post('/detail-ujian', UjianController.addDetailUjian);
detailUjianRoutes.put('/detail-ujian/:id', UjianController.updateDetailUjian);
detailUjianRoutes.delete('/detail-ujian/:id', UjianController.deleteDetailUjian);

//Query indexing
detailUjianRoutes.get('/detail-ujian', UjianController.getAllDetailUjian);

export default detailUjianRoutes;
