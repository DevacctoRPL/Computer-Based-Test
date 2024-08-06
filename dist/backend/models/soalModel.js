var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pool from "../database/connection.js";
class SoalModel {
    static getAllSoal() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query(`SELECT * FROM soal`);
            return rows;
        });
    }
    static getSoalById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query(`SELECT * FROM soal WHERE id = ?`, [id]);
            return rows[0] || null;
        });
    }
    static addSoal(soal) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`INSERT INTO soal (id, id_ujian, id_mapel, nig, nama_soal, pertanyaan, dibuat_pada) VALUES (?, ?, ?, ?, ?, ?, ?)`, [
                soal.id,
                soal.id_ujian,
                soal.id_mapel,
                soal.nig,
                soal.nama_soal,
                soal.pertanyaan,
                soal.dibuat_pada,
            ]);
        });
    }
    static updateSoal(OldId, updateSoal) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`UPDATE soal SET nig = ?, nama_soal = ?, pertanyaan = ? WHERE id = ?`, [updateSoal, OldId]);
        });
    }
    static deleteSoal(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`DELETE FROM soal WHERE id = ?`, [id]);
        });
    }
}
export default SoalModel;
