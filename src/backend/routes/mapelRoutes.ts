import {Router} from "express";
import {getAllMapel, getMapelById, addMapel, updateMapel, deleteMapel} from "../controllers/mapelController.js";

const mapelRoutes = Router();

// Rute untuk mendapatkan semua pengguna
mapelRoutes.get("/mapel", getAllMapel); // Passed

// Rute untuk mendapatkan pengguna berdasarkan ID
mapelRoutes.get("/mapel/:id", getMapelById); // Passed

// Rute untuk menambahkan pengguna baru
mapelRoutes.post("/mapel", addMapel); // Passed

// Rute untuk memperbarui pengguna
mapelRoutes.put("/mapel/:id", updateMapel); // Passed

// Rute untuk menghapus pengguna
mapelRoutes.delete("/mapel/:id", deleteMapel); // Passed

export default mapelRoutes; // ini komen
