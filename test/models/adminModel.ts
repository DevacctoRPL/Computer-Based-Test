import pool from "../../src/backend/database/connection.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface PanelAdmin{
  anti_switch: true;
  anti_resize: true;
  hide_result: false;
}

interface Admin {
  id?: string;
  nama: string;
  sandi: string;
  panel_admin: PanelAdmin[];  
}

class AdminModel {
  static async getAllAdmin(): Promise<Admin[]> {
    const [rows] = await pool.query<RowDataPacket[]>(`SELECT * FROM admin`);
    return rows as Admin[];
  }

  static async getAdminById(id: string): Promise<Admin | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM admin WHERE id = ?`,
      [id]
    );
    return (rows[0] as Admin) || null;
  }

  static async addAdmin(Admin: Admin): Promise<void> {
    await pool.query<ResultSetHeader>(
      `INSERT INTO admin (id, nama, sandi) VALUES (?, ?, ?)`,
      [Admin.id, Admin.nama, Admin.sandi]
    );
  }
  static async updateAdmin(id: string, Admin: Admin): Promise<void> {
    await pool.query<ResultSetHeader>(
      `UPDATE admin SET nama = ? , sandi = ? WHERE id = ?`,
      [Admin.nama, Admin.sandi, id]
    );
  }
  static async deleteAdmin(id: string): Promise<void> {
    await pool.query<ResultSetHeader>(
        `DELETE FROM admin WHERE id = ?`, [id]
    );
  }
}

export default AdminModel