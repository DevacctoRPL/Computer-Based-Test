import { Router } from 'express';
import NilaiSiswaController from '../controllers/nilai_siswaController.js';

const nilaiSiswaRoutes = Router();

nilaiSiswaRoutes.get('/nilai-siswa', NilaiSiswaController.getAll);
nilaiSiswaRoutes.get('/nilai-siswa/:id', NilaiSiswaController.getById);
nilaiSiswaRoutes.post('/nilai-siswa', NilaiSiswaController.add);
nilaiSiswaRoutes.put('/nilai-siswa/:id', NilaiSiswaController.update);
nilaiSiswaRoutes.delete('/nilai-siswa/:id', NilaiSiswaController.delete);

export default nilaiSiswaRoutes;
