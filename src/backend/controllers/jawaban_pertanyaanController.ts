import { Request, Response } from "express";
import Jawaban_PertanyaanModel from "../models/jawaban_pertanyaanModel.js";

class JawabanPertanyaanController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const jawaban = await Jawaban_PertanyaanModel.getAll();
      res.status(200).json(jawaban);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving data", error });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const jawaban = await Jawaban_PertanyaanModel.getById(id);
      if (jawaban) {
        res.status(200).json(jawaban);
      } else {
        res.status(404).json({ message: "Jawaban not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error retrieving data", error });
    }
  }

  static async add(req: Request, res: Response): Promise<void> {
    try {
      const jawaban = req.body;
      await Jawaban_PertanyaanModel.add(jawaban);
      res.status(201).json({ message: "Jawaban added successfully" });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Error adding data", error });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const jawaban = req.body;
      await Jawaban_PertanyaanModel.update(id, jawaban);
      res.status(200).json({ message: "Jawaban updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating data", error });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await Jawaban_PertanyaanModel.delete(id);
      res.status(200).json({ message: "Jawaban deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting data", error });
    }
  }
}

export default JawabanPertanyaanController;
