import { Request, Response } from "express";
import Jawaban_SiswaModel from "../models/jawaban_siswaModel.js";
import {JawabanSiswa} from "../models/jawaban_siswaModel.js";

class JawabanSiswaController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const jawabanSiswa = await Jawaban_SiswaModel.getAll();
      res.status(200).json(jawabanSiswa);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving data", error });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const jawabanSiswa = await Jawaban_SiswaModel.getById(Number(id));
      if (jawabanSiswa) {
        res.status(200).json(jawabanSiswa);
      } else {
        res.status(404).json({ message: "Jawaban Siswa not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error retrieving data", error });
    }
  }

  static async add(req: Request, res: Response): Promise<void> {
    try {
      // Validasi input dari req.body
      const jawabanSiswa: JawabanSiswa = req.body;
      if (!jawabanSiswa.nis || !jawabanSiswa.id_pertanyaan || !jawabanSiswa.jawaban) {
        res.status(400).json({ message: "Invalid input data" });
        return;
      }

      await Jawaban_SiswaModel.add(jawabanSiswa);
      res.status(201).json({ message: "Jawaban Siswa added successfully" });
    } catch (error) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ message: "Error adding data", error: errorMessage });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const jawabanSiswa = req.body;
      await Jawaban_SiswaModel.update(Number(id), jawabanSiswa);
      res.status(200).json({ message: "Jawaban Siswa updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating data", error });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await Jawaban_SiswaModel.delete(Number(id));
      res.status(200).json({ message: "Jawaban Siswa deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting data", error });
    }
  }
}

export default JawabanSiswaController;
