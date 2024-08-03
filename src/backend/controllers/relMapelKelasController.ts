import { Request, Response } from "express";
import RelMapelKelasModel from "../models/relMapelKelasModel.js";

async function getAllRelMapelKelas(req: Request, res: Response): Promise<void> {
  try {
    const relMapelKelas = await RelMapelKelasModel.getAllRelMapelKelas();
    res.json(relMapelKelas);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
}

async function getRelMapelKelasById(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  try {
    const relMapelKelas = await RelMapelKelasModel.getRelMapelKelasById(id);
    if (relMapelKelas) {
      res.json(relMapelKelas);
    } else {
      res.status(404).json({ message: "Relation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
}

async function addRelMapelKelas(req: Request, res: Response): Promise<void> {
  const { id_kelas, id_mapel } = req.body;
  try {
    await RelMapelKelasModel.addRelMapelKelas({id_kelas, id_mapel });
    res.status(201).json({ message: "Relation added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding relation", error });
    console.error(error)
  }
}

async function updateRelMapelKelas(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  const { id_kelas, id_mapel } = req.body;
  try {
    await RelMapelKelasModel.updateRelMapelKelas(id, { id, id_kelas, id_mapel });
    res.json({ message: "Relation updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating relation", error });
  }
}

async function deleteRelMapelKelas(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  try {
    await RelMapelKelasModel.deleteRelMapelKelas(id);
    res.json({ message: "Relation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting relation", error });
  }
}

export {
  getAllRelMapelKelas,
  getRelMapelKelasById,
  addRelMapelKelas,
  updateRelMapelKelas,
  deleteRelMapelKelas
};
