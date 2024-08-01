var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import UserModel from '../models/siswaModel.js';
// Mendapatkan semua pengguna
export function getAllSiswa(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield UserModel.getAllSiswa();
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving users', error });
        }
    });
}
// Mendapatkan pengguna berdasarkan ID
export function getSiswaByNis(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const siswaId = parseInt(req.params.id, 10);
        try {
            const user = yield UserModel.getSiswaByNis(siswaId);
            if (user) {
                res.json(user);
            }
            else {
                res.status(404).json({ message: 'User not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error retrieving user', error });
        }
    });
}
// Menambahkan pengguna baru
export function addSiswa(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nis, id_kelas, nama, panggilan, sandi, lulus } = req.body;
        try {
            yield UserModel.addSiswa({ nis, id_kelas, nama, panggilan, sandi, lulus });
            res.status(201).json({ message: 'User added successfully' });
        }
        catch (error) {
            res.status(500).json({ message: 'Error adding user', error });
        }
    });
}
// Memperbarui pengguna
export function updateSiswa(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const siswaId = parseInt(req.params.id, 10);
        const { nis, id_kelas, nama, panggilan, sandi, lulus } = req.body;
        try {
            yield UserModel.updateSiswa(siswaId, { nis, id_kelas, nama, panggilan, sandi, lulus });
            res.json({ message: 'User updated successfully' });
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating user', error });
        }
    });
}
// Menghapus pengguna
export function deleteSiswa(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const siswaId = parseInt(req.params.id, 10);
        try {
            yield UserModel.deleteSiswa(siswaId);
            res.json({ message: 'User deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ message: 'Error deleting user', error });
        }
    });
}
//ini komen
