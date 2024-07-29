import { Request, Response } from 'express';
import UserModel from '../models/userModel.ts';

// Mendapatkan semua pengguna
export async function getAllUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
}

// Mendapatkan pengguna berdasarkan ID
export async function getUserById(req: Request, res: Response): Promise<void> {
  const userId = parseInt(req.params.id, 10);
  try {
    const user = await UserModel.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
}

// Menambahkan pengguna baru
export async function addUser(req: Request, res: Response): Promise<void> {
  const { name, email } = req.body;
  try {
    await UserModel.addUser({ name, email });
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding user', error });
  }
}

// Memperbarui pengguna
export async function updateUser(req: Request, res: Response): Promise<void> {
  const userId = parseInt(req.params.id, 10);
  const { name, email } = req.body;
  try {
    await UserModel.updateUser(userId, { name, email });
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
}

// Menghapus pengguna
export async function deleteUser(req: Request, res: Response): Promise<void> {
  const userId = parseInt(req.params.id, 10);
  try {
    await UserModel.deleteUser(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
}
