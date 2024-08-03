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
// Class UserModel untuk operasi CRUD
class SiswaModel {
    //LOGIN HANDLER
    static getCredentialSiswaByNisPassword(nis, sandi) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows] = yield pool.query("SELECT * FROM siswa WHERE nis = ? AND sandi = ?", [nis, sandi]);
                return rows.length > 0 ? rows[0] : null;
            }
            catch (error) {
                console.error(error);
                return null;
            }
        });
    }
    // Method untuk mendapatkan semua pengguna
    static getAllSiswa() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query("SELECT * FROM siswa");
            return rows;
        });
    }
    // Method untuk mendapatkan pengguna berdasarkan nis
    static getSiswaByNis(nis) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield pool.query("SELECT * FROM siswa WHERE nis = ?", [nis]);
            return rows[0] || null;
        });
    }
    // Method untuk menambahkan pengguna baru
    static addSiswa(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query("INSERT INTO siswa (nis, id_kelas, nama, panggilan, sandi, lulus) VALUES (?, ?, ?, ?, ?, ?)", [
                user.nis,
                user.id_kelas,
                user.nama,
                user.panggilan,
                user.sandi,
                user.lulus,
            ]);
        });
    }
    // Method untuk memperbarui pengguna
    static updateSiswa(nis, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query("UPDATE siswa SET panggilan = ?, sandi = ? WHERE nis = ?", [user.panggilan, user.sandi, nis]);
        });
    }
    // Method untuk menghapus pengguna
    static deleteSiswa(nis) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pool.query("DELETE FROM siswa WHERE nis = ?", [nis]);
        });
    }
}
export default SiswaModel;
//ini komen
