import { Router } from "express";
import { getAllRelSiswaSoal, getRelSiswaSoalById, addRelSiswaSoal, updateRelSiswaSoal, deleteRelSiswaSoal, } from "../controllers/relSiswaSoalController.js";
const relSiswaSoalRoutes = Router();
relSiswaSoalRoutes.get("/rel-siswa-soal", getAllRelSiswaSoal);
relSiswaSoalRoutes.get("/rel-siswa-soal/:id", getRelSiswaSoalById);
relSiswaSoalRoutes.post("/rel-siswa-soal", addRelSiswaSoal);
relSiswaSoalRoutes.put("/rel-siswa-soal/:id", updateRelSiswaSoal);
relSiswaSoalRoutes.delete("/rel-siswa-soal/:id", deleteRelSiswaSoal);
export default relSiswaSoalRoutes;
