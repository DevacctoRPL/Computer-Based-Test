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

// Add new jawaban siswa
static async add(req: Request, res: Response): Promise<void> {
  console.log(req.body)
  try {
    // Validasi input dari req.body
    const { nis, id_pertanyaan, jawaban, id_detail_ujian }: JawabanSiswa = req.body;
    console.log({ nis, id_pertanyaan, jawaban, id_detail_ujian })

    // Cek apakah data yang dibutuhkan ada dan valid
    if (!nis || !id_pertanyaan || !jawaban) {
      res.status(400).json({ message: "Invalid input data: Missing required fields" });
      return;
    }

    if (typeof nis !== "number" || typeof id_pertanyaan !== "string") {
      res.status(400).json({ message: "Invalid input data: Incorrect data types" });
      return;
    }

    // Cek apakah jawaban berupa string JSON yang valid
    try {
      JSON.parse(jawaban); // Validasi apakah jawaban bisa di-parse
    } catch (error) {
      res.status(422).json({ message: "Invalid input data: Jawaban must be a valid JSON string" });
      return;
    }

    // Lanjutkan menyimpan jawaban siswa
    const insertResult = await Jawaban_SiswaModel.add({ nis, id_pertanyaan, jawaban, id_detail_ujian });
    console.log(insertResult)

    // Return ID dari jawaban yang disimpan atau pesan sukses
    res.status(201).json({ message: "Jawaban Siswa added successfully", id: insertResult });
    
  } catch (error) {
    console.error("Error while adding Jawaban Siswa:", error); // Logging error lebih jelas
    const errorMessage = (error as Error).message;
    
    // Respon dengan status 500 untuk kesalahan server
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
