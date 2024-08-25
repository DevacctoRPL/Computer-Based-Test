import { Request, Response } from "express";
import JawabanModel from "../models/jawabanModel.js";

export async function getAllJawaban(req: Request, res: Response) {
    try {
        const jawaban = await JawabanModel.getAllJawaban();
        res.status(201).json(jawaban);
    } catch (error) {
        res.status(500).json({message: "error retrieving Jawaban", error})
    }
}

export async function getJawabanById(req: Request, res: Response) {
    const id = req.params.id;
    try {
        const jawaban = await JawabanModel.getJawabanById(id)
        res.status(201).json(jawaban)
    } catch (error) {
        res.status(500).json({message: "error retrieving Jawaban by Id", error})
    }
}

export async function addJawaban(req: Request, res: Response) {
    const {id, id_soal, pilihan, isi_jawaban} = req.body;
    try {
        const jawaban = await JawabanModel.addJawaban({id, id_soal, pilihan, isi_jawaban})
        res.status(201).json(jawaban)
    } catch (error) {
        res.status(500).json({message: "error adding new jawaban", error})
    }
}

export async function updateJawaban(req: Request, res: Response) {
    const jawabanId = req.params.id;
    const {id_soal, pilihan, isi_jawaban} = req.body;
    try {
        const jawaban = await JawabanModel.updateJawaban(jawabanId, {id_soal, pilihan, isi_jawaban})
        res.status(201).json(jawaban)
    } catch (error) {
        res.status(500).json({message: "error updating jawaban", error})
    }
}

export async function deleteJawaban(req: Request, res: Response) {
    const id = req.params.id;
    try {
        const jawaban = await JawabanModel.deleteJawaban(id)
        res.status(201).json(jawaban)
    } catch (error) {
        res.status(500).json({message: "error deleting new jawaban", error})
    }
}