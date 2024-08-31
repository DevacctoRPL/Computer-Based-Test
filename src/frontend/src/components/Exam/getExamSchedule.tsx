import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Book, Clock, User, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface ExamDetail {
  id_ujian: string;
  judul_soal: string;
  durasi: string;
  jumlah_soal: number;
  tanggal_pelaksanaan: string;
  waktu_mulai: string;
  waktu_berakhir: string;
  nama_mapel: string;
  nama_guru: string;
}

const ExamSchedule: React.FC = () => {
  const [examDetails, setExamDetails] = useState<ExamDetail[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const decodedToken = jwt.decode(token);
        if (decodedToken && typeof decodedToken !== 'string') {
          const { niu } = decodedToken as { niu: string };

          const examResponse = await axios.get('https://49kdgk28-7774.asse.devtunnels.ms/api/today-exam', {
            params: { nis: niu }
          });

          if (examResponse.status === 404) {
            setError('Tidak ada ujian untuk hari ini.');
            setExamDetails(null);
          } else {
            const now = new Date();
            const filteredExams = examResponse.data.filter((exam: ExamDetail) => {
              const endTime = new Date(exam.waktu_berakhir);
              return endTime >= now;
            });

            if (filteredExams.length === 0) {
              setError('Semua ujian hari ini sudah berakhir.');
            } else {
              setExamDetails(filteredExams);
              setError(null);
            }
          }

          setLoading(false);
        }
      } catch (err: any) {
        console.error('Error fetching exam details:', err);
        setError(err.response?.status === 404 ? 'Tidak ada ujian untuk hari ini.' : err.message || 'Terjadi kesalahan');
        setExamDetails(null);
        setLoading(false);
      }
    };

    fetchExamDetails();
  }, []);

  const handleExamClick = (idUjian: string) => {
    // Save ID to localStorage
    localStorage.setItem('path_ujian', idUjian);

    // Check if ID exists in localStorage
    const storedExamId = localStorage.getItem('path_ujian');
    if (storedExamId === idUjian) {
      // Redirect to /soal
      navigate('/soal');
    } else {
      // Redirect to root or handle error
      navigate('/');
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading exam details...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  if (!examDetails || examDetails.length === 0) return <p style={{ textAlign: "center" }}>No exam details available or all exams have ended.</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto", marginTop: "32px", padding: "16px", borderRadius: "8px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#6B46C1" }}>Upcoming Exams</h2>
      {examDetails.map(exam => (
        <div key={exam.id_ujian} style={{ marginTop: "16px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "600" }}>{exam.judul_soal || 'No title available'}</h3>
          <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
            <Book color="purple" />
            <p style={{ marginLeft: "8px" }}>Subject: {exam.nama_mapel || 'N/A'}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
            <Clock color="purple" />
            <p style={{ marginLeft: "8px" }}>Duration: {exam.durasi || 'N/A'}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
            <User color="purple" />
            <p style={{ marginLeft: "8px" }}>Teacher: {exam.nama_guru || 'N/A'}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
            <List color="purple" />
            <p style={{ marginLeft: "8px" }}>Number of Questions: {exam.jumlah_soal || 'N/A'}</p>
          </div>
          <button
            onClick={() => handleExamClick(exam.id_ujian)}
            style={{ display: "inline-block", marginTop: "16px", padding: "8px 16px", borderRadius: "9999px", backgroundColor: "#6B46C1", color: "white", border: "none", cursor: "pointer" }}
          >
            Start Exam
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExamSchedule;
