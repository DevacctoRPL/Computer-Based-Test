var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ujianModel from "../models/ujianModel.js";
export function getAllUjian(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ujian = yield ujianModel.getAllUjian();
            res.json(ujian);
        }
        catch (error) {
            res.status(500).json({ message: "Error retrieving ujian", error });
            console.error(error);
        }
    });
}
export function getUjianById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const ujianId = req.params.id;
        try {
            const ujian = yield ujianModel.getUjianById(ujianId);
            if (ujian) {
                res.json(ujian);
            }
            else {
                res.status(404).json({ message: "ujian not Found" });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error retrieving ujian", error });
            console.error(error);
        }
    });
}
export function addUjian(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, nama_ujian, dimulai_pada, berakhir_pada, dibuat_pada } = req.body;
        try {
            yield ujianModel.addUjian({
                id, nama_ujian, dimulai_pada, berakhir_pada, dibuat_pada
            });
            res.status(201).json({ message: "ujian added successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error adding ujian", error });
        }
    });
}
// Memperbarui pengguna
export function updateUjian(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const ujianId = req.body;
        const { id, nama_ujian, dimulai_pada, berakhir_pada, dibuat_pada } = req.body;
        try {
            yield ujianModel.updateUjian(ujianId, { id, nama_ujian, dimulai_pada, berakhir_pada, dibuat_pada });
            res.json({ message: "Mapel updated successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error updating Mapel", error });
        }
    });
}
// Menghapus pengguna
export function deleteUjian(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const ujianId = req.params.id;
        try {
            yield ujianModel.deleteUjian(ujianId);
            res.json({ message: "User deleted successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error deleting user", error });
        }
    });
}
//ini komen
