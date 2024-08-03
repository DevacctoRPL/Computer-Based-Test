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
class RelGuruMapelModel {
    static getAllRelGuruMapel() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query(`SELECT * FROM rel_guru_mapel`);
            return rows;
        });
    }
    static getRelGuruMapelById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query(`SELECT * FROM rel_guru_mapel WHERE id = ?`, [id]);
            return rows[0] || null;
        });
    }
    static addRelGuruMapel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nig, id_mapel } = data;
            const [nigRows] = yield pool.query(`SELECT COUNT(*) AS count FROM guru WHERE nig = ?`, [nig]);
            const [mapelRows] = yield pool.query(`SELECT COUNT(*) AS count FROM mapel WHERE id = ?`, [id_mapel]);
            const nigCount = nigRows[0].count;
            const mapelCount = mapelRows[0].count;
            if (nigCount === 0) {
                throw new Error(`ID Kelas ${nig} tidak ditemukan.`);
            }
            if (mapelCount === 0) {
                throw new Error(`ID Mapel ${id_mapel} tidak ditemukan.`);
            }
            // Menghasilkan ID untuk rel_mapel_kelas
            const id_rel_guru_mapel = `${nig}-${id_mapel}`;
            // Menyimpan data rel_mapel_kelas ke dalam database
            yield pool.query(`INSERT INTO rel_guru_mapel (id, nig, id_mapel) VALUES (?, ?, ?)`, [id_rel_guru_mapel, nig, id_mapel]);
        });
    }
    static updateRelGuruMapel(id, relGuruMapel) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`UPDATE rel_guru_mapel SET nig = ?, id_mapel = ? WHERE id = ?`, [relGuruMapel.nig, relGuruMapel.id_mapel, id]);
        });
    }
    static deleteRelGuruMapel(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`DELETE FROM rel_guru_mapel WHERE id = ?`, [id]);
        });
    }
}
export default RelGuruMapelModel;
