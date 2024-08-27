import pool from "../../src/backend/database/connection.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface Mapel {
  id?: string;
  nama_mapel: string;
  dibuat_pada: Date;
}

class MapelModel {
  static async getAll(): Promise<Mapel[]> {
    const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM mapel`);
    return rows as Mapel[];
  }

  static async getById(id: string): Promise<Mapel | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM mapel WHERE id = ?`,
      [id]
    );
    return (rows[0] as Mapel) || null;
  }

  static async add(mapel: Mapel): Promise<void> {
    await pool.query<ResultSetHeader>(
      `INSERT INTO mapel (id, mapel, dibuat_pada) VALUES (?, ?, ?)`,
      [mapel.id, mapel.nama_mapel, mapel.dibuat_pada]
    );
  }

  static async update(id: string, mapel: Mapel): Promise<void> {
    await pool.query<ResultSetHeader>(
      `UPDATE mapel SET mapel = ?, dibuat_pada = ? WHERE id = ?`,
      [mapel.nama_mapel, mapel.dibuat_pada, id]
    );
  }

  static async delete(id: string): Promise<void> {
    await pool.query<ResultSetHeader>(
      `DELETE FROM mapel WHERE id = ?`,
      [id]
    );
  }
}

export default MapelModel;
