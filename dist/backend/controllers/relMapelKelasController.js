var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import RelMapelKelasModel from "../models/relMapelKelasModel.js";
function getAllRelMapelKelas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const relMapelKelas = yield RelMapelKelasModel.getAllRelMapelKelas();
            res.json(relMapelKelas);
        }
        catch (error) {
            res.status(500).json({ message: "Error fetching data", error });
        }
    });
}
function getRelMapelKelasById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const relMapelKelas = yield RelMapelKelasModel.getRelMapelKelasById(id);
            if (relMapelKelas) {
                res.json(relMapelKelas);
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
function addRelMapelKelas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id_kelas, id_mapel } = req.body;
        try {
            yield RelMapelKelasModel.addRelMapelKelas({ id_kelas, id_mapel });
            res.status(201).json({ message: "Relation added successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error adding relation", error });
            console.error(error);
        }
    });
}
function updateRelMapelKelas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const { id_kelas, id_mapel } = req.body;
        try {
            yield RelMapelKelasModel.updateRelMapelKelas(id, { id, id_kelas, id_mapel });
            res.json({ message: "Relation updated successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error updating relation", error });
        }
    });
}
function deleteRelMapelKelas(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            yield RelMapelKelasModel.deleteRelMapelKelas(id);
            res.json({ message: "Relation deleted successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error deleting relation", error });
        }
    });
}
export { getAllRelMapelKelas, getRelMapelKelasById, addRelMapelKelas, updateRelMapelKelas, deleteRelMapelKelas, };
