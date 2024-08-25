import pool from "../../src/backend/database/connection.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface Kelas {
  id?: string;
  kelas: string;
  jurusan: string;
  nomor_kelas: string;
}

class KelasModel {
  static async getAllKelas(): Promise<Kelas[]> {
    const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM kelas`);
    return rows as Kelas[];
  }

  static async getKelasById(id: string): Promise<Kelas | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM kelas WHERE id = ?`,
      [id]
    );
    return (rows[0] as Kelas) || null;
  }

  static async addKelas(kelas: Kelas): Promise<void> {
    // Membuat ID berdasarkan kelas, jurusan, dan nomor_kelas
    const id = `${kelas.kelas}-${kelas.jurusan}-${kelas.nomor_kelas}`;
    console.log(`Generated ID: ${id}`); // Debugging statement
    
    // Menyimpan data kelas ke dalam database
    await pool.query<ResultSetHeader>(
      `INSERT INTO kelas (id, kelas, jurusan, nomor_kelas) VALUES (?, ?, ?, ?)`,
      [id, kelas.kelas, kelas.jurusan, kelas.nomor_kelas]
    );
  }

  static async updateKelas(oldId: string, kelas: Kelas): Promise<void> {
    const id = `${kelas.kelas}-${kelas.jurusan}-${kelas.nomor_kelas}`;
    await pool.query<ResultSetHeader>(
      `UPDATE kelas SET id = ?, kelas = ?, jurusan = ?, nomor_kelas = ? WHERE id = ?`,
      [id, kelas.kelas, kelas.jurusan, kelas.nomor_kelas, oldId]
    );
  }

  static async deleteKelas(id: string): Promise<void> {
    await pool.query<ResultSetHeader>(`DELETE FROM kelas WHERE id = ?`, [id]);
  }
}

export default KelasModel;
