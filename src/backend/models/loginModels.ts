import { RowDataPacket } from "mysql2/promise"; // Pastikan ini sudah diimport
import pool from "../database/connection.js";

interface Login {
  nig: number | undefined;
  nis: number | undefined;
  id: number;
  niu: number;  // Gunakan niu sesuai dengan struktur tabel Anda
  sandi: string;
}

class LoginModel {
  // Fungsi untuk mendapatkan data siswa dan guru berdasarkan niu dan sandi
  static async getCredentialByNiuAndPassword(niu: number, sandi: string): Promise<{ siswa: Login | null; guru: Login | null }> {
    try {
      // Jalankan kedua query secara paralel
      const [siswaRows, guruRows] = await Promise.all([
        pool.query<RowDataPacket[]>(
          "SELECT * FROM siswa WHERE nis = ? AND sandi = ?",
          [niu, sandi]
        ),
        pool.query<RowDataPacket[]>(
          "SELECT * FROM guru WHERE nig = ? AND sandi = ?",
          [niu, sandi]
        )
      ]);

      // Ekstraksi hasil query dari array [rows, fields]
      const siswaData = siswaRows[0] as RowDataPacket[];
      const guruData = guruRows[0] as RowDataPacket[];

      // Menyaring hasil query
      const siswa = siswaData.length > 0 ? (siswaData[0] as Login) : null;
      const guru = guruData.length > 0 ? (guruData[0] as Login) : null;

      console.log(siswa,guru)
      return { siswa, guru };
    } catch (error) {
      console.error('Error fetching data', error);
      return { siswa: null, guru: null };
    }
  }
}

export default LoginModel;
