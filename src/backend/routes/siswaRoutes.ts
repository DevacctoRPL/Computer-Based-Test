import { Router } from 'express';
import { getAllSiswa, getSiswaByNis, addSiswa, updateSiswa, deleteSiswa } from '../controllers/siswaController.js';

const userRoutes = Router();

// Rute untuk mendapatkan semua pengguna
userRoutes.get('/siswa', getAllSiswa); //Passed

// Rute untuk mendapatkan pengguna berdasarkan ID
userRoutes.get('/siswa/:id', getSiswaByNis); //Passed

// Rute untuk menambahkan pengguna baru
userRoutes.post('/siswa', addSiswa); //Passed

// Rute untuk memperbarui pengguna
userRoutes.put('/siswa/:id', updateSiswa); //Passed

// Rute untuk menghapus pengguna
userRoutes.delete('/siswa/:id', deleteSiswa); //Passed

export default userRoutes;
