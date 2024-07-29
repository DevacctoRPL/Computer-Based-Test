import pool from '../database/connection';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// Definisikan interface untuk tipe data pengguna
interface User {
  id?: number;
  name: string;
  email: string;
}

// Class UserModel untuk operasi CRUD
class UserModel {
  // Method untuk mendapatkan semua pengguna
  static async getAllUsers(): Promise<User[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users');
    return rows as User[];
  }

  // Method untuk mendapatkan pengguna berdasarkan ID
  static async getUserById(id: number): Promise<User | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0] as User || null;
  }

  // Method untuk menambahkan pengguna baru
  static async addUser(user: User): Promise<void> {
    await pool.query<ResultSetHeader>('INSERT INTO users (name, email) VALUES (?, ?)', [user.name, user.email]);
  }

  // Method untuk memperbarui pengguna
  static async updateUser(id: number, user: User): Promise<void> {
    await pool.query<ResultSetHeader>('UPDATE users SET name = ?, email = ? WHERE id = ?', [user.name, user.email, id]);
  }

  // Method untuk menghapus pengguna
  static async deleteUser(id: number): Promise<void> {
    await pool.query<ResultSetHeader>('DELETE FROM users WHERE id = ?', [id]);
  }
}

export default UserModel;
