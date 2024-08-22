import { Router } from 'express';
import RelSoalKelasController from '../test/controllers/rel_soal_kelasController.js';

const relSoalKelasRoutes = Router();

relSoalKelasRoutes.get('/rel_soal_kelas', RelSoalKelasController.getAll);
relSoalKelasRoutes.get('/rel_soal_kelas/:id', RelSoalKelasController.getById);
relSoalKelasRoutes.post('/rel_soal_kelas', RelSoalKelasController.add);
relSoalKelasRoutes.put('/rel_soal_kelas/:id', RelSoalKelasController.update);
relSoalKelasRoutes.delete('/rel_soal_kelas/:id', RelSoalKelasController.delete);

export default relSoalKelasRoutes;
