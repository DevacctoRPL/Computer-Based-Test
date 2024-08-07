var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import GuruModel from "../models/guruModel.js";
export function getAllGuru(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const guru = yield GuruModel.getAllGuru();
            res.json(guru);
        }
        catch (error) {
            res.status(500).json({ message: "error retrieving guru" });
            console.error(error);
        }
    });
}
export function getGuruByNig(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const guruId = parseInt(req.params.id, 10);
        try {
            const guru = yield GuruModel.getGuruByNig(guruId);
            if (guru) {
                res.json(guru);
            }
            else {
                res.status(404).json({ message: 'Guru not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving Guru', error });
        }
    });
}
export function addGuru(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nig, nama, kode_guru, id_mapel_kelas, sandi } = req.body;
        try {
            yield GuruModel.addGuru({ nig, nama, kode_guru, id_mapel_kelas, sandi });
            res.status(201).json({ message: "Guru added successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error adding Guru", error });
        }
    });
}
export function updateGuru(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const guruId = parseInt(req.params.id, 10);
        const { nig, nama, kode_guru, id_mapel_kelas, sandi } = req.body;
        try {
            yield GuruModel.updateGuru(guruId, {
                nig, nama, kode_guru, id_mapel_kelas, sandi
            });
            res.json({ message: "Guru updated successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error updating Guru", error });
        }
    });
}
export function deleteGuru(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const guruId = parseInt(req.params.id, 10);
        try {
            yield GuruModel.deleteGuru(guruId);
            res.json({ message: "Guru deleted successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error deleting Guru", error });
        }
    });
}
//========================================================================================
