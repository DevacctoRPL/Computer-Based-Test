import { Router } from 'express';
import { getAllRelGuruMapel, getRelGuruMapelById, addRelGuruMapel, updateRelGuruMapel, deleteRelGuruMapel } from '../controllers/relGuruMapelController.js';
const relGuruMapelRoutes = Router();
// Rute untuk mendapatkan semua relasi guru mapel
relGuruMapelRoutes.get('/rel-guru-mapel', getAllRelGuruMapel);
// Rute untuk mendapatkan relasi guru mapel berdasarkan ID
relGuruMapelRoutes.get('/rel-guru-mapel/:id', getRelGuruMapelById);
// Rute untuk menambahkan relasi guru mapel baru
relGuruMapelRoutes.post('/rel-guru-mapel', addRelGuruMapel);
// Rute untuk memperbarui relasi guru mapel
relGuruMapelRoutes.put('/rel-guru-mapel/:id', updateRelGuruMapel);
// Rute untuk menghapus relasi guru mapel
relGuruMapelRoutes.delete('/rel-guru-mapel/:id', deleteRelGuruMapel);
export default relGuruMapelRoutes;
