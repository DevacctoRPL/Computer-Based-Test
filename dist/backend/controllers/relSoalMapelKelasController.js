var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import RelSoalMapelKelasModel from "../models/relSoalMapelKelasModel.js";
export function getAllRelSoalMapelKelas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const relSoalMapelKelas = yield RelSoalMapelKelasModel.getAllRelSoalMapelKelas();
            res.json(relSoalMapelKelas);
        }
        catch (error) {
            res.status(500).json({ message: "Error fetching data", error });
        }
    });
}
export function getRelSoalMapelKelasById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const relSoalMapelKelas = yield RelSoalMapelKelasModel.getRelSoalMapelKelasById(id);
            if (relSoalMapelKelas) {
                res.json(relSoalMapelKelas);
            }
            else {
                res.status(404).json({ message: "Relation not found" });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error fetching data", error });
        }
    });
}
export function addRelSoalMapelKelas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id_soal, id_mapel_kelas } = req.body;
        try {
            yield RelSoalMapelKelasModel.addRelSoalMapelKelas({ id_soal, id_mapel_kelas });
            res.status(201).json({ message: "Relation added successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error adding relation", error });
            console.error(error);
        }
    });
}
export function updateRelSoalMapelKelas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const { id_soal, id_mapel_kelas } = req.body;
        try {
            yield RelSoalMapelKelasModel.updateRelSoalMapelKelas(id, { id, id_soal, id_mapel_kelas });
            res.json({ message: "Relation updated successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error updating relation", error });
        }
    });
}
export function deleteRelSoalMapelKelas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            yield RelSoalMapelKelasModel.deleteRelSoalMapelKelas(id);
            res.json({ message: "Relation deleted successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error deleting relation", error });
        }
    });
}
