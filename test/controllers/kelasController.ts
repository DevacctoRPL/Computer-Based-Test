import { Request, Response } from "express";
import KelasModel from "../models/kelasModel.js";

export async function getAllKelas(req: Request, res: Response): Promise<void> {
    try {
        const kelas = await KelasModel.getAllKelas();
        res.json(kelas);
    } catch (error) {
        res.status(500).json({ message: 'Error when retrieving kelas', error });
        console.log(error);
    }
}

export async function getKelasById(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const kelas = await KelasModel.getKelasById(id);
        if (kelas) {
            res.json(kelas);
        } else {
            res.status(404).json({ message: 'Kelas not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error when retrieving kelas', error });
        console.log(error);
    }
}

export async function addKelas(req: Request, res: Response): Promise<void> {
    try {
        const { kelas, jurusan, nomor_kelas } = req.body;
        const newKelas = { kelas, jurusan, nomor_kelas };
        await KelasModel.addKelas(newKelas);
        res.status(201).json({ message: 'Kelas added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error when adding kelas', error });
        console.log(error);
    }
}

export async function updateKelas(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const { kelas, jurusan, nomor_kelas } = req.body;
        const updatedKelas = { kelas, jurusan, nomor_kelas };
        await KelasModel.updateKelas(id, updatedKelas);
        res.json({ message: 'Kelas updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error when updating kelas', error });
        console.log(error);
    }
}

export async function deleteKelas(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        await KelasModel.deleteKelas(id);
        res.json({ message: 'Kelas deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error when deleting kelas', error });
        console.log(error);
    }
}
