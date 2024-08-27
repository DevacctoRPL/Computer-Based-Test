import { Router } from 'express';
import UjianController from '../controllers/detail_ujianController.js';

const detailUjianRoutes = Router();

detailUjianRoutes.get('/ujian', UjianController.getAllDetailUjian);
detailUjianRoutes.get('/ujian/:id', UjianController.getDetailUjianById);
detailUjianRoutes.post('/ujian', UjianController.addDetailUjian);
detailUjianRoutes.put('/ujian/:id', UjianController.updateDetailUjian);
detailUjianRoutes.delete('/ujian/:id', UjianController.deleteDetailUjian);

export default detailUjianRoutes;
