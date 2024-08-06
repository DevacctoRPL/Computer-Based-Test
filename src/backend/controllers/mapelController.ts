import {Request, Response} from "express";
import MapelModel from "../models/mapelModel.js";

export async function getAllMapel(req: Request, res: Response): Promise<void> {
  try {
    const mapel = await MapelModel.getAllMapel();
    res.json(mapel);
  } catch (error) {
    res.status(500).json({message: "Error retrieving mapel", error});
    console.error(error);
  }
}

export async function getMapelById(req: Request, res: Response): Promise<void> {
  const mapelId = req.params.id;
  try {
    const mapel = await MapelModel.getMapelById(mapelId);
    if (mapel) {
      res.json(mapel);
    } else {
      res.status(404).json({message: "Mapel not Found"});
    }
  } catch (error) {
    res.status(500).json({message: "Error retrieving mapel", error});
    console.error(error);
  }
}

export async function addMapel(req: Request, res: Response): Promise<void> {
  const {id, nama_mapel} = req.body;
  try {
    await MapelModel.addMapel({id, nama_mapel});
    res.status(201).json({message: "Mapel added successfully"});
  } catch (error) {
    res.status(500).json({message: "Error adding Mapel", error});
  }
}

// Memperbarui pengguna
export async function updateMapel(req: Request, res: Response): Promise<void> {
  const mapelId = req.params.id;
  const {id, nama_mapel} = req.body;
  try {
    await MapelModel.updateMapel(mapelId, {
      id,
      nama_mapel,
    });
    res.json({message: "Mapel updated successfully"});
  } catch (error) {
    res.status(500).json({message: "Error updating Mapel", error});
  }
}

// Menghapus pengguna
export async function deleteMapel(req: Request, res: Response): Promise<void> {
  const mapelId = req.params.id;
  try {
    await MapelModel.deleteMapel(mapelId);
    res.json({message: "User deleted successfully"});
  } catch (error) {
    res.status(500).json({message: "Error deleting user", error});
  }
}

// ini komen
