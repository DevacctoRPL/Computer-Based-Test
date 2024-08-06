import pool from "../database/connection.js";
import {RowDataPacket, ResultSetHeader} from "mysql2";

interface Guru {
  nig?: number;
  nama: string;
  kode_guru: string;
  id_mapel_kelas: string;
  sandi: string;
}

class GuruModel {
  static async getAllGuru(): Promise<Guru[]> {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM guru");
    return rows as Guru[];
  }

  static async getGuruByNig(nig: number): Promise<Guru | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM guru WHERE nig = ?",
        [nig],
    );
    return (rows[0] as Guru) || null;
  }

  static async addGuru(guru: Guru): Promise<void> {
    await pool.query<ResultSetHeader>(
        "INSERT INTO guru (nig, nama, kode_guru, id_mapel_kelas, sandi) VALUES (?, ?, ?, ?, ?)",
        [guru.nig, guru.nama, guru.kode_guru, guru.id_mapel_kelas, guru.sandi],
    );
  }
  static async updateGuru(nig: number, guru: Guru): Promise<void> {
    await pool.query<ResultSetHeader>(
        "UPDATE guru SET sandi = ? WHERE nig = ?",
        [guru.sandi, nig],
    );
  }
  static async deleteGuru(nig: number): Promise<void> {
    await pool.query<ResultSetHeader>(
        "DELETE FROM guru WHERE nig = ?", [nig],
    );
  }
}

export default GuruModel;
