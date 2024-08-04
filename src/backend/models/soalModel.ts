import pool from "../database/connection.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface Soal {
  id?: string;
  id_ujian: string;
  id_mapel: string;
  nig: string;
  nama_soal: string;
  pertanyaan: string;
  dibuat_pada: Date;
}

class SoalModel {
  static async getAllSoal(): Promise<Soal[]> {
    const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM soal`);
    return rows as Soal[];
  }
  static async getSoalById(id: string): Promise<Soal | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM soal WHERE id = ?`,
      [id]
    );
    return (rows[0] as Soal) || null;
  }
  static async addSoal(soal: Soal): Promise<void> {
    await pool.query<ResultSetHeader[]>(
      `INSERT INTO soal (id, id_ujian, id_mapel, nig, nama_soal, pertanyaan, dibuat_pada) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        soal.id,
        soal.id_ujian,
        soal.id_mapel,
        soal.nig,
        soal.nama_soal,
        soal.pertanyaan,
        soal.dibuat_pada,
      ]
    );
  }
  static async updateSoal(OldId: string, updateSoal: Partial<Soal>): Promise<void> {
    await pool.query<ResultSetHeader[]>(
      `UPDATE soal SET nig = ?, nama_soal = ?, pertanyaan = ? WHERE id = ?`,
      [updateSoal, OldId]
    );
  }
  static async deleteSoal(id: string): Promise<void> {
    await pool.query<ResultSetHeader[]>(`DELETE FROM soal WHERE id = ?`, [id]);
  }
}

export default SoalModel;