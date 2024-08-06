import pool from "../database/connection.js";
import {RowDataPacket, ResultSetHeader} from "mysql2";

interface RelMapelKelas {
  id: string;
  id_kelas: string;
  id_mapel: string;
}

class RelMapelKelasModel {
  static async getAllRelMapelKelas(): Promise<RelMapelKelas[]> {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM rel_mapel_kelas");
    return rows as RelMapelKelas[];
  }

  static async getRelMapelKelasById(id: string): Promise<RelMapelKelas | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM rel_mapel_kelas WHERE id = ?",
        [id],
    );
    return (rows[0] as RelMapelKelas) || null;
  }

  static async addRelMapelKelas(data: Omit<RelMapelKelas, "id">): Promise<void> {
    const {id_kelas, id_mapel} = data;

    // Mengecek apakah id_kelas ada di tabel kelas
    const [kelasRows] = await pool.query<RowDataPacket[]>(
        "SELECT COUNT(*) AS count FROM kelas WHERE id = ?",
        [id_kelas],
    );

    // Mengecek apakah id_mapel ada di tabel mapel
    const [mapelRows] = await pool.query<RowDataPacket[]>(
        "SELECT COUNT(*) AS count FROM mapel WHERE id = ?",
        [id_mapel],
    );

    const kelasCount = kelasRows[0].count;
    const mapelCount = mapelRows[0].count;

    if (kelasCount === 0) {
      throw new Error(`ID Kelas ${id_kelas} tidak ditemukan.`);
    }

    if (mapelCount === 0) {
      throw new Error(`ID Mapel ${id_mapel} tidak ditemukan.`);
    }

    // Menghasilkan ID untuk rel_mapel_kelas
    const id_rel_mapel_kelas = `${id_kelas}-${id_mapel}`;

    // Menyimpan data rel_mapel_kelas ke dalam database
    await pool.query(
        "INSERT INTO rel_mapel_kelas (id, id_kelas, id_mapel) VALUES (?, ?, ?)",
        [id_rel_mapel_kelas, id_kelas, id_mapel],
    );
  }

  static async updateRelMapelKelas(id: string, relMapelKelas: RelMapelKelas): Promise<void> {
    await pool.query<ResultSetHeader>(
        "UPDATE rel_mapel_kelas SET id_kelas = ?, id_mapel = ? WHERE id = ?",
        [relMapelKelas.id_kelas, relMapelKelas.id_mapel, id],
    );
  }

  static async deleteRelMapelKelas(id: string): Promise<void> {
    await pool.query<ResultSetHeader>("DELETE FROM rel_mapel_kelas WHERE id = ?", [id]);
  }
}

export default RelMapelKelasModel;
