var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import JawabanModel from "../models/jawabanModel.js";
export function getAllJawaban(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jawaban = yield JawabanModel.getAllJawaban();
            res.status(201).json(jawaban);
        }
        catch (error) {
            res.status(500).json({ message: "error retrieving Jawaban", error });
        }
    });
}
export function getJawabanById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const jawaban = yield JawabanModel.getJawabanById(id);
            res.status(201).json(jawaban);
        }
        catch (error) {
            res.status(500).json({ message: "error retrieving Jawaban by Id", error });
        }
    });
}
export function addJawaban(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, id_soal, pilihan, isi_jawaban } = req.body;
        try {
            const jawaban = yield JawabanModel.addJawaban({ id, id_soal, pilihan, isi_jawaban });
            res.status(201).json(jawaban);
        }
        catch (error) {
            res.status(500).json({ message: "error adding new jawaban", error });
        }
    });
}
export function updateJawaban(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const jawabanId = req.params.id;
        const { id_soal, pilihan, isi_jawaban } = req.body;
        try {
            const jawaban = yield JawabanModel.updateJawaban(jawabanId, { id_soal, pilihan, isi_jawaban });
            res.status(201).json(jawaban);
        }
        catch (error) {
            res.status(500).json({ message: "error updating jawaban", error });
        }
    });
}
export function deleteJawaban(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const jawaban = yield JawabanModel.deleteJawaban(id);
            res.status(201).json(jawaban);
        }
        catch (error) {
            res.status(500).json({ message: "error deleting new jawaban", error });
        }
    });
}
