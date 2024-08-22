import { Router } from 'express';
import NilaiSiswaController from '../test/controllers/nilai_siswaController.js';

const nilaiSiswaRoutes = Router();

nilaiSiswaRoutes.get('/nilai_siswa', NilaiSiswaController.getAll);
nilaiSiswaRoutes.get('/nilai_siswa/:id', NilaiSiswaController.getById);
nilaiSiswaRoutes.post('/nilai_siswa', NilaiSiswaController.add);
nilaiSiswaRoutes.put('/nilai_siswa/:id', NilaiSiswaController.update);
nilaiSiswaRoutes.delete('/nilai_siswa/:id', NilaiSiswaController.delete);

export default nilaiSiswaRoutes;
