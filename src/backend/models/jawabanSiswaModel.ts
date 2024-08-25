import pool from "../database/connection.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface Jawaban {
  id?: number;
  id_nilai: number;
  id_jawaban: string;
  nilai_per_jawaban: number;
}

class JawabanSiswaModel {
  static async getAllJawaban(): Promise<Jawaban[]> {
    const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM jawaban`);
    return rows as Jawaban[];
  }

  static async getJawabanById(id: string): Promise<Jawaban | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM jawaban WHERE id = ?`,
      [id]
    );
    return (rows[0] as Jawaban) || null;
  }

  static async addJawaban(jawaban: Jawaban): Promise<void> {
    await pool.query<ResultSetHeader>(
      `INSERT INTO jawaban (id_nilai, id_jawaban, nilai_per_jawaban) VALUES (?, ?, ?)`,
      [jawaban.id_nilai, jawaban.id_jawaban, jawaban.nilai_per_jawaban]
    );
  }

  static async updateJawaban(id: string, jawaban: Jawaban): Promise<void> {
    await pool.query<ResultSetHeader>(
      `UPDATE jawaban SET id_nilai = ?, id_jawaban = ?, nilai_per_jawaban = ? WHERE id = ?`,
      [jawaban.id_nilai, jawaban.id_jawaban, jawaban.nilai_per_jawaban, id]
    );
  }

  static async deleteJawaban(id: string): Promise<void> {
    await pool.query<ResultSetHeader>(`DELETE FROM jawaban WHERE id = ?`, [id]);
  }
}

export default JawabanSiswaModel;
