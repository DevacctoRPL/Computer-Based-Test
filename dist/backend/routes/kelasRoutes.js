import { Router } from 'express';
import { getAllKelas, getKelasById, addKelas, updateKelas, deleteKelas } from '../test/controllers/kelasController.js';
const kelasRoutes = Router();
// Rute untuk mendapatkan semua pengguna
kelasRoutes.get('/kelas', getAllKelas); //Passed
// Rute untuk mendapatkan pengguna berdasarkan ID
kelasRoutes.get('/kelas/:id', getKelasById); //Passed
// Rute untuk menambahkan pengguna baru
kelasRoutes.post('/kelas', addKelas); //Passed
// Rute untuk memperbarui pengguna
kelasRoutes.put('/kelas/:id', updateKelas); //Passed
// Rute untuk menghapus pengguna
kelasRoutes.delete('/kelas/:id', deleteKelas); //Passed
export default kelasRoutes; //ini komen
