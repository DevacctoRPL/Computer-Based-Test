var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import RelGuruMapelModel from "../models/relGuruMapelModel.js";
function getAllRelGuruMapel(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const relGuruMapel = yield RelGuruMapelModel.getAllRelGuruMapel();
            res.json(relGuruMapel);
        }
        catch (error) {
            res.status(500).json({ message: "Error fetching data", error });
        }
    });
}
function getRelGuruMapelById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const relGuruMapel = yield RelGuruMapelModel.getRelGuruMapelById(id);
            if (relGuruMapel) {
                res.json(relGuruMapel);
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
function addRelGuruMapel(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nig, id_mapel } = req.body;
        try {
            yield RelGuruMapelModel.addRelGuruMapel({ nig, id_mapel });
            res.status(201).json({ message: "Relation added successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error adding relation", error });
        }
    });
}
function updateRelGuruMapel(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const { nig, id_mapel } = req.body;
        try {
            yield RelGuruMapelModel.updateRelGuruMapel(id, { id, nig, id_mapel });
            res.json({ message: "Relation updated successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error updating relation", error });
        }
    });
}
function deleteRelGuruMapel(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            yield RelGuruMapelModel.deleteRelGuruMapel(id);
            res.json({ message: "Relation deleted successfully" });
        }
        catch (error) {
            res.status(500).json({ message: "Error deleting relation", error });
        }
    });
}
export { getAllRelGuruMapel, getRelGuruMapelById, addRelGuruMapel, updateRelGuruMapel, deleteRelGuruMapel };
