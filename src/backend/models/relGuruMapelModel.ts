import pool from "../database/connection.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface RelGuruMapel {
  id: string;
  nig: string;
  id_mapel: string;
}

class RelGuruMapelModel {
  static async getAllRelGuruMapel(): Promise<RelGuruMapel[]> {
    const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM rel_guru_mapel`);
    return rows as RelGuruMapel[];
  }

  static async getRelGuruMapelById(id: string): Promise<RelGuruMapel | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM rel_guru_mapel WHERE id = ?`,
      [id]
    );
    return (rows[0] as RelGuruMapel) || null;
  }

  static async addRelGuruMapel(data: Omit<RelGuruMapel, 'id'>): Promise<void> {
    const { nig, id_mapel } = data;

    const [nigRows] = await pool.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS count FROM guru WHERE nig = ?`,
      [nig]
    );
    const [mapelRows] = await pool.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS count FROM mapel WHERE id = ?`,
      [id_mapel]
    );

    const nigCount = (nigRows[0] as any).count;
    const mapelCount = (mapelRows[0] as any).count;

    if (nigCount === 0) {
      throw new Error(`ID Kelas ${nig} tidak ditemukan.`);
    }

    if (mapelCount === 0) {
      throw new Error(`ID Mapel ${id_mapel} tidak ditemukan.`);
    }

    // Menghasilkan ID untuk rel_mapel_kelas
    const id_rel_guru_mapel = `${nig}-${id_mapel}`;

    // Menyimpan data rel_mapel_kelas ke dalam database
    await pool.query(
      `INSERT INTO rel_guru_mapel (id, nig, id_mapel) VALUES (?, ?, ?)`,
      [id_rel_guru_mapel, nig, id_mapel]
    );
  }

  static async updateRelGuruMapel(id: string, relGuruMapel: RelGuruMapel): Promise<void> {
    await pool.query<ResultSetHeader>(
      `UPDATE rel_guru_mapel SET nig = ?, id_mapel = ? WHERE id = ?`,
      [relGuruMapel.nig, relGuruMapel.id_mapel, id]
    );
  }

  static async deleteRelGuruMapel(id: string): Promise<void> {
    await pool.query<ResultSetHeader>(`DELETE FROM rel_guru_mapel WHERE id = ?`, [id]);
  }
}

export default RelGuruMapelModel;
