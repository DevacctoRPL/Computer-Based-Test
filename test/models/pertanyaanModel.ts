import pool from "../../src/backend/database/connection.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface Pertanyaan {
  id?: string;
  nomor: number;
  pertanyaan: string;
  gambar: string;
  id_detail_ujian: string;
}

class PertanyaanModel {
  static async getAll(): Promise<Pertanyaan[]> {
    const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM pertanyaan`);
    return rows as Pertanyaan[];
  }

  static async getById(id: string): Promise<Pertanyaan | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM pertanyaan WHERE id = ?`,
      [id]
    );
    return (rows[0] as Pertanyaan) || null;
  }

  static async add(pertanyaan: Pertanyaan): Promise<void> {
    await pool.query<ResultSetHeader>(
      `INSERT INTO pertanyaan (id, nomor, pertanyaan, gambar, id_detail_ujian) VALUES (?, ?, ?, ?, ?)`,
      [pertanyaan.id,pertanyaan.nomor, pertanyaan.pertanyaan, pertanyaan.gambar, pertanyaan.id_detail_ujian]
    );
  }

  static async update(id: string, pertanyaan: Pertanyaan): Promise<void> {
    await pool.query<ResultSetHeader>(
      `UPDATE pertanyaan SET nomor = ?, pertanyaan = ?, gambar = ?, id_detail_ujian = ? WHERE id = ?`,
      [pertanyaan.nomor, pertanyaan.pertanyaan, pertanyaan.gambar, pertanyaan.id_detail_ujian, id]
    );
  }

  static async delete(id: string): Promise<void> {
    await pool.query<ResultSetHeader>(`DELETE FROM pertanyaan WHERE id = ?`, [id]);
  }
}

export default PertanyaanModel;
