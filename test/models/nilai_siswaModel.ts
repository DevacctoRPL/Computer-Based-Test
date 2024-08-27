import pool from "../../src/backend/database/connection.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface Nilai_Siswa {
  id?: number;
  nis: number;
  hasil: number; // Nilai akhir siswa (100 atau 0)
  detil_nilai: string; // JSON yang menyimpan detail jawaban
}

class Nilai_SiswaModel {
  static async getAll(): Promise<Nilai_Siswa[]> {
    const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM nilai_siswa`);
    return rows as Nilai_Siswa[];
  }

  static async getById(id: number): Promise<Nilai_Siswa | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM nilai_siswa WHERE id = ?`,
      [id]
    );
    return (rows[0] as Nilai_Siswa) || null;
  }

  static async add(nilai: Nilai_Siswa): Promise<void> {
    await pool.query<ResultSetHeader>(
      `INSERT INTO nilai_siswa (nis, hasil, detil_nilai) VALUES (?, ?, ?)`,
      [nilai.nis, nilai.hasil, nilai.detil_nilai]
    );
  }

  static async update(id: number, nilai: Nilai_Siswa): Promise<void> {
    await pool.query<ResultSetHeader>(
      `UPDATE nilai_siswa SET nis = ?, hasil = ?, detil_nilai = ? WHERE id = ?`,
      [nilai.nis, nilai.hasil, nilai.detil_nilai, id]
    );
  }

  static async delete(id: number): Promise<void> {
    await pool.query<ResultSetHeader>(`DELETE FROM nilai_siswa WHERE id = ?`, [id]);
  }
}

export default Nilai_SiswaModel;
