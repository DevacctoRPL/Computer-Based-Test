import pool from "../../src/backend/database/connection.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface Guru {
  nig?: number;
  nama: string;
  kode_guru: string;
  sandi: string;
  id_kelas: string;
}

class GuruModel {
  static async getAllGuru(): Promise<Guru[]> {
    const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM guru`);
    return rows as Guru[];
  }

  static async getGuruByNig(nig: number): Promise<Guru | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM guru WHERE nig = ?`,
      [nig]
    );
    return (rows[0] as Guru) || null;
  }

  static async addGuru(guru: Guru): Promise<void> {
    await pool.query<ResultSetHeader>(
      `INSERT INTO guru (nig, nama, kode_guru, sandi, id_kelas) VALUES (?, ?, ?, ?, ?)`,
      [guru.nig, guru.nama, guru.kode_guru, guru.sandi,  guru.id_kelas],
    );
  }
  static async updateGuru(nig: number, guru: Guru): Promise<void> {
    await pool.query<ResultSetHeader>(
      `UPDATE guru SET sandi = ? WHERE nig = ?`,
      [guru.sandi, nig]
    );
  }
  static async deleteGuru(nig: number): Promise<void> {
    await pool.query<ResultSetHeader>(
        `DELETE FROM guru WHERE nig = ?`, [nig]
    );
  }
}

export default GuruModel