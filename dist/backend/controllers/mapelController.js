var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import MapelModel from "../models/mapelModel.js";
export function getAllMapel(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mapel = yield MapelModel.getAllMapel();
            res.json(mapel);
        }
        catch (error) {
            res.status(500).json({ message: "Error retrieving mapel", error });
            console.error(error);
        }
    });
}
export function getMapelById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const mapelId = req.params.id;
        try {
            const mapel = yield MapelModel.getMapelById(mapelId);
            if (mapel) {
                res.json(mapel);
            }
            else {
                res.status(404).json({ message: "Mapel not Found" });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error retrieving mapel", error });
            console.error(error);
        }
    });
}
export function addMapel(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, nama_mapel } = req.body;
        try {
            yield MapelModel.addMapel({ id, nama_mapel });
            res.status(201).json({ message: "Mapel added successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error adding Mapel", error });
        }
    });
}
// Memperbarui pengguna
export function updateMapel(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const mapelId = req.params.id;
        const { id, nama_mapel } = req.body;
        try {
            yield MapelModel.updateMapel(mapelId, {
                id,
                nama_mapel,
            });
            res.json({ message: "Mapel updated successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error updating Mapel", error });
        }
    });
}
// Menghapus pengguna
export function deleteMapel(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const mapelId = req.params.id;
        try {
            yield MapelModel.deleteMapel(mapelId);
            res.json({ message: "User deleted successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error deleting user", error });
        }
    });
}
// ini komen
