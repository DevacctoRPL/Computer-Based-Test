import {Request, Response} from "express";
import SoalModel from "../models/soalModel.js";

export async function getAllSoal(req: Request, res: Response): Promise<void> {
  try {
    const soal = await SoalModel.getAllSoal();
    res.json(soal);
  } catch (error) {
    res.status(500).json({message: "Error retrieving Soal", error});
    console.error(error);
  }
}

export async function getSoalById(req: Request, res: Response): Promise<void> {
  const soalId = req.params.id;
  try {
    const soal = await SoalModel.getSoalById(soalId);
    if (soal) {
      res.json(soal);
    } else {
      res.status(404).json({message: "Soal not Found"});
    }
  } catch (error) {
    res.status(500).json({message: "Error retrieving Soal", error});
    console.error(error);
  }
}

export async function addSoal(req: Request, res: Response): Promise<void> {
  const {id, id_ujian, id_mapel, nig, nama_soal, pertanyaan, dibuat_pada} =
    req.body;
  try {
    await SoalModel.addSoal({
      id,
      id_ujian,
      id_mapel,
      nig,
      nama_soal,
      pertanyaan,
      dibuat_pada,
    });
    res.status(201).json({message: "Soal added successfully"});
  } catch (error) {
    res.status(500).json({message: "Error adding Soal", error});
  }
}

// Memperbarui pengguna
export async function updateSoal(req: Request, res: Response): Promise<void> {
  const soalId = req.body;
  const {nig, nama_soal, pertanyaan} = req.body;
  try {
    await SoalModel.updateSoal(soalId, {nig, nama_soal, pertanyaan});
    res.json({message: "Mapel updated successfully"});
  } catch (error) {
    res.status(500).json({message: "Error updating Mapel", error});
  }
}

// Menghapus pengguna
export async function deleteSoal(req: Request, res: Response): Promise<void> {
  const soalId = req.params.id;
  try {
    await SoalModel.deleteSoal(soalId);
    res.json({message: "User deleted successfully"});
  } catch (error) {
    res.status(500).json({message: "Error deleting user", error});
  }
}

// ini komen
