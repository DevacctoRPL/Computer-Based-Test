import { Request, Response } from 'express';
import NilaiModel from '../models/nilaiModel.js';

class NilaiController {
  // Get all nilai
  static async getAllNilai(req: Request, res: Response): Promise<void> {
    try {
      const nilai = await NilaiModel.getAllNilai();
      res.status(200).json(nilai);
    } catch (error) {
      console.error('Error fetching all nilai:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Get nilai by ID
  static async getNilaiById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const nilai = await NilaiModel.getNilaiById(id);
      if (nilai) {
        res.status(200).json(nilai);
      } else {
        res.status(404).json({ message: 'Nilai not found' });
      }
    } catch (error) {
      console.error(`Error fetching nilai with id ${req.params.id}:`, error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Add new nilai
  static async addNilai(req: Request, res: Response): Promise<void> {
    try {
      const nilaiData = req.body;
      await NilaiModel.addNilai(nilaiData);
      res.status(201).json({ message: 'Nilai added successfully' });
    } catch (error) {
      console.error('Error adding new nilai:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Update nilai by ID
  static async updateNilai(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const nilaiData = req.body;
      await NilaiModel.updateNilai(id, nilaiData);
      res.status(200).json({ message: 'Nilai updated successfully' });
    } catch (error) {
      console.error(`Error updating nilai with id ${req.params.id}:`, error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Delete nilai by ID
  static async deleteNilai(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await NilaiModel.deleteNilai(id);
      res.status(200).json({ message: 'Nilai deleted successfully' });
    } catch (error) {
      console.error(`Error deleting nilai with id ${req.params.id}:`, error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default NilaiController;
