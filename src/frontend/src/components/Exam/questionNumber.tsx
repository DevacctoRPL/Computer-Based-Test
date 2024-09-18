import React, { useState, useEffect } from "react";
import axios from "axios";

interface Pertanyaan {
  id: string;
  nomor: number;
}

interface QuestionNumberProps {
  onSoalClick: (id: string) => void;
}

const QuestionNumber: React.FC<QuestionNumberProps> = ({ onSoalClick }) => {
  const [soalData, setSoalData] = useState<Pertanyaan[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<{ [key: string]: string }>({});
  const [, setError] = useState<boolean>(false);

  const fetchQuestionNumber = async () => {
    try {
      const examId = localStorage.getItem('path_ujian');
      if (!examId) {
        setError(true);
        return;
      }
      const response = await axios.get<Pertanyaan[]>(
        `https://49kdgk28-7772.asse.devtunnels.ms/api/pertanyaan?id_detail_ujian=${examId}`
      );
      const sortedData = response.data.sort((a, b) => a.nomor - b.nomor); // Sort data by 'nomor'
      setSoalData(sortedData);

      const savedAnswers = JSON.parse(localStorage.getItem('examAnswers') || '[]');
      const answeredMap: { [key: string]: string } = {};
      savedAnswers.forEach((answer: any) => {
        answeredMap[answer.id] = answer.status;
      });
      setAnsweredQuestions(answeredMap);
    } catch (error) {
      console.error("Error fetching nomor soal:", error);
    }
  };

  useEffect(() => {
    fetchQuestionNumber();

    const intervalId = setInterval(() => {
      fetchQuestionNumber(); // Refresh data every 5 seconds
    }, 10000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedAnswers = JSON.parse(localStorage.getItem('examAnswers') || '[]');
      const answeredMap: { [key: string]: string } = {};
      savedAnswers.forEach((answer: any) => {
        answeredMap[answer.id] = answer.status;
      });
      setAnsweredQuestions(answeredMap);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleSoalClick = (id: string) => {
    setSelectedId(id);
    onSoalClick(id);
  };

  const getButtonColor = (id: string) => {
    if (selectedId === id) return "bg-purple-300";
    if (answeredQuestions[id] === "Sudah Dijawab") return "bg-green-300";
    if (answeredQuestions[id] === "Belum Dijawab") return "bg-red-300";
    return "bg-white";
  };

  return (
    <div
      id="daftarSoal"
      className="flex flex-col w-1/6 bg-purple-100 p-4 space-y-4 my-4 fixed right-0 mr-4"
    >
      <div className="bg-purple-200 text-center py-2">Nomor Soal</div>
      <div className="grid grid-cols-3 gap-2">
        {soalData.map((soal) => (
          <button
            key={soal.id}
            onClick={() => handleSoalClick(soal.id)}
            className={`${getButtonColor(soal.id)} border border-purple-300 h-10 w-10 transition-colors duration-200`}
          >
            {soal.nomor}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionNumber;
