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
class RelMapelKelasModel {
    static getAllRelMapelKelas() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query("SELECT * FROM rel_mapel_kelas");
            return rows;
        });
    }
    static getRelMapelKelasById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query("SELECT * FROM rel_mapel_kelas WHERE id = ?", [id]);
            return rows[0] || null;
        });
    }
    static addRelMapelKelas(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_kelas, id_mapel } = data;
            // Mengecek apakah id_kelas ada di tabel kelas
            const [kelasRows] = yield pool.query("SELECT COUNT(*) AS count FROM kelas WHERE id = ?", [id_kelas]);
            // Mengecek apakah id_mapel ada di tabel mapel
            const [mapelRows] = yield pool.query("SELECT COUNT(*) AS count FROM mapel WHERE id = ?", [id_mapel]);
            const kelasCount = kelasRows[0].count;
            const mapelCount = mapelRows[0].count;
            if (kelasCount === 0) {
                throw new Error(`ID Kelas ${id_kelas} tidak ditemukan.`);
            }
            if (mapelCount === 0) {
                throw new Error(`ID Mapel ${id_mapel} tidak ditemukan.`);
            }
            // Menghasilkan ID untuk rel_mapel_kelas
            const id_rel_mapel_kelas = `${id_kelas}-${id_mapel}`;
            // Menyimpan data rel_mapel_kelas ke dalam database
            yield pool.query("INSERT INTO rel_mapel_kelas (id, id_kelas, id_mapel) VALUES (?, ?, ?)", [id_rel_mapel_kelas, id_kelas, id_mapel]);
        });
    }
    static updateRelMapelKelas(id, relMapelKelas) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query("UPDATE rel_mapel_kelas SET id_kelas = ?, id_mapel = ? WHERE id = ?", [relMapelKelas.id_kelas, relMapelKelas.id_mapel, id]);
        });
    }
    static deleteRelMapelKelas(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query("DELETE FROM rel_mapel_kelas WHERE id = ?", [id]);
        });
    }
}
export default RelMapelKelasModel;
