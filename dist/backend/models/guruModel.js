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
class GuruModel {
    static getAllGuru() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query("SELECT * FROM guru");
            return rows;
        });
    }
    static getGuruByNig(nig) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query("SELECT * FROM guru WHERE nig = ?", [nig]);
            return rows[0] || null;
        });
    }
    static addGuru(guru) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query("INSERT INTO guru (nig, nama, kode_guru, id_mapel_kelas, sandi) VALUES (?, ?, ?, ?, ?)", [guru.nig, guru.nama, guru.kode_guru, guru.id_mapel_kelas, guru.sandi]);
        });
    }
    static updateGuru(nig, guru) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query("UPDATE guru SET sandi = ? WHERE nig = ?", [guru.sandi, nig]);
        });
    }
    static deleteGuru(nig) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query("DELETE FROM guru WHERE nig = ?", [nig]);
        });
    }
}
export default GuruModel;
