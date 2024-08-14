var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import NilaiModel from '../models/nilaiModel.js';
class NilaiController {
    // Get all nilai
    static getAllNilai(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nilai = yield NilaiModel.getAllNilai();
                res.status(200).json(nilai);
            }
            catch (error) {
                console.error('Error fetching all nilai:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    // Get nilai by ID
    static getNilaiById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const nilai = yield NilaiModel.getNilaiById(id);
                if (nilai) {
                    res.status(200).json(nilai);
                }
                else {
                    res.status(404).json({ message: 'Nilai not found' });
                }
            }
            catch (error) {
                console.error(`Error fetching nilai with id ${req.params.id}:`, error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    // Add new nilai
    static addNilai(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nilaiData = req.body;
                yield NilaiModel.addNilai(nilaiData);
                res.status(201).json({ message: 'Nilai added successfully' });
            }
            catch (error) {
                console.error('Error adding new nilai:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    // Update nilai by ID
    static updateNilai(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const nilaiData = req.body;
                yield NilaiModel.updateNilai(id, nilaiData);
                res.status(200).json({ message: 'Nilai updated successfully' });
            }
            catch (error) {
                console.error(`Error updating nilai with id ${req.params.id}:`, error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    // Delete nilai by ID
    static deleteNilai(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield NilaiModel.deleteNilai(id);
                res.status(200).json({ message: 'Nilai deleted successfully' });
            }
            catch (error) {
                console.error(`Error deleting nilai with id ${req.params.id}:`, error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
}
export default NilaiController;
