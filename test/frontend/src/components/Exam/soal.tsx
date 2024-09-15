import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from 'jsonwebtoken';
import SpinnerLoad from "../spinnerLoad.js";

interface Pertanyaan {
  id: string;
  nomor: string;
  pertanyaan: string;
  gambar: string | null;
  id_detail_ujian: string;
}

interface Jawaban {
  id: string;
  isi_jawaban: string;
  id_pertanyaan: string;
}

interface PilihanJawaban {
  pilihan: string;
  url?: string;
  kode: string;
}

interface SoalProps {
  currentQuestionId: string;
  onNextQuestion: (nextQuestionId: string) => void;
}

interface JawabanData {
  id: string;
  nomor: string;
  alphabet: string;
  J_text: string;
  status: 'ragu' | 'yakin';
  niu?: number
}

const Soal: React.FC<SoalProps> = ({ currentQuestionId, onNextQuestion }) => {
  const [niu, setNiu] = useState<string>("");
  const [pertanyaan, setPertanyaan] = useState<Pertanyaan | null>(null);
  const [jawaban, setJawaban] = useState<PilihanJawaban[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [soalData, setSoalData] = useState<Pertanyaan[]>([]);
  const [isLastQuestion, setIsLastQuestion] = useState<boolean>(false);
  const [status, setStatus] = useState<'ragu' | 'yakin'>('ragu');
  const [error, setError] = useState<boolean>(false); // State for handling errors

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSoal = async () => {
      try {
        // Get exam ID from localStorage
        const examId = localStorage.getItem('path_ujian');
        if (!examId) {
          setError(true); // Set error state
          return;
        }

        // Fetch question details based on the currentQuestionId
        const responsePertanyaan = await axios.get<Pertanyaan>(
          `https://49kdgk28-7772.asse.devtunnels.ms/api/pertanyaan/${currentQuestionId}`
        );
        setPertanyaan(responsePertanyaan.data);

        // Fetch answers based on the currentQuestionId
        const responseJawaban = await axios.get<Jawaban>(
          `https://49kdgk28-7772.asse.devtunnels.ms/api/jawaban-pertanyaan/${currentQuestionId}`
        );

        const isiJawaban = JSON.parse(responseJawaban.data.isi_jawaban);
        let pilihanJawaban: PilihanJawaban[] = [];

        if (isiJawaban.daftar_jawaban !== "null") {
          pilihanJawaban = JSON.parse(isiJawaban.daftar_jawaban).map(
            (jawaban: string, index: number) => ({
              pilihan: jawaban,
              kode: String.fromCharCode(65 + index)
            })
          );
        } else if (isiJawaban.daftar_jawaban_bergambar) {
          pilihanJawaban = JSON.parse(isiJawaban.daftar_jawaban_bergambar).map(
            (jawaban: PilihanJawaban, index: number) => ({
              ...jawaban,
              kode: String.fromCharCode(65 + index)
            })
          );
        }

        // Fetch all questions for the current exam
        const responseSoal = await axios.get<Pertanyaan[]>(
          `https://49kdgk28-7772.asse.devtunnels.ms/api/pertanyaan?id_detail_ujian=${examId}`
        );
        setSoalData(responseSoal.data);
        setJawaban(pilihanJawaban);

        // Check if it's the last question
        setIsLastQuestion(responseSoal.data[responseSoal.data.length - 1].id === currentQuestionId);

        // Load saved answer from localStorage
        const savedAnswers = JSON.parse(localStorage.getItem('examAnswers') || '[]');
        const savedAnswer = savedAnswers.find((answer: JawabanData) => answer.nomor === responsePertanyaan.data.nomor);
        if (savedAnswer) {
          setSelectedAnswer(savedAnswer.J_text);
          setStatus(savedAnswer.status);
        } else {
          setSelectedAnswer("");
          setStatus('ragu');
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentQuestionId) {
      fetchSoal();
    }

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt.decode(token);
      if (decodedToken && typeof decodedToken !== 'string') {
        setNiu(decodedToken.niu || "");
      }
    }
  }, [currentQuestionId]);

  const handleAnswerChange = (pilihan: string) => {
    setSelectedAnswer(pilihan);
    saveAnswer(pilihan, status);
  };

  const saveAnswer = (answer: string, answerStatus: 'ragu' | 'yakin') => {
    if (pertanyaan) {
      const selectedOption = jawaban.find(j => j.pilihan === answer);
      const jawabanData: JawabanData = {
        id: pertanyaan.id,
        nomor: pertanyaan.nomor,
        alphabet: selectedOption?.kode || "",
        J_text: answer,
        status: answerStatus
      };

      const existingAnswers = JSON.parse(localStorage.getItem('examAnswers') || '[]');
      const existingAnswerIndex = existingAnswers.findIndex((ans: JawabanData) => ans.nomor === pertanyaan.nomor);
      
      if (existingAnswerIndex !== -1) {
        existingAnswers[existingAnswerIndex] = jawabanData;
      } else {
        existingAnswers.push(jawabanData);
      }

      localStorage.setItem('examAnswers', JSON.stringify(existingAnswers));
    }
  };

  const handleSubmit = async () => {
    try {
      const examAnswers = JSON.parse(localStorage.getItem('examAnswers') || '[]');
      
      // Prepare the data in the correct format
      const formattedData = examAnswers.map((answer: JawabanData) => ({
        nis: niu,
        id_pertanyaan: answer.id,
        jawaban: JSON.stringify({
          id: answer.id,
          nomor: answer.nomor,
          alphabet: answer.alphabet,
          J_text: answer.J_text,
          status: answer.status
        })
      }));

      console.log(formattedData)

      // Send each formatted answer individually
      for (const data of formattedData) {
        await axios.post('https://49kdgk28-7772.asse.devtunnels.ms/api/jawaban-siswa', data);
      }

      alert('Jawaban berhasil disubmit!');
      // Optional: clear localStorage after successful submission
      localStorage.removeItem('examAnswers');
    } catch (error) {
      console.error('Error submitting answers:', error);
      alert('Terjadi kesalahan saat mengirim jawaban. Silakan coba lagi.');
    }
  };

  const handleStatusChange = (newStatus: 'ragu' | 'yakin') => {
    setStatus(newStatus);
    saveAnswer(selectedAnswer, newStatus);
  };

  if (error) {
    return (
      <div className="text-center mt-4">
        <h2 className="text-xl font-bold text-red-500 text-center items-center">
          Ujian Yang Kamu Cari Tidak Ada!
        </h2>
      </div>
    );
  }

  if (isLoading) {
    return <SpinnerLoad />;
  }

  return (
    <div
      id="soal"
      className="soal flex flex-col w-1/2 bg-purple-100 h-fit p-3 space-y-6 my-4 mx-auto rounded-md"
    >
      <div
        className={`bg-white p-4 py-6 max-h-[310px] min-h-[310px] overflow-scroll overflow-x-hidden rounded-md flex flex-col ${
          pertanyaan?.gambar
            ? "justify-start items-start !text-center"
            : "justify-center items-center"
        } text-center`}
      >
        {pertanyaan ? (
          <>
            {pertanyaan.gambar && (
              <img
                src={pertanyaan.gambar}
                alt="Gambar Soal"
                className="mb-4 mx-auto max-w-full h-auto"
              />
            )}
            <h2 className="text-xl font-bold mb-4">{pertanyaan.pertanyaan}</h2>
          </>
        ) : (
          <div className="text-center text-gray-500">
            Klik Nomor untuk Membuka Soal
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md flex-grow">
        <h3 className="text-lg font-semibold mb-4">Pilihan Jawaban:</h3>
        <div className="space-y-4">
          {jawaban.map((pilihan, index) => (
            <label
              key={index}
              className={`flex items-center space-x-3 p-3 border rounded-lg transition-colors ${
                selectedAnswer === pilihan.pilihan
                  ? "bg-purple-200"
                  : "hover:bg-purple-50"
              }`}
            >
              <input
                type="radio"
                name="jawaban"
                value={pilihan.pilihan}
                checked={selectedAnswer === pilihan.pilihan}
                onChange={() => handleAnswerChange(pilihan.pilihan)}
                className="form-radio h-5 w-5 text-purple-600"
              />
              <span className="text-gray-700 flex-grow">
                {pilihan.kode}. {pilihan.pilihan}
              </span>
              {pilihan.url && (
                <img
                  src={pilihan.url}
                  alt={`Gambar untuk ${pilihan.pilihan}`}
                  className="max-w-xs h-auto ml-4"
                />
              )}
            </label>
          ))}
        </div>
        {pertanyaan && (
          <div id="status_button" className="submit text-center mt-4">
            <button 
              className={`bg-yellow-500 mr-2 focus:outline-none focus:ring p-2 ${status === 'ragu' ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => handleStatusChange('ragu')}
            >
              Ragu
            </button>
            <button 
              className={`bg-green-500 mr-2 focus:outline-none focus:ring p-2 ${status === 'yakin' ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => handleStatusChange('yakin')}
            >
              Yakin
            </button>
            {isLastQuestion && (
              <button
                className="bg-blue-500 focus:outline-none focus:ring p-2 text-white"
                onClick={handleSubmit}
              >
                Submit Soal
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Soal;
