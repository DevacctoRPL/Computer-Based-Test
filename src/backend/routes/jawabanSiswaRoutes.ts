import { Router } from "express";
import { getAllJawaban, getJawabanById, addJawaban, updateJawaban, deleteJawaban } from "../controllers/jawabanSiswaController.js";

const router = Router();

// Rute untuk mendapatkan semua jawaban
router.get("/jawaban", getAllJawaban);

// Rute untuk mendapatkan jawaban berdasarkan ID
router.get("/jawaban/:id", getJawabanById);

// Rute untuk menambahkan jawaban baru
router.post("/jawaban", addJawaban);

// Rute untuk memperbarui jawaban berdasarkan ID
router.put("/jawaban/:id", updateJawaban);

// Rute untuk menghapus jawaban berdasarkan ID
router.delete("/jawaban/:id", deleteJawaban);

export default router;
