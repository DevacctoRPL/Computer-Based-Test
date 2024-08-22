import { Router } from 'express';
import { getAllUjian, getUjianById, addUjian, updateUjian, deleteUjian } from '../test/controllers/ujianController.js';
const ujianRoutes = Router();
// Rute untuk mendapatkan semua pengguna
ujianRoutes.get('/ujian', getAllUjian);
// Rute untuk mendapatkan pengguna berdasarkan ID
ujianRoutes.get('/ujian/:id', getUjianById);
// Rute untuk menambahkan pengguna baru
ujianRoutes.post('/ujian', addUjian);
// Rute untuk memperbarui pengguna
ujianRoutes.put('/ujian/:id', updateUjian);
// Rute untuk menghapus pengguna
ujianRoutes.delete('/ujian/:id', deleteUjian);
export default ujianRoutes; //ini komen
