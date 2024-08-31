import pool from "../../src/backend/database/connection.js";
import { RowDataPacket, ResultSetHeader } from "mysql2";

interface Exam {
  Nama: string;
  Kelas: string;
  Id_Ujian_Siswa: string;
  verifyToken: string;
  signature: string;
}

interface CollectExamQuestion {

}

interface CollectExamAnswer {

}