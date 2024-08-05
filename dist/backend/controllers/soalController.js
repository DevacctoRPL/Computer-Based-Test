var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import SoalModel from "../models/soalModel.js";
export function getAllSoal(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const soal = yield SoalModel.getAllSoal();
            res.json(soal);
        }
        catch (error) {
            res.status(500).json({ message: "Error retrieving Soal", error });
            console.error(error);
        }
    });
}
export function getSoalById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const soalId = req.params.id;
        try {
            const soal = yield SoalModel.getSoalById(soalId);
            if (soal) {
                res.json(soal);
            }
            else {
                res.status(404).json({ message: "Soal not Found" });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error retrieving Soal", error });
            console.error(error);
        }
    });
}
export function addSoal(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, id_ujian, id_mapel, nig, nama_soal, pertanyaan, dibuat_pada } = req.body;
        try {
            yield SoalModel.addSoal({
                id,
                id_ujian,
                id_mapel,
                nig,
                nama_soal,
                pertanyaan,
                dibuat_pada,
            });
            res.status(201).json({ message: "Soal added successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error adding Soal", error });
        }
    });
}
// Memperbarui pengguna
export function updateSoal(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const soalId = req.body;
        const { nig, nama_soal, pertanyaan } = req.body;
        try {
            yield SoalModel.updateSoal(soalId, { nig, nama_soal, pertanyaan });
            res.json({ message: "Mapel updated successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error updating Mapel", error });
        }
    });
}
// Menghapus pengguna
export function deleteSoal(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const soalId = req.params.id;
        try {
            yield SoalModel.deleteSoal(soalId);
            res.json({ message: "User deleted successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error deleting user", error });
        }
    });
}
//ini komen
