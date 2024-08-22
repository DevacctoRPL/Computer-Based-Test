import { Router } from 'express';
import MapelController from '../test/controllers/mapelController.js';

const mapelRoutes = Router();

mapelRoutes.get('/mapel', MapelController.getAll);
mapelRoutes.get('/mapel/:id', MapelController.getById);
mapelRoutes.post('/mapel', MapelController.add);
mapelRoutes.put('/mapel/:id', MapelController.update);
mapelRoutes.delete('/mapel/:id', MapelController.delete);

export default mapelRoutes;
