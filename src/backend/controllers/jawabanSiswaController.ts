import { Request, Response } from "express";
import JawabanSiswaModel from "../models/jawabanSiswaModel.js";

export async function getAllJawaban(req: Request, res: Response) {
    try {
        const jawaban = await JawabanSiswaModel.getAllJawaban();
        res.status(200).json(jawaban);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Jawaban", error });
    }
}

export async function getJawabanById(req: Request, res: Response) {
    const id = req.params.id;
    try {
        const jawaban = await JawabanSiswaModel.getJawabanById(id);
        if (jawaban) {
            res.status(200).json(jawaban);
        } else {
            res.status(404).json({ message: "Jawaban not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Jawaban by ID", error });
    }
}

export async function addJawaban(req: Request, res: Response) {
    const { id_nilai, id_jawaban, nilai_per_jawaban } = req.body;
    try {
        await JawabanSiswaModel.addJawaban({ id_nilai, id_jawaban, nilai_per_jawaban });
        res.status(201).json({ message: "Jawaban added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding new Jawaban", error });
    }
}

export async function updateJawaban(req: Request, res: Response) {
    const id = req.params.id;
    const { id_nilai, id_jawaban, nilai_per_jawaban } = req.body;
    try {
        await JawabanSiswaModel.updateJawaban(id, { id_nilai, id_jawaban, nilai_per_jawaban });
        res.status(200).json({ message: "Jawaban updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating Jawaban", error });
    }
}

export async function deleteJawaban(req: Request, res: Response) {
    const id = req.params.id;
    try {
        await JawabanSiswaModel.deleteJawaban(id);
        res.status(200).json({ message: "Jawaban deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Jawaban", error });
    }
}
