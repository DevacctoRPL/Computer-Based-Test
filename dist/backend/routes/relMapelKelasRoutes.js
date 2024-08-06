import { Router } from "express";
import { getAllRelMapelKelas, getRelMapelKelasById, addRelMapelKelas, updateRelMapelKelas, deleteRelMapelKelas } from "../controllers/relMapelKelasController.js";
const relMapelKelasRoutes = Router();
// Rute untuk mendapatkan semua relasi mapel kelas
relMapelKelasRoutes.get("/rel-mapel-kelas", getAllRelMapelKelas);
// Rute untuk mendapatkan relasi mapel kelas berdasarkan ID
relMapelKelasRoutes.get("/rel-mapel-kelas/:id", getRelMapelKelasById);
// Rute untuk menambahkan relasi mapel kelas baru
relMapelKelasRoutes.post("/rel-mapel-kelas", addRelMapelKelas);
// Rute untuk memperbarui relasi mapel kelas
relMapelKelasRoutes.put("/rel-mapel-kelas/:id", updateRelMapelKelas);
// Rute untuk menghapus relasi mapel kelas
relMapelKelasRoutes.delete("/rel-mapel-kelas/:id", deleteRelMapelKelas);
export default relMapelKelasRoutes;
