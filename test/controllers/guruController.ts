import { Request, Response } from "express";
import GuruModel from "../models/guruModel.js";

export async function getAllGuru(req: Request, res: Response): Promise<void> {
    try {
        const guru = await GuruModel.getAllGuru();
        res.json(guru)
    } catch (error) {
        res.status(500).json({message: "error retrieving guru"});
        console.error(error);
    }
}

export async function getGuruByNig(req: Request, res: Response): Promise<void> {
    const guruId = parseInt(req.params.id, 10);
    try {
        const guru = await GuruModel.getGuruByNig(guruId );
        if (guru) { 
          res.json(guru);
        } else {
          res.status(404).json({ message: 'Guru not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving Guru', error });
      }
}

export async function addGuru(req: Request, res: Response): Promise<void> {
    const { nig, nama, kode_guru, id_kelas, sandi } = req.body;
    try {
      await GuruModel.addGuru({ nig, nama, kode_guru, id_kelas, sandi });
      res.status(201).json({ message: "Guru added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error adding Guru", error });
    }
  }
  
  export async function updateGuru(req: Request, res: Response): Promise<void> {
    const guruId = parseInt(req.params.id, 10);
    const { nig, nama, kode_guru, sandi, id_kelas } = req.body;
    try {
      await GuruModel.updateGuru(guruId, {
        nig, nama, kode_guru, sandi, id_kelas
      });
      res.json({ message: "Guru updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating Guru", error });
    }
  }
  
  export async function deleteGuru(req: Request, res: Response): Promise<void> {
    const guruId = parseInt(req.params.id, 10)
    try {
      await GuruModel.deleteGuru(guruId);
      res.json({ message: "Guru deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting Guru", error });
    }
}

//========================================================================================
