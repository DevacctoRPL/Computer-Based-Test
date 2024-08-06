import pool from "../database/connection.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface RelSoalMapelKelas {
  id: string;
  id_soal: string;
  id_mapel_kelas: string;
}

class RelSoalMapelKelasModel {
  static async getAllRelSoalMapelKelas(): Promise<RelSoalMapelKelas[]> {
    const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM rel_soal_mapel_kelas`);
    return rows as RelSoalMapelKelas[];
  }

  static async getRelSoalMapelKelasById(id: string): Promise<RelSoalMapelKelas | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM rel_soal_mapel_kelas WHERE id = ?`,
      [id]
    );
    return (rows[0] as RelSoalMapelKelas) || null;
  }

  static async addRelSoalMapelKelas(data: Omit<RelSoalMapelKelas, 'id'>): Promise<void> {
    const { id_soal, id_mapel_kelas } = data;
  
    // Jalankan kedua query secara paralel
    const [idSoalRows, idMapelKelasRows] = await Promise.all([
      pool.query<RowDataPacket[]>(
        `SELECT COUNT(*) AS count FROM soal WHERE id = ?`,
        [id_soal]
      ),
      pool.query<RowDataPacket[]>(
        `SELECT COUNT(*) AS count FROM rel_mapel_kelas WHERE id = ?`,
        [id_mapel_kelas]
      )
    ]);
  
    const idSoalCount = idSoalRows[0][0].count;
    const idMapelKelasCount = idMapelKelasRows[0][0].count;
  
    if (idSoalCount === 0) {
      throw new Error(`ID Soal ${id_soal} tidak ditemukan.`);
    }
  
    if (idMapelKelasCount === 0) {
      throw new Error(`ID Mapel-Kelas ${id_mapel_kelas} tidak ditemukan.`);
    }
  
    // Menghasilkan ID untuk rel_soal_mapel_kelas
    const id_rel_soal_mapel_kelas = `${id_soal}-${id_mapel_kelas}`;
  
    // Menyimpan data rel_mapel_kelas ke dalam database
    await pool.query(
      `INSERT INTO rel_soal_mapel_kelas (id, id_soal, id_mapel_kelas) VALUES (?, ?, ?)`,
      [id_rel_soal_mapel_kelas, id_soal, id_mapel_kelas]
    );
  }
  

  static async updateRelSoalMapelKelas(id: string, RelSoalMapelKelas: RelSoalMapelKelas): Promise<void> {
    await pool.query<ResultSetHeader>(
      `UPDATE rel_soal_mapel_kelas SET id_soal = ?, id_mapel_kelas = ? WHERE id = ?`,
      [RelSoalMapelKelas.id_soal, RelSoalMapelKelas.id_mapel_kelas, id]
    );
  }

  static async deleteRelSoalMapelKelas(id: string): Promise<void> {
    await pool.query<ResultSetHeader>(`DELETE FROM rel_soal_mapel_kelas WHERE id = ?`, [id]);
  }
}

export default RelSoalMapelKelasModel;
