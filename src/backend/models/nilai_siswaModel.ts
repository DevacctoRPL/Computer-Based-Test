import pool from "../database/connection.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Nilai_Siswa {
  id?: number;
  nis: number;
  id_ujian: string; // ID Ujian
  nilai_akhir: number; // Nilai akhir siswa
  detil_nilai: string; // JSON yang menyimpan detail jawaban
}

class Nilai_SiswaModel {
  
  // Method untuk menambahkan nilai siswa
  static async add(nilai: Nilai_Siswa): Promise<void> {
    console.log(nilai)
    try {
      const [result] = await pool.query<ResultSetHeader>(
        `INSERT INTO nilai_siswa (nis, id_ujian, nilai_akhir, detil_nilai) VALUES (?, ?, ?, ?)`,
        [nilai.nis, nilai.id_ujian, nilai.nilai_akhir, nilai.detil_nilai]
      );
      const insertID = result.insertId;
      console.log(`InsertID: ${insertID}`);
    } catch (error) {
      console.error("Error in add method:", error);
      throw error; // Propagate error to controller
    }
  }

  // Method untuk mendapatkan semua nilai siswa
  static async getAll(): Promise<Nilai_Siswa[]> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM nilai_siswa`);
      return rows as Nilai_Siswa[];
    } catch (error) {
      console.error("Error in getAll method:", error);
      throw error; // Propagate error to controller
    }
  }

  // Method untuk mendapatkan nilai siswa berdasarkan ID
  static async getById(id: number): Promise<Nilai_Siswa | null> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT * FROM nilai_siswa WHERE id = ?`,
        [id]
      );
      return rows.length ? (rows[0] as Nilai_Siswa) : null;
    } catch (error) {
      console.error("Error in getById method:", error);
      throw error; // Propagate error to controller
    }
  }

  static async update(id: number, nilai: Nilai_Siswa): Promise<void> {
    await pool.query<ResultSetHeader>(
      `UPDATE nilai_siswa SET nis = ?, hasil = ?, detil_nilai = ? WHERE id = ?`,
      [nilai.nis, nilai.id_ujian, nilai.nilai_akhir, nilai.detil_nilai]
    );
  }

  static async delete(id: number): Promise<void> {
    await pool.query<ResultSetHeader>(`DELETE FROM nilai_siswa WHERE id = ?`, [id]);
  }
}

export default Nilai_SiswaModel;
