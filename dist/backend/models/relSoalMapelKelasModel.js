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
class RelSoalMapelKelasModel {
    static getAllRelSoalMapelKelas() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query(`SELECT * FROM rel_soal_mapel_kelas`);
            return rows;
        });
    }
    static getRelSoalMapelKelasById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query(`SELECT * FROM rel_soal_mapel_kelas WHERE id = ?`, [id]);
            return rows[0] || null;
        });
    }
    static addRelSoalMapelKelas(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_soal, id_mapel_kelas } = data;
            // Jalankan kedua query secara paralel
            const [idSoalRows, idMapelKelasRows] = yield Promise.all([
                pool.query(`SELECT COUNT(*) AS count FROM soal WHERE id = ?`, [id_soal]),
                pool.query(`SELECT COUNT(*) AS count FROM rel_mapel_kelas WHERE id = ?`, [id_mapel_kelas])
            ]);
            const idSoalCount = idSoalRows[0][0].count;
            const idMapelKelasCount = idMapelKelasRows[0][0].count;
            if (idSoalCount === 0) {
                throw new Error(`ID Soal ${id_soal} tidak ditemukan.`);
            }
            if (idMapelKelasCount === 0) {
                throw new Error(`ID Mapel-Kelas ${id_mapel_kelas} tidak ditemukan.`);
            }
            // Menghasilkan ID untuk rel_soal_mapel_kelas
            const id_rel_soal_mapel_kelas = `${id_soal}-${id_mapel_kelas}`;
            // Menyimpan data rel_mapel_kelas ke dalam database
            yield pool.query(`INSERT INTO rel_soal_mapel_kelas (id, id_soal, id_mapel_kelas) VALUES (?, ?, ?)`, [id_rel_soal_mapel_kelas, id_soal, id_mapel_kelas]);
        });
    }
    static updateRelSoalMapelKelas(id, RelSoalMapelKelas) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`UPDATE rel_soal_mapel_kelas SET id_soal = ?, id_mapel_kelas = ? WHERE id = ?`, [RelSoalMapelKelas.id_soal, RelSoalMapelKelas.id_mapel_kelas, id]);
        });
    }
    static deleteRelSoalMapelKelas(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`DELETE FROM rel_soal_mapel_kelas WHERE id = ?`, [id]);
        });
    }
}
export default RelSoalMapelKelasModel;
