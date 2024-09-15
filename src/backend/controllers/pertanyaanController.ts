import { Request, Response } from "express";
import PertanyaanModel from "../models/pertanyaanModel.js";
import { Pertanyaan } from "../models/pertanyaanModel.js";

class PertanyaanController {
  static async getDetailByFields(req: Request, res: Response): Promise<void> {
    try {
      const { id, nomor, pertanyaan, gambar,id_detail_ujian } = req.query;

      // Prepare fields object
      const fields: Partial<Pertanyaan> = {
        id: id as string,
        nomor: nomor ? parseInt(nomor as string) : undefined,
        pertanyaan: pertanyaan as string,
        gambar: gambar as string,
        id_detail_ujian: id_detail_ujian as string
      };

      // Call the new model method with the fields
      const detailUjian = await PertanyaanModel.getDetailByFields(fields);
      res.json(detailUjian);
    } catch (error) {
      res.status(500).json({ message: 'Error when retrieving detail ujian', error });
      console.log(error);
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const pertanyaan = await PertanyaanModel.getById((id));
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
      console.log(error )
      res.status(500).json({ message: "Error adding data", error });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const pertanyaan = req.body;
      await PertanyaanModel.update((id), pertanyaan);
      res.status(200).json({ message: "Pertanyaan updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating data", error });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await PertanyaanModel.delete((id));
      res.status(200).json({ message: "Pertanyaan deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting data", error });
    }
  }
}

export default PertanyaanController;
