import { Router } from 'express';
import RelKelasMapelController from '../test/controllers/rel_kelas_mapelController.js';

const relKelasMapelRoutes = Router();

relKelasMapelRoutes.get('/rel_kelas_mapel', RelKelasMapelController.getAll);
relKelasMapelRoutes.get('/rel_kelas_mapel/:id', RelKelasMapelController.getById);
relKelasMapelRoutes.post('/rel_kelas_mapel', RelKelasMapelController.add);
relKelasMapelRoutes.put('/rel_kelas_mapel/:id', RelKelasMapelController.update);
relKelasMapelRoutes.delete('/rel_kelas_mapel/:id', RelKelasMapelController.delete);

export default relKelasMapelRoutes;
