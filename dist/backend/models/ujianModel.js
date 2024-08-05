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
class ujianModel {
    static getAllUjian() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query(`SELECT * FROM ujian`);
            return rows;
        });
    }
    static getUjianById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query(`SELECT * FROM ujian WHERE id = ?`, [id]);
            return rows[0] || null;
        });
    }
    static addUjian(ujian) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`INSERT INTO ujian (id, nama_ujian, dimulai_pada, berakhir_pada, dibuat_pada) VALUES (?, ?, ?, ?, ?)`, [
                ujian.id,
                ujian.nama_ujian,
                ujian.dimulai_pada,
                ujian.berakhir_pada,
                ujian.dibuat_pada,
            ]);
        });
    }
    static updateUjian(id, ujian) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`UPDATE ujian SET nama_ujian = ?, dimulai_pada = ?, berakhir_pada = ?, dibuat_pada WHERE id = ?`, [ujian.nama_ujian, ujian.dimulai_pada, ujian.berakhir_pada, ujian.dibuat_pada, id]);
        });
    }
    static deleteUjian(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`DELETE FROM ujian WHERE id = ?`, [id]);
        });
    }
}
export default ujianModel;
