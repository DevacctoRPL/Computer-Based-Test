import pool from "../../src/backend/database/connection.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";
type time = `${number}:${number}:${number}`;

export interface DetailUjian {
  id?: string;
  judul_soal: string;
  jumlah_soal: number;
  durasi: time;
  dibuat_pada: Date;
  id_mapel?: string;
  nig_guru?: number;
  id_ujian?: string;
  id_kelas?: string;
}

class DetailUjianModel {
  static async getAllDetailUjian(): Promise<DetailUjian[]> {
    const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM detail_ujian`);
    return rows as DetailUjian[];
  }

  static async getDetailUjianById(id: string): Promise<DetailUjian | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM detail_ujian WHERE id = ?`,
      [id]
    );
    return (rows[0] as DetailUjian) || null;
  }

  static async addDetailUjian(detailUjian: DetailUjian): Promise<void> {
    // Membuat ID berdasarkan id_kelas, id_mapel, dan nig_guru
    const id = `${detailUjian.id_kelas}-${detailUjian.id_mapel}-${detailUjian.nig_guru}`;
    console.log(`Generated ID: ${id}`); // Debugging statement
    
    // Menyimpan data detail ujian ke dalam database
    await pool.query<ResultSetHeader>(
      `INSERT INTO detail_ujian (id, judul_soal, jumlah_soal, durasi, dibuat_pada, id_mapel, nig_guru, id_ujian, id_kelas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, detailUjian.judul_soal, detailUjian.jumlah_soal, detailUjian.durasi, detailUjian.dibuat_pada, detailUjian.id_mapel, detailUjian.nig_guru, detailUjian.id_ujian, detailUjian.id_kelas]
    );
  }

  static async updateDetailUjian(oldId: string, detailUjian: DetailUjian): Promise<void> {
    const id = `${detailUjian.id_kelas}-${detailUjian.id_mapel}-${detailUjian.nig_guru}`;
    await pool.query<ResultSetHeader>(
      `UPDATE detail_ujian SET id = ?, judul_soal = ?, jumlah_soal = ?, durasi = ?, dibuat_pada = ?, id_mapel = ?, nig_guru = ?, id_ujian = ?, id_kelas = ? WHERE id = ?`,
      [id, detailUjian.judul_soal, detailUjian.jumlah_soal, detailUjian.durasi, detailUjian.dibuat_pada, detailUjian.id_mapel, detailUjian.nig_guru, detailUjian.id_ujian, detailUjian.id_kelas, oldId]
    );
  }

  static async deleteDetailUjian(id: string): Promise<void> {
    await pool.query<ResultSetHeader>(`DELETE FROM detail_ujian WHERE id = ?`, [id]);
  }

  static async getDetailUjianByFields(fields: Partial<DetailUjian>): Promise<DetailUjian[]> {
    let query = `SELECT * FROM detail_ujian WHERE 1=1`;
    const queryParams: any[] = [];

    // Dynamically add query conditions
    if (fields.id_mapel) {
      query += ` AND id_mapel = ?`;
      queryParams.push(fields.id_mapel);
    }

    if (fields.nig_guru) {
      query += ` AND nig_guru = ?`;
      queryParams.push(fields.nig_guru);
    }

    if (fields.id_kelas) {
      query += ` AND id_kelas = ?`;
      queryParams.push(fields.id_kelas);
    }

    if (fields.id_ujian) {
      query += ` AND id_ujian = ?`;
      queryParams.push(fields.id_ujian);
    }

    // Add more fields as needed

    const [rows] = await pool.query<RowDataPacket[]>(query, queryParams);
    return rows as DetailUjian[];
  }
}

export default DetailUjianModel;
