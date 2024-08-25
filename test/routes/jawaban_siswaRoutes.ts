import { Router } from 'express';
import JawabanSiswaController from '../controllers/jawaban_siswaController.js';

const jawabanSiswaRoutes = Router();

jawabanSiswaRoutes.get('/jawaban_siswa', JawabanSiswaController.getAll);
jawabanSiswaRoutes.get('/jawaban_siswa/:id', JawabanSiswaController.getById);
jawabanSiswaRoutes.post('/jawaban_siswa', JawabanSiswaController.add);
jawabanSiswaRoutes.put('/jawaban_siswa/:id', JawabanSiswaController.update);
jawabanSiswaRoutes.delete('/jawaban_siswa/:id', JawabanSiswaController.delete);

export default jawabanSiswaRoutes;
