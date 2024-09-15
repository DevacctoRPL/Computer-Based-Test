import { Request, Response } from "express";
import MapelModel from "../models/mapelModel.js";

class MapelController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const mapel = await MapelModel.getAll();
      res.status(200).json(mapel);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving data", error });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const mapel = await MapelModel.getById(id);
      if (mapel) {
        res.status(200).json(mapel);
      } else {
        res.status(404).json({ message: "Mapel not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error retrieving data", error });
    }
  }

  static async add(req: Request, res: Response): Promise<void> {
    try {
      const { id, nama_mapel, dibuat_pada } = req.body;
      await MapelModel.add({ id, nama_mapel, dibuat_pada });
      res.status(201).json({ message: "Mapel added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error adding data", error });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { nama_mapel, dibuat_pada } = req.body;
      await MapelModel.update(id, { nama_mapel, dibuat_pada });
      res.status(200).json({ message: "Mapel updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating data", error });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await MapelModel.delete(id);
      res.status(200).json({ message: "Mapel deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting data", error });
    }
  }
}

export default MapelController;
