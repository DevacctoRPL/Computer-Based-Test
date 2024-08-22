import { Router } from 'express';
import PertanyaanController from '../test/controllers/pertanyaanController.js';

const pertanyaanRoutes = Router();

pertanyaanRoutes.get('/pertanyaan', PertanyaanController.getAll);
pertanyaanRoutes.get('/pertanyaan/:id', PertanyaanController.getById);
pertanyaanRoutes.post('/pertanyaan', PertanyaanController.add);
pertanyaanRoutes.put('/pertanyaan/:id', PertanyaanController.update);
pertanyaanRoutes.delete('/pertanyaan/:id', PertanyaanController.delete);

export default pertanyaanRoutes;
