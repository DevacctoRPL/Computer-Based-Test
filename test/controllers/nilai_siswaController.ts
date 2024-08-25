import { Request, Response } from "express";
import Nilai_SiswaModel from "../models/nilai_siswaModel.js";

class NilaiSiswaController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const nilaiSiswa = await Nilai_SiswaModel.getAll();
      res.status(200).json(nilaiSiswa);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving data", error });
    }
  }

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
      res.status(500).json({ message: "Error retrieving data", error });
    }
  }

  static async add(req: Request, res: Response): Promise<void> {
    try {
      const nilaiSiswa = req.body;
      await Nilai_SiswaModel.add(nilaiSiswa);
      res.status(201).json({ message: "Nilai Siswa added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error adding data", error });
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
