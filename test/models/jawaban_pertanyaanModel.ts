import pool from "../../src/backend/database/connection.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface JawabanPilihan {
  pilihan: string; // Contoh: 'A', 'B', 'C'
  isi: string; // Isi dari pilihan
  benar: boolean; // Pengunci nilai benar / salah
  gambar: string | null; // Gambar yang terkait dengan pilihan
}

interface JawabanPertanyaan {
  id?: string;
  id_pertanyaan: number;
  isi_jawaban: JawabanPilihan[]; // Array pilihan bakal disimpan dalam JSON
  id_detail_ujian: string;
}

class Jawaban_PertanyaanModel {
  static async getAll(): Promise<JawabanPertanyaan[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM jawaban_pertanyaan`
    );
    return rows.map((row) => ({
      ...row,
      isi_jawaban: JSON.parse(row.isi_jawaban), // Parse JSON untuk mengembalikan array
    })) as JawabanPertanyaan[];
  }

  static async getById(id: string): Promise<JawabanPertanyaan | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM jawaban_pertanyaan WHERE id = ?`,
      [id]
    );
    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      ...row,
      isi_jawaban: JSON.parse(row.isi_jawaban), // Parse JSON untuk mengembalikan array
    } as JawabanPertanyaan;
  }

  static async add(jawaban: JawabanPertanyaan): Promise<void> {
    await pool.query<ResultSetHeader>(
      `INSERT INTO jawaban_pertanyaan (id, id_pertanyaan, isi_jawaban, id_detail_ujian) VALUES (?, ?, ?, ?)`,
      [
        jawaban.id,
        jawaban.id_pertanyaan,
        JSON.stringify(jawaban.isi_jawaban), // Stringify JSON untuk disimpan di database
        jawaban.id_detail_ujian,
      ]
    );
  }

  static async update(id: string, jawaban: JawabanPertanyaan): Promise<void> {
    await pool.query<ResultSetHeader>(
      `UPDATE jawaban_pertanyaan SET id_pertanyaan = ?, isi_jawaban = ?, id_detail_ujian = ? WHERE id = ?`,
      [
        jawaban.id_pertanyaan,
        JSON.stringify(jawaban.isi_jawaban), // Stringify JSON untuk disimpan di database
        jawaban.id_detail_ujian,
        id,
      ]
    );
  }

  static async delete(id: string): Promise<void> {
    await pool.query<ResultSetHeader>(
      `DELETE FROM jawaban_pertanyaan WHERE id = ?`,
      [id]
    );
  }
}

export default Jawaban_PertanyaanModel;
