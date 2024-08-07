import { Request, Response } from "express";
import RelGuruMapelModel from "../models/relGuruMapelModel.js";

async function getAllRelGuruMapel(req: Request, res: Response): Promise<void> {
  try {
    const relGuruMapel = await RelGuruMapelModel.getAllRelGuruMapel();
    res.json(relGuruMapel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
}

async function getRelGuruMapelById(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  try {
    const relGuruMapel = await RelGuruMapelModel.getRelGuruMapelById(id);
    if (relGuruMapel) {
      res.json(relGuruMapel);
    } else {
      res.status(404).json({ message: "Relation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
}

async function addRelGuruMapel(req: Request, res: Response): Promise<void> {
  const { nig, id_mapel } = req.body;
  try {
    await RelGuruMapelModel.addRelGuruMapel({ nig, id_mapel });
    res.status(201).json({ message: "Relation added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding relation", error });
  }
}

async function updateRelGuruMapel(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  const { nig, id_mapel } = req.body;
  try {
    await RelGuruMapelModel.updateRelGuruMapel(id, { id, nig, id_mapel });
    res.json({ message: "Relation updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating relation", error });
  }
}

async function deleteRelGuruMapel(req: Request, res: Response): Promise<void> {
  const id = req.params.id;
  try {
    await RelGuruMapelModel.deleteRelGuruMapel(id);
    res.json({ message: "Relation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting relation", error });
  }
}

export {
  getAllRelGuruMapel,
  getRelGuruMapelById,
  addRelGuruMapel,
  updateRelGuruMapel,
  deleteRelGuruMapel
};
