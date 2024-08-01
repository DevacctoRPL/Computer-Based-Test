var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import KelasModel from "../models/kelasModel.js";
export function getAllKelas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mapel = yield KelasModel.getAllKelas();
            res.json(mapel);
        }
        catch (error) {
            res.status(500).json({ message: 'Error when retrieving mapel', error });
            console.log(error);
        }
    });
}
export function getKelasById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const kelasId = req.params.id;
        try {
            const kelas = yield KelasModel.getKelasById(kelasId);
            if (kelas) {
                res.json(kelas);
            }
            else {
                res.status(404).json({ message: "kelas not Found" });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error retrieving kelas", error });
            console.error(error);
        }
    });
}
export function addKelas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, nama_kelas, jurusan, angkatan } = req.body;
        try {
            yield KelasModel.addKelas({ id, nama_kelas, jurusan, angkatan });
            res.status(201).json({ message: "kelas added successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error adding kelas", error });
        }
    });
}
export function updateKelas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const kelasId = req.params.id;
        const { id, nama_kelas, jurusan, angkatan } = req.body;
        try {
            yield KelasModel.updateKelas(kelasId, {
                id, nama_kelas, jurusan, angkatan
            });
            res.json({ message: "kelas updated successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error updating kelas", error });
        }
    });
}
export function deleteKelas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const kelasId = req.params.id;
        try {
            yield KelasModel.deleteKelas(kelasId);
            res.json({ message: "Kelas deleted successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error deleting Kelas", error });
        }
    });
}
//ini komen
