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
class NilaiModel {
    static getAllNilai() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query(`SELECT * FROM nilai`);
            return rows;
        });
    }
    static getNilaiById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query(`SELECT * FROM nilai WHERE id = ?`, [id]);
            return rows[0] || null;
        });
    }
    static addNilai(Nilai) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`INSERT INTO nilai (id, id_jawaban, nis, jumlah_benar, nilai) VALUES (?, ?, ?, ?, ?)`, [Nilai.id, Nilai.id_jawaban, Nilai.nis, Nilai.jumlah_benar, Nilai.nilai]);
        });
    }
    static updateNilai(oldId, Nilai) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`UPDATE nilai SET jumlah_benar = ?, nilai = ? WHERE id = ?`, [Nilai.jumlah_benar, Nilai.nilai, oldId]);
        });
    }
    static deleteNilai(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`DELETE FROM nilai WHERE id = ?`, [id]);
        });
    }
}
export default NilaiModel;
//ini komen
