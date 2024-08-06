var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import RelSiswaSoalModel from "../models/relSiswaSoalModel.js";
export function getAllRelSiswaSoal(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const relSiswaSoal = yield RelSiswaSoalModel.getAllRelSiswaSoal();
            res.json(relSiswaSoal);
        }
        catch (error) {
            res.status(500).json({ message: "Error fetching data", error });
        }
    });
}
export function getRelSiswaSoalById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const relSiswaSoal = yield RelSiswaSoalModel.getRelSiswaSoalById(id);
            if (relSiswaSoal) {
                res.json(relSiswaSoal);
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
export function addRelSiswaSoal(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nis, id_soal } = req.body;
        try {
            yield RelSiswaSoalModel.addRelSiswaSoal({ nis, id_soal });
            res.status(201).json({ message: "Relation added successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error adding relation", error });
            console.error(error);
        }
    });
}
export function updateRelSiswaSoal(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const { nis, id_soal } = req.body;
        try {
            yield RelSiswaSoalModel.updateRelSiswaSoal(id, { id, nis, id_soal });
            res.json({ message: "Relation updated successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error updating relation", error });
        }
    });
}
export function deleteRelSiswaSoal(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            yield RelSiswaSoalModel.deleteRelSiswaSoal(id);
            res.json({ message: "Relation deleted successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error deleting relation", error });
        }
    });
}
