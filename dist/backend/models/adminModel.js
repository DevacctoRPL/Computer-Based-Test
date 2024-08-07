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
class AdminModel {
    static getAllAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query(`SELECT * FROM admin`);
            return rows;
        });
    }
    static getAdminById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query(`SELECT * FROM admin WHERE id = ?`, [id]);
            return rows[0] || null;
        });
    }
    static addAdmin(Admin) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`INSERT INTO admin (id, nama, sandi) VALUES (?, ?, ?)`, [Admin.id, Admin.nama, Admin.sandi]);
        });
    }
    static updateAdmin(id, Admin) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`UPDATE admin SET nama = ? , sandi = ? WHERE nig = ?`, [Admin.nama, Admin.sandi, id]);
        });
    }
    static deleteAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query(`DELETE FROM admin WHERE id = ?`, [id]);
        });
    }
}
export default AdminModel;
