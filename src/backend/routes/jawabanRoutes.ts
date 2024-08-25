import {getAllJawaban, getJawabanById, addJawaban, updateJawaban, deleteJawaban} from '../controllers/jawabanController.js'
import { Router } from 'express'

const jawabanRoutes = Router();

// Rute untuk mendapatkan semua pengguna
jawabanRoutes.get('/jawaban', getAllJawaban); 

// Rute untuk mendapatkan pengguna berdasarkan ID
jawabanRoutes.get('/jawaban/:id', getJawabanById); 

// Rute untuk menambahkan pengguna baru
jawabanRoutes.post('/jawaban', addJawaban); 

// Rute untuk memperbarui pengguna
jawabanRoutes.put('/jawaban/:id', updateJawaban); 

// Rute untuk menghapus pengguna
jawabanRoutes.delete('/jawaban/:id', deleteJawaban); 

export default jawabanRoutes; //ini komen