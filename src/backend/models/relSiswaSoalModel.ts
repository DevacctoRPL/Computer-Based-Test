import pool from "../database/connection.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface RelSiswaSoal {
  id: string;
  nis: string;
  id_soal: string;
}

class RelSiswaSoalModel {
  static async getAllRelSiswaSoal(): Promise<RelSiswaSoal[]> {
    const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM rel_siswa_soal`);
    return rows as RelSiswaSoal[];
  }

  static async getRelSiswaSoalById(id: string): Promise<RelSiswaSoal | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM rel_siswa_soal WHERE id = ?`,
      [id]
    );
    return (rows[0] as RelSiswaSoal) || null;
  }

  static async addRelSiswaSoal(data: Omit<RelSiswaSoal, 'id'>): Promise<void> {
    const { nis, id_soal } = data;

    const [nisRows] = await pool.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS count FROM siswa WHERE nis = ?`,
      [nis]
    );
    const [soalRows] = await pool.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS count FROM soal WHERE id = ?`,
      [id_soal]
    );

    const nisCount = (nisRows[0] as any).count;
    const soalCount = (soalRows[0] as any).count;

    if (nisCount === 0) {
      throw new Error(`ID Kelas ${nis} tidak ditemukan.`);
    }

    if (soalCount === 0) {
      throw new Error(`ID Mapel ${id_soal} tidak ditemukan.`);
    }

    // Menghasilkan ID untuk rel_mapel_kelas
    const id_rel_siswa_soal = `${nis}-${id_soal}`;

    // Menyimpan data rel_mapel_kelas ke dalam database
    await pool.query(
      `INSERT INTO rel_siswa_soal (id, nis, id_soal) VALUES (?, ?, ?)`,
      [id_rel_siswa_soal, nis, id_soal]
    );
  }

  static async updateRelSiswaSoal(id: string, RelSiswaSoal: RelSiswaSoal): Promise<void> {
    await pool.query<ResultSetHeader>(
      `UPDATE rel_siswa_soal SET nis = ?, id_soal = ? WHERE id = ?`,
      [RelSiswaSoal.nis, RelSiswaSoal.id_soal, id]
    );
  }

  static async deleteRelSiswaSoal(id: string): Promise<void> {
    await pool.query<ResultSetHeader>(`DELETE FROM rel_siswa_soal WHERE id = ?`, [id]);
  }
}

export default RelSiswaSoalModel;
