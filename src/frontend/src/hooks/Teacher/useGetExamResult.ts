import { useState, useEffect } from 'react';
import axios from 'axios';

interface ExamResult {
  id: string;
  nis: string;
  id_ujian: string;
  nilai_akhir: number;
  nama_siswa?: string; // Tambahkan field untuk nama siswa
}

const useGetExamResult = () => {
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExamResults = async () => {
      try {
        setLoading(true);
        // Asumsikan endpoint ini mengembalikan hasil ujian
        const response = await axios.get<ExamResult[]>('https://49kdgk28-7772.asse.devtunnels.ms/api/nilai-siswa');
        
        // Fetch nama siswa untuk setiap hasil ujian
        const resultsWithNames = await Promise.all(response.data.map(async (result) => {
          try {
            const siswaResponse = await axios.get(`https://49kdgk28-7772.asse.devtunnels.ms/api/siswa/${result.nis}`);
            return { ...result, nama_siswa: siswaResponse.data.nama };
          } catch (err) {
            console.error(`Failed to fetch student name for NIS ${result.nis}:`, err);
            return { ...result, nama_siswa: 'Unknown' };
          }
        }));

        setExamResults(resultsWithNames);
        setError(null);
      } catch (err) {
        setError('Failed to fetch exam results');
        console.error('Error fetching exam results:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExamResults();
  }, []);

  return { examResults, loading, error };
};

export default useGetExamResult;