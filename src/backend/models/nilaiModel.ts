import pool from "../database/connection.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface Nilai {
    id?: string;
    id_jawaban: string;
    nis: string;
    jumlah_benar: number;
    nilai: number;
}

class NilaiModel {
  static async getAllNilai(): Promise<Nilai[]> {
    const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM nilai`);
    return rows as Nilai[];
  }

  static async getNilaiById(id: string): Promise<Nilai | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM nilai WHERE id = ?`,
      [id]
    );
    return (rows[0] as Nilai) || null;
  }

  static async addNilai(Nilai: Nilai): Promise<void> {
    await pool.query<ResultSetHeader>(
      `INSERT INTO nilai (id, id_jawaban, nis, jumlah_benar, nilai) VALUES (?, ?, ?, ?, ?)`,
      [Nilai.id, Nilai.id_jawaban, Nilai.nis, Nilai.jumlah_benar, Nilai.nilai]
    );
  }

  static async updateNilai( oldId: string, Nilai: Partial<Nilai>): Promise<void> {
    await pool.query<ResultSetHeader>(
      `UPDATE nilai SET jumlah_benar = ?, nilai = ? WHERE id = ?`,
      [Nilai.jumlah_benar, Nilai.nilai, oldId]
    );
  }

  static async deleteNilai(id: string): Promise<void> {
    await pool.query<ResultSetHeader>(
      `DELETE FROM nilai WHERE id = ?`,
      [id]
    );
  }
}

export default NilaiModel;
//ini komen