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
class KelasModel {
    static getAllKelas() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query(`SELECT * FROM kelas`);
            return rows;
        });
    }
    static getKelasById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query(`SELECT * FROM kelas WHERE id = ?`, [id]);
            return rows[0] || null;
        });
    }
    static addKelas(kelas) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`INSERT INTO kelas (id, nama_kelas, jurusan, angkatan) VALUES (?, ?, ?, ?)`, [kelas.id, kelas.nama_kelas, kelas.jurusan, kelas.angkatan]);
        });
    }
    static updateKelas(oldId, kelas) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`UPDATE kelas SET id = ?, nama_kelas = ?, jurusan = ?, angkatan = ? WHERE id = ?`, [
                kelas.id,
                kelas.nama_kelas,
                kelas.jurusan,
                kelas.angkatan,
                oldId
            ]);
        });
    }
    static deleteKelas(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`DELETE FROM kelas WHERE id = ?`, [id]);
        });
    }
}
export default KelasModel;
//ini komen
