import { Router } from "express";
import {
  getAllRelSoalMapelKelas,
  getRelSoalMapelKelasById,
  addRelSoalMapelKelas,
  updateRelSoalMapelKelas,
  deleteRelSoalMapelKelas
} from "../controllers/relSoalMapelKelasController.js";

const relSoalMapelKelasRoutes = Router();

relSoalMapelKelasRoutes.get("/rel-soal-mapel-kelas", getAllRelSoalMapelKelas);
relSoalMapelKelasRoutes.get("/rel-soal-mapel-kelas/:id", getRelSoalMapelKelasById);
relSoalMapelKelasRoutes.post("/rel-soal-mapel-kelas", addRelSoalMapelKelas);
relSoalMapelKelasRoutes.put("/rel-soal-mapel-kelas/:id", updateRelSoalMapelKelas);
relSoalMapelKelasRoutes.delete("/rel-soal-mapel-kelas/:id", deleteRelSoalMapelKelas);

export default relSoalMapelKelasRoutes;
