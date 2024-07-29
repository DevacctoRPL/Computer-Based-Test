import { Router } from 'express';
import { getAllUsers, getUserById, addUser, updateUser, deleteUser } from '../controllers/userController';

const userRoutes = Router();

// Rute untuk mendapatkan semua pengguna
userRoutes.get('/users', getAllUsers);

// Rute untuk mendapatkan pengguna berdasarkan ID
userRoutes.get('/users/:id', getUserById);

// Rute untuk menambahkan pengguna baru
userRoutes.post('/users', addUser);

// Rute untuk memperbarui pengguna
userRoutes.put('/users/:id', updateUser);

// Rute untuk menghapus pengguna
userRoutes.delete('/users/:id', deleteUser);

export default userRoutes;
