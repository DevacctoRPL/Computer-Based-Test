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
class RelSiswaSoalModel {
    static getAllRelSiswaSoal() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query(`SELECT * FROM rel_siswa_soal`);
            return rows;
        });
    }
    static getRelSiswaSoalById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query(`SELECT * FROM rel_siswa_soal WHERE id = ?`, [id]);
            return rows[0] || null;
        });
    }
    static addRelSiswaSoal(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nis, id_soal } = data;
            const [nisRows] = yield pool.query(`SELECT COUNT(*) AS count FROM siswa WHERE nis = ?`, [nis]);
            const [soalRows] = yield pool.query(`SELECT COUNT(*) AS count FROM soal WHERE id = ?`, [id_soal]);
            const nisCount = nisRows[0].count;
            const soalCount = soalRows[0].count;
            if (nisCount === 0) {
                throw new Error(`ID Kelas ${nis} tidak ditemukan.`);
            }
            if (soalCount === 0) {
                throw new Error(`ID Mapel ${id_soal} tidak ditemukan.`);
            }
            // Menghasilkan ID untuk rel_mapel_kelas
            const id_rel_siswa_soal = `${nis}-${id_soal}`;
            // Menyimpan data rel_mapel_kelas ke dalam database
            yield pool.query(`INSERT INTO rel_siswa_soal (id, nis, id_soal) VALUES (?, ?, ?)`, [id_rel_siswa_soal, nis, id_soal]);
        });
    }
    static updateRelSiswaSoal(id, RelSiswaSoal) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`UPDATE rel_siswa_soal SET nis = ?, id_soal = ? WHERE id = ?`, [RelSiswaSoal.nis, RelSiswaSoal.id_soal, id]);
        });
    }
    static deleteRelSiswaSoal(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`DELETE FROM rel_siswa_soal WHERE id = ?`, [id]);
        });
    }
}
export default RelSiswaSoalModel;
