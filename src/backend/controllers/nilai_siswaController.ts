import { Request, Response } from "express";
import Nilai_SiswaModel from "../models/nilai_siswaModel.js";
import { Nilai_Siswa } from "../models/nilai_siswaModel.js";

class NilaiSiswaController {
  
  // Get all nilai siswa
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const nilaiSiswa = await Nilai_SiswaModel.getAll();
      res.status(200).json(nilaiSiswa);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving data", error: (error as Error).message });
    }
  }

  // Get nilai siswa by id
  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const nilaiSiswa = await Nilai_SiswaModel.getById(Number(id));
      if (nilaiSiswa) {
        res.status(200).json(nilaiSiswa);
      } else {
        res.status(404).json({ message: "Nilai Siswa not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error retrieving data", error: (error as Error).message });
    }
  }

  // Add new nilai siswa
  static async add(req: Request, res: Response): Promise<void> {
    try {
      // Validasi input dari req.body
      const nilaiSiswa: Nilai_Siswa = req.body;
      if (!nilaiSiswa.nis || !nilaiSiswa.id_ujian || !nilaiSiswa.nilai_akhir || !nilaiSiswa.detil_nilai) {
        res.status(400).json({ message: "Invalid input data" });
        return;
      }

      await Nilai_SiswaModel.add(nilaiSiswa);
      res.status(201).json({ message: "Nilai Siswa added successfully" });
    } catch (error) {
      const errorMessage = (error as Error).message;
      res.status(500).json({ message: "Error adding data", error: errorMessage });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const nilaiSiswa = req.body;
      await Nilai_SiswaModel.update(Number(id), nilaiSiswa);
      res.status(200).json({ message: "Nilai Siswa updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating data", error });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await Nilai_SiswaModel.delete(Number(id));
      res.status(200).json({ message: "Nilai Siswa deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting data", error });
    }
  }
}

export default NilaiSiswaController;
