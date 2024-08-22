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
class MapelModel {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query(`SELECT * FROM mapel`);
            return rows;
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query(`SELECT * FROM mapel WHERE id = ?`, [id]);
            return rows[0] || null;
        });
    }
    static add(mapel) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`INSERT INTO mapel (id, mapel, dibuat_pada) VALUES (?, ?, ?)`, [mapel.id, mapel.nama_mapel, mapel.dibuat_pada]);
        });
    }
    static update(id, mapel) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`UPDATE mapel SET mapel = ?, dibuat_pada = ? WHERE id = ?`, [mapel.nama_mapel, mapel.dibuat_pada, id]);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`DELETE FROM mapel WHERE id = ?`, [id]);
        });
    }
}
export default MapelModel;
