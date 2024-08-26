import { Request, Response } from 'express';
import DetailUjianModel from '../models/detail_ujianModel.js';

class UjianController {
  // Get all ujian
  static async getAllDetailUjian(req: Request, res: Response): Promise<void> {
    try {
      const detailUjian = await DetailUjianModel.getAllDetailUjian();
      res.json(detailUjian);
    } catch (error) {
      res.status(500).json({ message: 'Error when retrieving detail ujian', error });
      console.log(error);
    }
  }

  // Get ujian by ID
  static async getDetailUjianById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const detailUjian = await DetailUjianModel.getDetailUjianById(id);
      if (detailUjian) {
        res.json(detailUjian);
      } else {
        res.status(404).json({ message: 'Detail ujian not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error when retrieving detail ujian', error });
      console.log(error);
    }
  }

  // Add new ujian
  static async addDetailUjian(req: Request, res: Response): Promise<void> {
    try {
      const { judul_soal, jumlah_soal, durasi, dibuat_pada, id_mapel, nig_guru, id_ujian, id_kelas } = req.body;
      const newDetailUjian = { judul_soal, jumlah_soal, durasi, dibuat_pada, id_mapel, id_ujian, nig_guru, id_kelas };
      await DetailUjianModel.addDetailUjian(newDetailUjian);
      res.status(201).json({ message: 'Detail ujian added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error when adding detail ujian', error });
      console.log(error);
    }
  }

  // Update existing ujian
  static async updateDetailUjian(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { judul_soal, jumlah_soal, durasi, dibuat_pada, id_mapel, nig_guru, id_kelas } = req.body;
      const updatedDetailUjian = { judul_soal, jumlah_soal, durasi, dibuat_pada, id_mapel, nig_guru, id_kelas };
      await DetailUjianModel.updateDetailUjian(id, updatedDetailUjian);
      res.json({ message: 'Detail ujian updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error when updating detail ujian', error });
      console.log(error);
    }
  }

  // Delete ujian
  static async deleteDetailUjian(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await DetailUjianModel.deleteDetailUjian(id);
      res.json({ message: 'Detail ujian deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error when deleting detail ujian', error });
      console.log(error);
    }
  }
}

export default UjianController;
