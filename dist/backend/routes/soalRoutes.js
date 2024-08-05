import { Router } from 'express';
import { getAllSoal, getSoalById, addSoal, updateSoal, deleteSoal } from '../controllers/soalController.js';
const soalRoutes = Router();
// Rute untuk mendapatkan semua pengguna
soalRoutes.get('/soal', getAllSoal);
// Rute untuk mendapatkan pengguna berdasarkan ID
soalRoutes.get('/soal/:id', getSoalById);
// Rute untuk menambahkan pengguna baru
soalRoutes.post('/soal', addSoal);
// Rute untuk memperbarui pengguna
soalRoutes.put('/soal/:id', updateSoal);
// Rute untuk menghapus pengguna
soalRoutes.delete('/soal/:id', deleteSoal);
export default soalRoutes; //ini komen
