import { Request, Response } from "express";
import ujianModel from "../models/ujianModel.js";

export async function getAllUjian(req: Request, res: Response): Promise<void> {
  try {
    const ujian = await ujianModel.getAllUjian();
    res.json(ujian);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving ujian", error });
    console.error(error);
  }
}

export async function getUjianById(req: Request, res: Response): Promise<void> {
  const ujianId = req.params.id;
  try {
    const ujian = await ujianModel.getUjianById(ujianId);
    if (ujian) {
      res.json(ujian);
    } else {
      res.status(404).json({ message: "ujian not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving ujian", error });
    console.error(error);
  }
}

export async function addUjian(req: Request, res: Response): Promise<void> {
  const {id, nama_ujian, dimulai_pada, berakhir_pada, dibuat_pada } =
    req.body;
  try {
    await ujianModel.addUjian({
        id, nama_ujian, dimulai_pada, berakhir_pada, dibuat_pada
    });
    res.status(201).json({ message: "ujian added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding ujian", error });
  }
}

// Memperbarui pengguna
export async function updateUjian(req: Request, res: Response): Promise<void> {
  const ujianId = req.body
  const { id, nama_ujian, dimulai_pada, berakhir_pada, dibuat_pada} = req.body;
  try {
    await ujianModel.updateUjian(ujianId, {id, nama_ujian, dimulai_pada, berakhir_pada, dibuat_pada});
    res.json({ message: "Mapel updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating Mapel", error });
  }
}

// Menghapus pengguna
export async function deleteUjian(req: Request, res: Response): Promise<void> {
  const ujianId = req.params.id;
  try {
    await ujianModel.deleteUjian(ujianId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
}

//ini komen
