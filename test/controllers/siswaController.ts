import { Request, Response } from 'express';
import SiswaModel from '../models/siswaModel.js'; // Sesuaikan dengan jalur impor

// Mendapatkan semua pengguna
export async function getAllSiswa(req: Request, res: Response): Promise<void> {
  
  try {
    const users = await SiswaModel.getAllSiswa();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
}

// Mendapatkan pengguna berdasarkan ID
export async function getSiswaByNis(req: Request, res: Response): Promise<void> {
  const siswaId = parseInt(req.params.id, 10);
  try {
    const user = await SiswaModel.getSiswaByNis(siswaId);
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
export async function addSiswa(req: Request, res: Response): Promise<void> {
  const { nis, id_kelas, nama, panggilan, sandi, lulus } = req.body;
  try {
    await SiswaModel.addSiswa({nis, id_kelas, nama, panggilan, sandi, lulus });
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding user', error });
  }
}

// Memperbarui pengguna
export async function updateSiswa(req: Request, res: Response): Promise<void> {
  const siswaId = parseInt(req.params.id, 10);
  const { nis, id_kelas, nama, panggilan, sandi, lulus } = req.body;
  try {
    await SiswaModel.updateSiswa(siswaId, { nis, id_kelas, nama, panggilan, sandi, lulus });
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
}

// Menghapus pengguna
export async function deleteSiswa(req: Request, res: Response): Promise<void> {
  const siswaId = parseInt(req.params.id, 10);
  try {
    await SiswaModel.deleteSiswa(siswaId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
}

//ini komen