import { Request, Response } from "express";
import RelSoalMapelKelasModel from "../models/relSoalMapelKelasModel.js";

export async function getAllRelSoalMapelKelas(req: Request, res: Response): Promise<void> {
  try {
    const relSoalMapelKelas = await RelSoalMapelKelasModel.getAllRelSoalMapelKelas();
    res.json(relSoalMapelKelas);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
}

export async function getRelSoalMapelKelasById(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  try {
    const relSoalMapelKelas = await RelSoalMapelKelasModel.getRelSoalMapelKelasById(id);
    if (relSoalMapelKelas) {
      res.json(relSoalMapelKelas);
    } else {
      res.status(404).json({ message: "Relation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
}

export async function addRelSoalMapelKelas(req: Request, res: Response): Promise<void> {
  const { id_soal, id_mapel_kelas } = req.body;
  try {
    await RelSoalMapelKelasModel.addRelSoalMapelKelas({ id_soal, id_mapel_kelas });
    res.status(201).json({ message: "Relation added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding relation", error });
    console.error(error);
  }
}

export async function updateRelSoalMapelKelas(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  const { id_soal, id_mapel_kelas } = req.body;
  try {
    await RelSoalMapelKelasModel.updateRelSoalMapelKelas(id, { id, id_soal, id_mapel_kelas });
    res.json({ message: "Relation updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating relation", error });
  }
}

export async function deleteRelSoalMapelKelas(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  try {
    await RelSoalMapelKelasModel.deleteRelSoalMapelKelas(id);
    res.json({ message: "Relation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting relation", error });
  }
}