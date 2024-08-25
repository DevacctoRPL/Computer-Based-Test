import { Router } from 'express';
import JawabanPertanyaanController from '../controllers/jawaban_pertanyaanController.js';

const jawabanPertanyaanRoutes = Router();

jawabanPertanyaanRoutes.get('/jawaban_pertanyaan', JawabanPertanyaanController.getAll);
jawabanPertanyaanRoutes.get('/jawaban_pertanyaan/:id', JawabanPertanyaanController.getById);
jawabanPertanyaanRoutes.post('/jawaban_pertanyaan', JawabanPertanyaanController.add);
jawabanPertanyaanRoutes.put('/jawaban_pertanyaan/:id', JawabanPertanyaanController.update);
jawabanPertanyaanRoutes.delete('/jawaban_pertanyaan/:id', JawabanPertanyaanController.delete);

export default jawabanPertanyaanRoutes;
