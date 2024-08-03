import pool from "../database/connection.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface Kelas {
  id?: string;
  nama_kelas: string;
  jurusan: string;
  angkatan: string;
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
    // Membuat ID berdasarkan nama_kelas dan angkatan
    const id = `${kelas.nama_kelas.toLowerCase().replace(/\s+/g, '')}${kelas.angkatan}`;
    console.log(`Generated ID: ${id}`); // Debugging statement
    
    // Menyimpan data kelas ke dalam database
    await pool.query<ResultSetHeader[]>(
      `INSERT INTO kelas (id, nama_kelas, jurusan, angkatan) VALUES (?, ?, ?, ?)`,
      [id, kelas.nama_kelas, kelas.jurusan, kelas.angkatan]
    );
  }
  

  static async updateKelas(oldId:string, kelas: Kelas): Promise<void> {
    await pool.query<ResultSetHeader[]>(`UPDATE kelas SET id = ?, nama_kelas = ?, jurusan = ?, angkatan = ? WHERE id = ?`, [
        kelas.id,
        kelas.nama_kelas,
        kelas.jurusan,
        kelas.angkatan,
        oldId
    ]);
  }

  static async deleteKelas(id: string): Promise<void> {
    await pool.query<ResultSetHeader>(`DELETE FROM kelas WHERE id = ?`, [id]);
  }
}

export default KelasModel
//ini komen