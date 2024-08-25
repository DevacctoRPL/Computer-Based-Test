import { Request, Response } from 'express';
import { generateAccessTokenTest } from '../utils/jwtConfigTest.js';
import { getLoginAttempt, updateLoginAttempt } from '../../src/backend/utils/loginAttempts.js';
import LoginModel from '../models/loginModels.js';
import jwt from 'jsonwebtoken'; 

const MAX_ATTEMPTS = 3; // Maksimal percobaan login
const BLOCK_DURATION = 5 * 60 * 1000; // 5 menit dalam milidetik

export async function login(req: Request, res: Response): Promise<void> {
  const { niu, sandi } = req.body;

  // Ambil data percobaan login dari penyimpanan
  const loginAttempt = getLoginAttempt(niu);
  const now = new Date();

  // Jika akun sedang diblokir, kirimkan respons 403
  if (loginAttempt) {
    const blockUntil = new Date(loginAttempt.blockUntil || 0);

    if (loginAttempt.attemptCount >= MAX_ATTEMPTS && now < blockUntil) {
      res.status(403).json({ 
        message: `Account suspended. Try again after ${blockUntil.toISOString()}` 
      });
      return; // Pastikan untuk return di sini agar fungsi tidak melanjutkan
    }

    // Reset attempt count jika periode pemblokiran telah berakhir
    if (now >= blockUntil) {
      updateLoginAttempt(niu, 0, null);
    }
  }

  try {
    // Periksa kredensial pengguna
    const { siswa, guru } = await LoginModel.getCredentialByNiuAndPassword(niu, sandi);

    if (siswa) {
      console.log('siswa true!')
      // Jika data siswa ditemukan, buat token
      const token = generateAccessTokenTest({
        niu: siswa.nis,
        sandi: siswa.sandi
      });

      res.setHeader("Authorization", `Bearer ${token}`);
      res.status(200).json({ token });


      // Reset attempts on successful login
      updateLoginAttempt(niu, 0, null);
    } else if (guru) {
      console.log('guru true!')
      // Jika data guru ditemukan, buat token
      const token = generateAccessTokenTest({
        niu: guru.nig,
        sandi: guru.sandi
      })
      console.log(`ini token: ${token}`)

      res.setHeader("Authorization", `Bearer ${token}`);
      res.status(200).json({ token });

      // Reset attempts on successful login
      updateLoginAttempt(niu, 0, null);
    } else {
      // Jika login gagal
      const newAttemptCount = (loginAttempt?.attemptCount || 0) + 1;
      const newBlockUntil = newAttemptCount >= MAX_ATTEMPTS
        ? new Date(Date.now() + BLOCK_DURATION)
        : null;

      updateLoginAttempt(niu, newAttemptCount, newBlockUntil);
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: "Internal server error" });
  }
}
