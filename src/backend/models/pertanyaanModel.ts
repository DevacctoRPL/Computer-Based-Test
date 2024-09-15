import pool from "../database/connection.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export interface Pertanyaan {
  id?: string;
  nomor: number;
  pertanyaan: string;
  gambar: string;
  id_detail_ujian: string;
}

class PertanyaanModel {
  static async getDetailByFields(fields: Partial<Pertanyaan>): Promise<Pertanyaan[]> {
    let query = `SELECT * FROM pertanyaan WHERE 1=1`;
    const queryParams: any[] = [];

    // Dynamically add query conditions
    if (fields.id) {
      query += ` AND id = ?`;
      queryParams.push(fields.id);
    }

    if (fields.nomor) {
      query += ` AND nomor = ?`;
      queryParams.push(fields.nomor);
    }

    if (fields.pertanyaan) {
      query += ` AND pertanyaan = ?`;
      queryParams.push(fields.pertanyaan);
    }

    if (fields.gambar) {
      query += ` AND gambar = ?`;
      queryParams.push(fields.gambar);
    }

    if (fields.id_detail_ujian) {
      query += ` AND id_detail_ujian = ?`;
      queryParams.push(fields.id_detail_ujian);
    }

    // Add more fields as needed

    const [rows] = await pool.query<RowDataPacket[]>(query, queryParams);
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
