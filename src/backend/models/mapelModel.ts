import pool from "../database/connection.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface Mapel {
  id?: string;
  nama_mapel: string;
}

class MapelModel {
  static async getAllMapel(): Promise<Mapel[]> {
    const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM mapel`);
    return rows as Mapel[];
  }

  static async getMapelById(id: string): Promise<Mapel | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM mapel WHERE id = ?`,
      [id]
    );
    return (rows[0] as Mapel) || null;
  }

  static async addMapel(mapel: Mapel): Promise<void> {
    await pool.query<ResultSetHeader>(
      `INSERT INTO mapel (id, nama_mapel) VALUES (?, ?)`,
      [mapel.id, mapel.nama_mapel]
    );
  }

  static async updateMapel( oldId: string, mapel: Mapel): Promise<void> {
    await pool.query<ResultSetHeader>(
      `UPDATE mapel SET id = ?, nama_mapel = ? WHERE id = ?`,
      [mapel.id, mapel.nama_mapel, oldId]
    );
  }

  static async deleteMapel(id: string): Promise<void> {
    await pool.query<ResultSetHeader>(
      `DELETE FROM mapel WHERE id = ?`,
      [id]
    );
  }
}

export default MapelModel;
//ini komen