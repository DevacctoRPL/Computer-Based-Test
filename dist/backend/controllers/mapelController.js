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
class MapelController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mapel = yield MapelModel.getAll();
                res.status(200).json(mapel);
            }
            catch (error) {
                res.status(500).json({ message: "Error retrieving data", error });
            }
        });
    }
    static getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const mapel = yield MapelModel.getById(id);
                if (mapel) {
                    res.status(200).json(mapel);
                }
                else {
                    res.status(404).json({ message: "Mapel not found" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Error retrieving data", error });
            }
        });
    }
    static add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, nama_mapel, dibuat_pada } = req.body;
                yield MapelModel.add({ id, nama_mapel, dibuat_pada });
                res.status(201).json({ message: "Mapel added successfully" });
            }
            catch (error) {
                res.status(500).json({ message: "Error adding data", error });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { nama_mapel, dibuat_pada } = req.body;
                yield MapelModel.update(id, { nama_mapel, dibuat_pada });
                res.status(200).json({ message: "Mapel updated successfully" });
            }
            catch (error) {
                res.status(500).json({ message: "Error updating data", error });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield MapelModel.delete(id);
                res.status(200).json({ message: "Mapel deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ message: "Error deleting data", error });
            }
        });
    }
}
export default MapelController;
