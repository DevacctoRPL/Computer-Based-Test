import pool from "../database/connection.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

import Nilai_SiswaModel from "./nilai_siswaModel.js";

export interface JawabanSiswa {
  id?: number;
  nis: number;
  id_pertanyaan: number;
  jawaban: string; // ini JSON
  id_detail_ujian: string;
}

class Jawaban_SiswaModel {
  private static async checkAndSaveNilai(nis: number, id_detail_ujian: string): Promise<void> {
    const connection = await pool.getConnection();
    try {
      // Ambil semua jawaban siswa berdasarkan NIS dan id_detail_ujian
      const [rowsSiswa] = await connection.query<RowDataPacket[]>(
        'SELECT id_pertanyaan, jawaban FROM jawaban_siswa WHERE nis = ? AND id_detail_ujian = ?',
        [nis, id_detail_ujian]
      );
  
      // Ambil semua jawaban yang benar berdasarkan id_detail_ujian dari tabel jawaban_pertanyaan
      const [rowsGuru] = await connection.query<RowDataPacket[]>(
        'SELECT id_pertanyaan, isi_jawaban FROM jawaban_pertanyaan WHERE id_detail_ujian = ?',
        [id_detail_ujian]
      );
  
      // Parsing jawaban benar ke dalam Map
      let jawabanBenarArray: {id_pertanyaan: string, jawaban: string}[] = [];
      rowsGuru.forEach((item: any) => {
        try {
          console.log(item);
          
          // Pertama, parsing string JSON
          let parsedIsiJawaban = JSON.parse(item.isi_jawaban);
      
          // Jika parsedIsiJawaban adalah string JSON yang perlu di-parse lagi
          if (typeof parsedIsiJawaban === 'string') {
            parsedIsiJawaban = JSON.parse(parsedIsiJawaban);
          }
      
          console.log(parsedIsiJawaban);
          console.log(parsedIsiJawaban.jawaban_alphabet);
          
          // Menyimpan hasil ke dalam array
          jawabanBenarArray.push({id_pertanyaan: String(item.id_pertanyaan), jawaban: parsedIsiJawaban.jawaban_alphabet});
        } catch (error) {
          console.error("Error parsing isi_jawaban:", error);
        }
      });
  
      // Hitung jumlah jawaban benar
      let benar = 0;
      const detilNilaiBaru: any[] = [];
  
      rowsSiswa.forEach((item: any) => {
        const jawabanSiswa = JSON.parse(item.jawaban);
  
        const jawabanBenar = jawabanBenarArray.find(benarItem => benarItem.id_pertanyaan === String(item.id_pertanyaan));
        const jawabanBenarAlphabet = jawabanBenar ? jawabanBenar.jawaban : undefined;

        // Tambahkan detail perbandingan jawaban ke detilNilai
        const isBenar = jawabanBenarAlphabet?.trim().toLowerCase() === jawabanSiswa.alphabet.trim().toLowerCase();
        detilNilaiBaru.push({
          id_pertanyaan: item.id_pertanyaan,
          benar: isBenar,
          jawaban_siswa: jawabanSiswa.alphabet,
          jawaban_benar: jawabanBenarAlphabet
        });
  
        if (isBenar) {
          benar += 1; // Tambahkan ke hitungan jawaban benar jika sesuai
        }
      });
  
      const totalPertanyaan = rowsSiswa.length; // Jumlah total pertanyaan
      console.log(`Total Pertanyaan: ${totalPertanyaan}`)
      const nilaiAkhir = (benar / totalPertanyaan) * 100; // Menghitung nilai akhir dalam persentase
  
      // Cek apakah nilai_siswa dengan nis dan id_ujian sudah ada
      const [rowsNilaiSiswa] = await connection.query<RowDataPacket[]>(
        'SELECT id, detil_nilai, nilai_akhir FROM nilai_siswa WHERE nis = ? AND id_ujian = ?',
        [nis, id_detail_ujian]
      );
  
      if (rowsNilaiSiswa.length > 0) {
        // Jika data sudah ada, gabungkan detil_nilai baru dengan yang sudah ada
        const existingDetilNilai = JSON.parse(rowsNilaiSiswa[0].detil_nilai);
      
        // Filter duplikat, hanya tambahkan pertanyaan baru yang belum ada
        const updatedDetilNilai = [...existingDetilNilai];
      
        detilNilaiBaru.forEach((newItem) => {
          const exists = existingDetilNilai.some((existingItem: any) => existingItem.id_pertanyaan === newItem.id_pertanyaan);
          if (!exists) {
            updatedDetilNilai.push(newItem); // Hanya tambahkan jika belum ada
          }
        });
      
        // Ganti penghitungan nilai dengan menggunakan nilai terbaru (tanpa dirata-rata)
        const updatedNilaiAkhir = nilaiAkhir; // Gunakan nilai akhir terbaru tanpa rata-rata
      
        // Update data nilai_siswa dengan detil_nilai dan nilai_akhir yang diperbarui
        await connection.query<ResultSetHeader>(
          'UPDATE nilai_siswa SET nilai_akhir = ?, detil_nilai = ? WHERE nis = ? AND id_ujian = ?',
          [updatedNilaiAkhir, JSON.stringify(updatedDetilNilai), nis, id_detail_ujian]
        );
        console.log('Nilai diperbarui:', updatedNilaiAkhir);
      } else {
        // Jika data belum ada, tambahkan baris baru ke tabel nilai_siswa
        await Nilai_SiswaModel.add({
          nis: nis,
          id_ujian: id_detail_ujian, // Assuming this is equivalent to id_ujian in nilai_siswa
          nilai_akhir: nilaiAkhir,
          detil_nilai: JSON.stringify(detilNilaiBaru)
        });
        console.log('Nilai baru ditambahkan:', nilaiAkhir);
      }
  
    } catch (error) {
      console.error("Error in checkAndSaveNilai method:", error);
      throw error;
    } finally {
      connection.release();
    }
  }

  static async add(jawabanSiswa: JawabanSiswa): Promise<void> {
    try {
      // Validasi input jika diperlukan
      console.log(jawabanSiswa)
      if (!jawabanSiswa.nis || !jawabanSiswa.id_pertanyaan || !jawabanSiswa.jawaban) {
        throw new Error('Invalid input');
      }
  
      // Simpan jawaban siswa ke database
      await pool.query<ResultSetHeader>(
        `INSERT INTO jawaban_siswa (nis, id_pertanyaan, jawaban, id_detail_ujian) VALUES (?, ?, ?, ?)`,
        [jawabanSiswa.nis, jawabanSiswa.id_pertanyaan, jawabanSiswa.jawaban, jawabanSiswa.id_detail_ujian]
      );
  
      console.log(jawabanSiswa.nis, jawabanSiswa.id_pertanyaan, jawabanSiswa.jawaban)
  
      // Cek jawaban siswa dan simpan hasilnya
      await this.checkAndSaveNilai(jawabanSiswa.nis, jawabanSiswa.id_detail_ujian);
  
    } catch (error) {
      console.error("Error in add method:", error);
      throw error; // Propagate error to controller
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
      `UPDATE jawaban_siswa SET nis = ?, id_pertanyaan = ?, jawaban = ?, id_detail_ujian = ?, WHERE id = ?`,
      [jawaban.nis, jawaban.id_pertanyaan, jawaban.jawaban, jawaban.id_detail_ujian, id]
    );
  }

  static async delete(id: number): Promise<void> {
    await pool.query<ResultSetHeader>(`DELETE FROM jawaban_siswa WHERE id = ?`, [id]);
  }
  
}

export default Jawaban_SiswaModel;
