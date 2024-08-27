import { Request, Response } from "express";
import PertanyaanModel from "../models/pertanyaanModel.js";

class PertanyaanController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const pertanyaan = await PertanyaanModel.getAll();
      res.status(200).json(pertanyaan);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving data", error });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const pertanyaan = await PertanyaanModel.getById(Number(id));
      if (pertanyaan) {
        res.status(200).json(pertanyaan);
      } else {
        res.status(404).json({ message: "Pertanyaan not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error retrieving data", error });
    }
  }

  static async add(req: Request, res: Response): Promise<void> {
    try {
      const pertanyaan = req.body;
      await PertanyaanModel.add(pertanyaan);
      res.status(201).json({ message: "Pertanyaan added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error adding data", error });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const pertanyaan = req.body;
      await PertanyaanModel.update(Number(id), pertanyaan);
      res.status(200).json({ message: "Pertanyaan updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating data", error });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await PertanyaanModel.delete(Number(id));
      res.status(200).json({ message: "Pertanyaan deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting data", error });
    }
  }
}

export default PertanyaanController;
