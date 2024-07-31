import pool from '../database/connection.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface Guru {
    nig?: number;
    nama: string;
    kode_guru: string;
    id_mapel_kelas: string;
    sandi: string;
}

//ini komen