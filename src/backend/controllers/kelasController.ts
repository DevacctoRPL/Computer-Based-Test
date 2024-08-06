import {Request, Response} from "express";
import KelasModel from "../models/kelasModel.js";

export async function getAllKelas(req: Request, res: Response): Promise<void> {
  try {
    const mapel = await KelasModel.getAllKelas();
    res.json(mapel);
  } catch (error) {
    res.status(500).json({message: "Error when retrieving mapel", error});
    console.log(error);
  }
}

export async function getKelasById(req: Request, res: Response): Promise<void> {
  const kelasId = req.params.id;
  try {
    const kelas = await KelasModel.getKelasById(kelasId);
    if (kelas) {
      res.json(kelas);
    } else {
      res.status(404).json({message: "kelas not Found"});
    }
  } catch (error) {
    res.status(500).json({message: "Error retrieving kelas", error});
    console.error(error);
  }
}

export async function addKelas(req: Request, res: Response): Promise<void> {
  const {id, nama_kelas, jurusan, angkatan} = req.body;
  try {
    await KelasModel.addKelas({id, nama_kelas, jurusan, angkatan});
    res.status(201).json({message: "kelas added successfully"});
  } catch (error) {
    res.status(500).json({message: "Error adding kelas", error});
  }
}

export async function updateKelas(req: Request, res: Response): Promise<void> {
  const kelasId = req.params.id;
  const {id, nama_kelas, jurusan, angkatan} = req.body;
  try {
    await KelasModel.updateKelas(kelasId, {
      id, nama_kelas, jurusan, angkatan,
    });
    res.json({message: "kelas updated successfully"});
  } catch (error) {
    res.status(500).json({message: "Error updating kelas", error});
  }
}

export async function deleteKelas(req: Request, res: Response): Promise<void> {
  const kelasId = req.params.id;
  try {
    await KelasModel.deleteKelas(kelasId);
    res.json({message: "Kelas deleted successfully"});
  } catch (error) {
    res.status(500).json({message: "Error deleting Kelas", error});
  }
}
// ini komen
