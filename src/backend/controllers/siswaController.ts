import {Request, Response} from "express";
import {generateAccessToken} from "../utils/jwtConfig.js";
import {getLoginAttempt, updateLoginAttempt} from "../utils/loginAttempts.js";
import SiswaModel from "../models/siswaModel.js"; // Sesuaikan dengan jalur impor

const MAX_ATTEMPTS = 3; // Maksimal percobaan login
const BLOCK_DURATION = 5 * 60 * 1000; // 5 menit dalam milidetik

export async function login(req: Request, res: Response): Promise<void> {
  const {nis, sandi} = req.body;

  const loginAttempt = getLoginAttempt(nis);
  const now = new Date();

  // Jika akun sedang diblokir, kirimkan respons 403
  if (loginAttempt) {
    const blockUntil = new Date(loginAttempt.blockUntil || 0);

    if (loginAttempt.attemptCount >= MAX_ATTEMPTS && now < blockUntil) {
      res.status(403).json({message: `Account suspended. Try again after ${blockUntil.toISOString()}`});
      return; // Pastikan untuk return di sini agar fungsi tidak melanjutkan
    }

    if (now >= blockUntil) {
      // Reset attempt count jika periode pemblokiran telah berakhir
      updateLoginAttempt(nis, 0, null);
    }
  }

  try {
    const user = await SiswaModel.getCredentialSiswaByNisPassword(nis, sandi);

    if (user) {
      const token = generateAccessToken({
        nis: user.nis,
        sandi: user.sandi,
      });

      // Atur header respons jika diperlukan
      res.setHeader("Authorization", `Bearer ${token}`);
      res.status(200).json({token});

      // Reset attempts on successful login
      updateLoginAttempt(nis, 0, null);
    } else {
      // Jika login gagal
      const newAttemptCount = (loginAttempt?.attemptCount || 0) + 1;
      const newBlockUntil = (newAttemptCount >= MAX_ATTEMPTS) ?
        new Date(Date.now() + BLOCK_DURATION) :
        null;

      updateLoginAttempt(nis, newAttemptCount, newBlockUntil);
      res.status(401).json({message: "Invalid credentials"});
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({message: "Internal server error"});
  }
}

// DANGER EXPERIMET

// Mendapatkan semua pengguna
export async function getAllSiswa(req: Request, res: Response): Promise<void> {
  try {
    const users = await SiswaModel.getAllSiswa();
    res.json(users);
  } catch (error) {
    res.status(500).json({message: "Error retrieving users", error});
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
      res.status(404).json({message: "User not found"});
    }
  } catch (error) {
    res.status(500).json({message: "Error retrieving user", error});
  }
}

// Menambahkan pengguna baru
export async function addSiswa(req: Request, res: Response): Promise<void> {
  const {nis, id_kelas, nama, panggilan, sandi, lulus} = req.body;
  try {
    await SiswaModel.addSiswa({nis, id_kelas, nama, panggilan, sandi, lulus});
    res.status(201).json({message: "User added successfully"});
  } catch (error) {
    res.status(500).json({message: "Error adding user", error});
  }
}

// Memperbarui pengguna
export async function updateSiswa(req: Request, res: Response): Promise<void> {
  const siswaId = parseInt(req.params.id, 10);
  const {nis, id_kelas, nama, panggilan, sandi, lulus} = req.body;
  try {
    await SiswaModel.updateSiswa(siswaId, {nis, id_kelas, nama, panggilan, sandi, lulus});
    res.json({message: "User updated successfully"});
  } catch (error) {
    res.status(500).json({message: "Error updating user", error});
  }
}

// Menghapus pengguna
export async function deleteSiswa(req: Request, res: Response): Promise<void> {
  const siswaId = parseInt(req.params.id, 10);
  try {
    await SiswaModel.deleteSiswa(siswaId);
    res.json({message: "User deleted successfully"});
  } catch (error) {
    res.status(500).json({message: "Error deleting user", error});
  }
}

// ini komen
