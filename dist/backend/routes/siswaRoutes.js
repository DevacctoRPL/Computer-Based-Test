import { Router } from 'express';
import { getAllSiswa, getSiswaByNis, addSiswa, updateSiswa, deleteSiswa } from '../controllers/siswaController.js';
const siswaRoutes = Router();
// Rute untuk mendapatkan semua pengguna
siswaRoutes.get('/siswa', getAllSiswa); //Passed
// Rute untuk mendapatkan pengguna berdasarkan ID
siswaRoutes.get('/siswa/:id', getSiswaByNis); //Passed
// Rute untuk menambahkan pengguna baru
siswaRoutes.post('/siswa', addSiswa); //Passed
// Rute untuk memperbarui pengguna
siswaRoutes.put('/siswa/:id', updateSiswa); //Passed
// Rute untuk menghapus pengguna
siswaRoutes.delete('/siswa/:id', deleteSiswa); //Passed
export default siswaRoutes; //ini komen
