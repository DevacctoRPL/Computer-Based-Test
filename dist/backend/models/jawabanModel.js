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
class JawabanModel {
    static getAllJawaban() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query(`SELECT * FROM jawaban`);
            return rows;
        });
    }
    static getJawabanById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query(`SELECT * FROM jawaban WHERE id = ?`, [id]);
            return rows[0] || null;
        });
    }
    static addJawaban(jawaban) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query("INSERT INTO jawaban (id, id_soal, pilihan, isi_jawaban) VALUES (?, ?, ?, ?)", [jawaban.id, jawaban.id_soal, jawaban.pilihan, jawaban.isi_jawaban]);
        });
    }
    static updateJawaban(id, jawaban) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`UPDATE jawaban SET pilihan = ?, isi_jawaban = ? WHERE id = ?`, [jawaban.pilihan, jawaban.isi_jawaban, id]);
        });
    }
    static deleteJawaban(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`DELETE FROM jawaban WHERE id = ?`, [id]);
        });
    }
}
export default JawabanModel;
