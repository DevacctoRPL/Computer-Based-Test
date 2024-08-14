import { Router } from 'express';
import NilaiController from '../controllers/nilaiController.js';
const nilaiRoutes = Router();
nilaiRoutes.get('/nilai', NilaiController.getAllNilai);
nilaiRoutes.get('/nilai/:id', NilaiController.getNilaiById);
nilaiRoutes.post('/nilai', NilaiController.addNilai);
nilaiRoutes.put('/nilai/:id', NilaiController.updateNilai);
nilaiRoutes.delete('/nilai/:id', NilaiController.deleteNilai);
export default nilaiRoutes;
