import pool from "../database/connection.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface Jawaban {
  id?: string;
  id_soal: string;
  pilihan: string;
  isi_jawaban: string;
}

class JawabanModel {
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
      "INSERT INTO jawaban (id, id_soal, pilihan, isi_jawaban) VALUES (?, ?, ?, ?)",
      [jawaban.id, jawaban.id_soal, jawaban.pilihan, jawaban.isi_jawaban]
    );
  }

  static async updateJawaban(id: string, jawaban: Jawaban): Promise<void> {
    await pool.query<ResultSetHeader>(
      `UPDATE jawaban SET pilihan = ?, isi_jawaban = ? WHERE id = ?`,
      [jawaban.pilihan, jawaban.isi_jawaban, id]
    );
  }

  static async deleteJawaban(id: string): Promise<void> {
    await pool.query<ResultSetHeader>(`DELETE FROM jawaban WHERE id = ?`, [id]);
  }
}

export default JawabanModel; 
