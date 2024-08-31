import pool from "../../src/backend/database/connection.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";
type time = `${number}:${number}:${number}`;

export interface DetailUjian {
  id?: string;
  judul_soal: string;
  jumlah_soal: number;
  durasi: time;
  tanggal_pelaksanaan: Date;
  waktu_mulai: Date;
  waktu_berakhir: Date;
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
      `INSERT INTO detail_ujian (id, judul_soal, jumlah_soal, durasi, tanggal_pelaksanaan, waktu_mulai, waktu_berakhir, id_mapel, nig_guru, id_ujian, id_kelas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id, 
        detailUjian.judul_soal, 
        detailUjian.jumlah_soal, 
        detailUjian.durasi, 
        detailUjian.tanggal_pelaksanaan, 
        detailUjian.waktu_mulai, 
        detailUjian.waktu_berakhir, 
        detailUjian.id_mapel, 
        detailUjian.nig_guru, 
        detailUjian.id_ujian, 
        detailUjian.id_kelas
      ]
    );
  }

  static async updateDetailUjian(oldId: string, detailUjian: DetailUjian): Promise<void> {
    const id = `${detailUjian.id_kelas}-${detailUjian.id_mapel}-${detailUjian.nig_guru}`;
    await pool.query<ResultSetHeader>(
      `UPDATE detail_ujian SET id = ?, judul_soal = ?, jumlah_soal = ?, durasi = ?, tanggal_pelaksanaan = ?, waktu_mulai = ?, waktu_berakhir = ?, id_mapel = ?, nig_guru = ?, id_ujian = ?, id_kelas = ? WHERE id = ?`,
      [
        id, 
        detailUjian.judul_soal, 
        detailUjian.jumlah_soal, 
        detailUjian.durasi, 
        detailUjian.tanggal_pelaksanaan, 
        detailUjian.waktu_mulai, 
        detailUjian.waktu_berakhir, 
        detailUjian.id_mapel, 
        detailUjian.nig_guru, 
        detailUjian.id_ujian, 
        detailUjian.id_kelas, 
        oldId
      ]
    );
  }

  static async deleteDetailUjian(id: string): Promise<void> {
    await pool.query<ResultSetHeader>(`DELETE FROM detail_ujian WHERE id = ?`, [id]);
  }

  static async getDetailUjianByFields(fields: Partial<DetailUjian>): Promise<DetailUjian[]> {
    let query = `SELECT * FROM detail_ujian WHERE 1=1`;
    const queryParams: any[] = [];

    // Dynamically add query conditions
    if (fields.id) {
      query += ` AND id = ?`;
      queryParams.push(fields.id);
    }

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

    if (fields.tanggal_pelaksanaan) {
      query += ` AND tanggal_pelaksanaan = ?`;
      queryParams.push(fields.tanggal_pelaksanaan);
    }

    if (fields.waktu_mulai) {
      query += ` AND waktu_mulai = ?`;
      queryParams.push(fields.waktu_mulai);
    }

    if (fields.waktu_berakhir) {
      query += ` AND waktu_berakhir = ?`;
      queryParams.push(fields.waktu_berakhir);
    }

    const [rows] = await pool.query<RowDataPacket[]>(query, queryParams);
    return rows as DetailUjian[];
  }


  //IMPROVE SERVICES

  static async getExamsForToday(nis: string): Promise<DetailUjian[]> {
    const studentQuery = 'SELECT id_kelas FROM siswa WHERE nis = ?';
    const [studentRows] = await pool.query<RowDataPacket[]>(studentQuery, [nis]);

    if (studentRows.length === 0) {
      console.log('Student not found');
      return [];
    }

    const idKelas = studentRows[0].id_kelas;
    const currentDate = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

    console.log('Fetching exams for class:', idKelas, 'on date:', currentDate);

    const examQuery = `
      SELECT 
        du.id AS id_ujian,
        du.judul_soal,
        du.durasi,
        du.jumlah_soal,
        du.tanggal_pelaksanaan,
        du.waktu_mulai,
        du.waktu_berakhir,
        m.mapel AS nama_mapel,
        g.nama AS nama_guru
      FROM 
        detail_ujian AS du
      JOIN 
        mapel AS m ON du.id_mapel = m.id
      JOIN 
        guru AS g ON du.nig_guru = g.nig
      WHERE 
        du.id_kelas = ? 
        AND du.tanggal_pelaksanaan = ?
    `;

    const [examRows] = await pool.query<RowDataPacket[]>(examQuery, [idKelas, currentDate]);

    console.log('Exams found:', examRows);

    return examRows as DetailUjian[];
  }
}


export default DetailUjianModel;
