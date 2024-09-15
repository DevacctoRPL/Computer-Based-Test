import { Router } from 'express';
import JawabanPertanyaanController from '../controllers/jawaban_pertanyaanController.js';

const jawabanPertanyaanRoutes = Router();

jawabanPertanyaanRoutes.get('/jawaban-pertanyaan', JawabanPertanyaanController.getAll);
jawabanPertanyaanRoutes.get('/jawaban-pertanyaan/:id', JawabanPertanyaanController.getById);
jawabanPertanyaanRoutes.post('/jawaban-pertanyaan', JawabanPertanyaanController.add);
jawabanPertanyaanRoutes.put('/jawaban-pertanyaan/:id', JawabanPertanyaanController.update);
jawabanPertanyaanRoutes.delete('/jawaban-pertanyaan/:id', JawabanPertanyaanController.delete);

export default jawabanPertanyaanRoutes;
