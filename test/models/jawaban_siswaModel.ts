import pool from "../../src/backend/database/connection.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

import Nilai_SiswaModel from "./nilai_siswaModel.js";

export interface JawabanSiswa {
  id?: number;
  nis: number;
  id_pertanyaan: number;
  jawaban: string; // ini JSON
}

class Jawaban_SiswaModel {
  static async add(jawabanSiswa: JawabanSiswa): Promise<void> {
    try {
      // Validasi input jika perlu
      if (!jawabanSiswa.nis || !jawabanSiswa.id_pertanyaan || !jawabanSiswa.jawaban) {
        throw new Error('Invalid input');
      }

      // Simpan jawaban siswa ke database
      await pool.query<ResultSetHeader>(
        `INSERT INTO jawaban_siswa (nis, id_pertanyaan, jawaban) VALUES (?, ?, ?)`,
        [jawabanSiswa.nis, jawabanSiswa.id_pertanyaan, jawabanSiswa.jawaban]
      );

      // // Cek jawaban siswa dan simpan hasilnya jika perlu
      // await this.checkAndSaveNilai(jawabanSiswa.nis, jawabanSiswa.id_pertanyaan);
    } catch (error) {
      console.error("Error in add method:", error);
      throw error; // Propagate error to controller
    }
  }


  //ANOTHER SERVICES OPERATION
  private static async checkAndSaveNilai(nis: number, id_pertanyaan: number): Promise<void> {
    // Ambil jawaban guru berdasarkan id_pertanyaan
    const [rowsGuru] = await pool.query<RowDataPacket[]>(
      `SELECT isi_jawaban FROM jawaban_pertanyaan WHERE id_pertanyaan = ?`,
      [id_pertanyaan]
    );
  
    const jawabanGuru = rowsGuru[0]?.isi_jawaban
      ? JSON.parse(rowsGuru[0].isi_jawaban)
      : null;
  
    // Ambil jawaban siswa
    const [rowsSiswa] = await pool.query<RowDataPacket[]>(
      `SELECT jawaban FROM jawaban_siswa WHERE nis = ? AND id_pertanyaan = ?`,
      [nis, id_pertanyaan]
    );
  
    // Cek apakah jawaban siswa tersedia
    if (!rowsSiswa.length) {
      console.log('Jawaban siswa tidak ditemukan.');
      return;
    }
  
    const jawabanSiswa = rowsSiswa[0]?.jawaban ? JSON.parse(rowsSiswa[0].jawaban) : null;
  
    // Debugging: Log jawaban siswa
    console.log('Jawaban Siswa (raw):', rowsSiswa[0].jawaban);
    console.log('Jawaban Siswa (parsed):', jawabanSiswa);
  
    // Cek jawaban siswa dan hitung nilai
    if (jawabanGuru && jawabanSiswa) {
      const jawabanBenar = jawabanGuru.find((p: any) => p.benar)?.pilihan;
      const jawabanSiswaPilihan = jawabanSiswa.pilihan;
  
      // Debugging: Log jawaban yang dibandingkan
      console.log('Jawaban Benar:', jawabanBenar);
      console.log('Jawaban Siswa (pilihan):', jawabanSiswaPilihan);
  
      const isBenar = jawabanBenar === jawabanSiswaPilihan;
  
      // Format detail nilai sebagai JSON
      const detilNilai = {
        id_pertanyaan: id_pertanyaan,
        benar: isBenar,
        jawaban_siswa: jawabanSiswaPilihan,
        jawaban_benar: jawabanBenar,
      };
  
      // Nilai akhir: 100 jika benar, 0 jika salah  
      const nilaiAkhir = isBenar ? 100 : 0; //PENTING! UBAH SESUAI BANYAKNYA SOAL
  
      // Simpan hasil ke tabel nilai_siswa
      await Nilai_SiswaModel.add({
        nis: nis,
        hasil: nilaiAkhir,
        detil_nilai: JSON.stringify(detilNilai),
      });
  
      console.log('Nilai Akhir:', nilaiAkhir);
      console.log('Detail Nilai:', detilNilai);
    } else {
      console.log('Data jawaban guru atau siswa tidak lengkap.');
    }
  }  

  static async getAll(): Promise<JawabanSiswa[]> {
    const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM jawaban_siswa`);
    return rows as JawabanSiswa[];
  }

  static async getById(id: number): Promise<JawabanSiswa | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM jawaban_siswa WHERE id = ?`,
      [id]
    );
    return (rows[0] as JawabanSiswa) || null;
  }

  static async update(id: number, jawaban: JawabanSiswa): Promise<void> {
    await pool.query<ResultSetHeader>(
      `UPDATE jawaban_siswa SET nis = ?, id_pertanyaan = ?, jawaban = ? WHERE id = ?`,
      [jawaban.nis, jawaban.id_pertanyaan, jawaban.jawaban, id]
    );
  }

  static async delete(id: number): Promise<void> {
    await pool.query<ResultSetHeader>(`DELETE FROM jawaban_siswa WHERE id = ?`, [id]);
  }
  
}

export default Jawaban_SiswaModel;
