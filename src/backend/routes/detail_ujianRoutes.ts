import { Router } from 'express';
import UjianController from '../test/controllers/detail_ujianController.js';

const detailUjianRoutes = Router();

detailUjianRoutes.get('/ujian', UjianController.getAll);
detailUjianRoutes.get('/ujian/:id', UjianController.getById);
detailUjianRoutes.post('/ujian', UjianController.add);
detailUjianRoutes.put('/ujian/:id', UjianController.update);
detailUjianRoutes.delete('/ujian/:id', UjianController.delete);

export default detailUjianRoutes;
