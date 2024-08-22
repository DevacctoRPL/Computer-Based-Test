import { Router } from 'express';
import RelGuruKelasController from '../test/controllers/rel_guru_kelasController.js';

const relGuruKelasRoutes = Router();

relGuruKelasRoutes.get('/rel_guru_kelas', RelGuruKelasController.getAll);
relGuruKelasRoutes.get('/rel_guru_kelas/:id', RelGuruKelasController.getById);
relGuruKelasRoutes.post('/rel_guru_kelas', RelGuruKelasController.add);
relGuruKelasRoutes.put('/rel_guru_kelas/:id', RelGuruKelasController.update);
relGuruKelasRoutes.delete('/rel_guru_kelas/:id', RelGuruKelasController.delete);

export default relGuruKelasRoutes;
