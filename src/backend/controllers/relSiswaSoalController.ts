import { Request, Response } from "express";
import RelSiswaSoalModel from "../models/relSiswaSoalModel.js";

export async function getAllRelSiswaSoal(req: Request, res: Response): Promise<void> {
  try {
    const relSiswaSoal = await RelSiswaSoalModel.getAllRelSiswaSoal();
    res.json(relSiswaSoal);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
}

export async function getRelSiswaSoalById(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  try {
    const relSiswaSoal = await RelSiswaSoalModel.getRelSiswaSoalById(id);
    if (relSiswaSoal) {
      res.json(relSiswaSoal);
    } else {
      res.status(404).json({ message: "Relation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
}

export async function addRelSiswaSoal(req: Request, res: Response): Promise<void> {
  const { nis, id_soal } = req.body;
  try {
    await RelSiswaSoalModel.addRelSiswaSoal({ nis, id_soal });
    res.status(201).json({ message: "Relation added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding relation", error });
    console.error(error);
  }
}

export async function updateRelSiswaSoal(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  const { nis, id_soal } = req.body;
  try {
    await RelSiswaSoalModel.updateRelSiswaSoal(id, { id, nis, id_soal });
    res.json({ message: "Relation updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating relation", error });
  }
}

export async function deleteRelSiswaSoal(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  try {
    await RelSiswaSoalModel.deleteRelSiswaSoal(id);
    res.json({ message: "Relation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting relation", error });
  }
}