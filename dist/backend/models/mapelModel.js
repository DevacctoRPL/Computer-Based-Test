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
    static getAllMapel() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query("SELECT * FROM mapel");
            return rows;
        });
    }
    static getMapelById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query("SELECT * FROM mapel WHERE id = ?", [id]);
            return rows[0] || null;
        });
    }
    static addMapel(mapel) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query("INSERT INTO mapel (id, nama_mapel) VALUES (?, ?)", [mapel.id, mapel.nama_mapel]);
        });
    }
    static updateMapel(oldId, mapel) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query("UPDATE mapel SET id = ?, nama_mapel = ? WHERE id = ?", [mapel.id, mapel.nama_mapel, oldId]);
        });
    }
    static deleteMapel(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query("DELETE FROM mapel WHERE id = ?", [id]);
        });
    }
}
export default MapelModel;
// ini komen
