import { Router } from 'express';
import JawabanSiswaController from '../controllers/jawaban_siswaController.js';
import { Request, Response, NextFunction } from 'express';

const jawabanSiswaRoutes = Router();

jawabanSiswaRoutes.get('/jawaban-siswa', JawabanSiswaController.getAll);
jawabanSiswaRoutes.get('/jawaban-siswa/:id', JawabanSiswaController.getById);
jawabanSiswaRoutes.post('/jawaban-siswa',JawabanSiswaController.add);
jawabanSiswaRoutes.put('/jawaban-siswa/:id', JawabanSiswaController.update);
jawabanSiswaRoutes.delete('/jawaban-siswa/:id', JawabanSiswaController.delete);

export default jawabanSiswaRoutes;
