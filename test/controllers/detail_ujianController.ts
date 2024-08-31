import { Request, Response } from 'express';
import DetailUjianModel from '../models/detail_ujianModel.js';
import { DetailUjian } from '../models/detail_ujianModel.js';
import { log } from 'console';

class UjianController {
  // Get ujian by ID
  static async getDetailUjianById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const detailUjian = await DetailUjianModel.getDetailUjianById(id);
      if (detailUjian) {
        res.json(detailUjian);
      } else {
        res.status(404).json({ message: 'Detail ujian not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error when retrieving detail ujian', error });
      console.log(error);
    }
  }

  // Add new ujian
  static async addDetailUjian(req: Request, res: Response): Promise<void> {
    try {
      const { 
        judul_soal, 
        jumlah_soal, 
        durasi, 
        tanggal_pelaksanaan, 
        waktu_mulai, 
        waktu_berakhir, 
        id_mapel, 
        nig_guru, 
        id_ujian, 
        id_kelas 
      } = req.body;

      console.log(req.body);

      // Ensure all necessary fields are provided
      if (!judul_soal || jumlah_soal === undefined || !durasi || !tanggal_pelaksanaan || !waktu_mulai || !waktu_berakhir || !id_mapel || nig_guru === undefined || !id_kelas) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
      }

      const newDetailUjian: DetailUjian = { 
        judul_soal, 
        jumlah_soal, 
        durasi, 
        tanggal_pelaksanaan: new Date(tanggal_pelaksanaan), 
        waktu_mulai: new Date(waktu_mulai), 
        waktu_berakhir: new Date(waktu_berakhir), 
        id_mapel, 
        nig_guru, 
        id_ujian, 
        id_kelas 
      };

      await DetailUjianModel.addDetailUjian(newDetailUjian);
      res.status(201).json({ message: 'Detail ujian added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error when adding detail ujian', error });
      console.log(error);
    }
  }

  // Update existing ujian
  static async updateDetailUjian(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { 
        judul_soal, 
        jumlah_soal, 
        durasi, 
        tanggal_pelaksanaan, 
        waktu_mulai, 
        waktu_berakhir, 
        id_mapel, 
        nig_guru, 
        id_ujian, 
        id_kelas 
      } = req.body;

      // Create an update object with only defined properties
      const updatedDetailUjian: Partial<DetailUjian> = {};
      if (judul_soal !== undefined) updatedDetailUjian.judul_soal = judul_soal;
      if (jumlah_soal !== undefined) updatedDetailUjian.jumlah_soal = jumlah_soal;
      if (durasi !== undefined) updatedDetailUjian.durasi = durasi;
      if (tanggal_pelaksanaan !== undefined) updatedDetailUjian.tanggal_pelaksanaan = new Date(tanggal_pelaksanaan);
      if (waktu_mulai !== undefined) updatedDetailUjian.waktu_mulai = new Date(waktu_mulai);
      if (waktu_berakhir !== undefined) updatedDetailUjian.waktu_berakhir = new Date(waktu_berakhir);
      if (id_mapel !== undefined) updatedDetailUjian.id_mapel = id_mapel;
      if (nig_guru !== undefined) updatedDetailUjian.nig_guru = nig_guru;
      if (id_ujian !== undefined) updatedDetailUjian.id_ujian = id_ujian;
      if (id_kelas !== undefined) updatedDetailUjian.id_kelas = id_kelas;

      await DetailUjianModel.updateDetailUjian(id, updatedDetailUjian as DetailUjian);
      res.json({ message: 'Detail ujian updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error when updating detail ujian', error });
      console.log(error);
    }
  }

  // Delete ujian
  static async deleteDetailUjian(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await DetailUjianModel.deleteDetailUjian(id);
      res.json({ message: 'Detail ujian deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error when deleting detail ujian', error });
      console.log(error);
    }
  }

  // Get all ujian or filter by fields
  static async getAllDetailUjian(req: Request, res: Response): Promise<void> {
    try {
      const { id, id_mapel, nig_guru, id_kelas, id_ujian, tanggal_pelaksanaan, waktu_mulai, waktu_berakhir } = req.query;

      // Prepare fields object
      const fields: Partial<DetailUjian> = {
        id: id as string,
        id_mapel: id_mapel as string,
        nig_guru: nig_guru ? parseInt(nig_guru as string) : undefined,
        id_kelas: id_kelas as string,
        id_ujian: id_ujian as string,
        tanggal_pelaksanaan: tanggal_pelaksanaan ? new Date(tanggal_pelaksanaan as string) : undefined,
        waktu_mulai: waktu_mulai ? new Date(waktu_mulai as string) : undefined,
        waktu_berakhir: waktu_berakhir ? new Date(waktu_berakhir as string) : undefined
      };

      // Call the new model method with the fields
      const detailUjian = await DetailUjianModel.getDetailUjianByFields(fields);
      res.json(detailUjian);
    } catch (error) {
      res.status(500).json({ message: 'Error when retrieving detail ujian', error });
      console.log(error);
    }
  }

  //IMPROVE SERVICES!
  static async getExamsForToday(req: Request, res: Response): Promise<void> {
    try {
      const { nis } = req.query;
      console.log('nis: ', nis)

      // Ensure nis is a string
      if (typeof nis !== 'string') {
        res.status(400).json({ message: 'NIS siswa is required and must be a string' });
        return;
      }

      const exams = await DetailUjianModel.getExamsForToday(nis);
      console.log(exams);

      if (exams.length === 0) {
        res.status(404).json({ message: 'Tidak ada ujian untuk hari ini' });
        return;
      }

      res.json(exams);
    } catch (error) {
      res.status(500).json({ message: 'Error when retrieving exams for today', error });
    }
  }
}

export default UjianController;
