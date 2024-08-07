import pool from "../database/connection.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface Ujian {
  id?: string;
  nama_ujian: string;
  dimulai_pada: Date;
  berakhir_pada: Date;
  dibuat_pada: Date;
}

class ujianModel {
  static async getAllUjian(): Promise<Ujian[]> {
    const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM ujian`);
    return rows as Ujian[];
  }
  static async getUjianById(id: string): Promise<Ujian | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM ujian WHERE id = ?`,
      [id]
    );
    return (rows[0] as Ujian) || null;
  }
  static async addUjian(ujian: Ujian): Promise<void> {
    await pool.query<ResultSetHeader[]>(
      `INSERT INTO ujian (id, nama_ujian, dimulai_pada, berakhir_pada, dibuat_pada) VALUES (?, ?, ?, ?, ?)`,
      [
        ujian.id,
        ujian.nama_ujian,
        ujian.dimulai_pada,
        ujian.berakhir_pada,
        ujian.dibuat_pada,
      ]
    );
  }
  static async updateUjian(id: string, ujian: Ujian): Promise<void> {
    await pool.query<ResultSetHeader[]>(`UPDATE ujian SET nama_ujian = ?, dimulai_pada = ?, berakhir_pada = ?, dibuat_pada WHERE id = ?`, [ujian.nama_ujian, ujian.dimulai_pada, ujian.berakhir_pada, ujian.dibuat_pada, id])
  }
  static async deleteUjian(id: string): Promise<void> {
    await pool.query<ResultSetHeader[]>(`DELETE FROM ujian WHERE id = ?`, [id]);
  }
}

export default ujianModel