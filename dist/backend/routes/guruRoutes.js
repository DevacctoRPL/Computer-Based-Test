import { Router } from 'express';
import { getAllGuru, getGuruByNig, addGuru, updateGuru, deleteGuru } from '../test/controllers/guruController.js';
const guruRoutes = Router();
// Rute untuk mendapatkan semua pengguna
guruRoutes.get('/guru', getAllGuru); //Passed
// Rute untuk mendapatkan pengguna berdasarkan ID
guruRoutes.get('/guru/:id', getGuruByNig); //Passed
// Rute untuk menambahkan pengguna baru
guruRoutes.post('/guru', addGuru); //Passed
// Rute untuk memperbarui pengguna
guruRoutes.put('/guru/:id', updateGuru); //Passed
// Rute untuk menghapus pengguna
guruRoutes.delete('/guru/:id', deleteGuru); //Passed  
export default guruRoutes; //ini komen
