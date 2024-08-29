// components/Soal.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Pertanyaan {
  id: number;
  id_detail_ujian: string;
  pertanyaan: string;
  gambar: string | null;
}

interface JawabanPertanyaan {
  id: number;
  id_detail_ujian: string;
  isi_jawaban: string;
}

const Soal: React.FC = () => {
  const [pertanyaan, setPertanyaan] = useState<Pertanyaan[]>([]);
  const [jawabanPertanyaan, setJawabanPertanyaan] = useState<JawabanPertanyaan[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const idDetailUjian = 'XII-RPL-3-PPL-1214001';

  useEffect(() => {
    const fetchSoalDanJawaban = async () => {
      try {
        const pertanyaanResponse = await axios.get<Pertanyaan[]>('https://49kdgk28-7774.asse.devtunnels.ms/api/pertanyaan');
        const jawabanResponse = await axios.get<JawabanPertanyaan[]>('https://49kdgk28-7774.asse.devtunnels.ms/api/jawaban-pertanyaan');
        
        // Filter pertanyaan dan jawaban yang sesuai dengan id_detail_ujian
        const pertanyaanSesuai = pertanyaanResponse.data.filter(
          (pertanyaan) => pertanyaan.id_detail_ujian === idDetailUjian
        );
        const jawabanSesuai = jawabanResponse.data.filter(
          (jawaban) => jawaban.id_detail_ujian === idDetailUjian
        );
        
        setPertanyaan(pertanyaanSesuai);
        setJawabanPertanyaan(jawabanSesuai);
      } catch (error) {
        console.error('Error fetching soal dan jawaban:', error);
      }
    };

    fetchSoalDanJawaban();
  }, []);

  const parseJSON = (jsonString: string) => {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return null;
    }
  };

  const currentQuestion = pertanyaan[currentQuestionIndex];
  const currentAnswers = jawabanPertanyaan.filter(
    (jawaban) => jawaban.id_detail_ujian === currentQuestion?.id_detail_ujian
  );

  return (
    <div id="soal" className="soal flex flex-col w-1/2 bg-purple-100 p-3 space-y-6 my-4 mx-auto rounded-md">
      <div className="bg-white p-4 py-6 max-h-[310px] min-h-[310px] overflow-scroll overflow-x-hidden rounded-md flex justify-center items-start !text-center">
        {currentQuestion ? (
          <>
            <div>{parseJSON(currentQuestion.pertanyaan)?.text || 'Tidak ada teks pertanyaan'}</div>
            {currentQuestion.gambar && <img src={currentQuestion.gambar} alt="Gambar Soal" />}
          </>
        ) : (
          'Loading soal...'
        )}
      </div>
      <div className="flex flex-col space-y-2 max-h-max overflow-y-scroll rounded-md">
        {currentAnswers.map((jawab, index) => {
          const abcde = String.fromCharCode(65 + index);
          const isiJawaban = parseJSON(jawab.isi_jawaban);
          return (
            <div key={index} className="flex items-center bg-white p-2 rounded-md ">
              <input
                type="radio"
                name="answer"
                id={`answer${index}`}
                className="h-6 w-6 mr-4 hidden"
              />
              <label htmlFor={`answer${index}`} className="flex-grow flex items-center px-3 group">
                <div className="flex justify-center items-center pr-3">
                  <span className="radio w-2 h-2  border-black p-2 flex items-center justify-center mr-2 transition-all duration-300 bg-black/50 group-hover:p-2.5"></span>
                  <span className="font-semibold">{abcde}. </span>
                </div>
                {isiJawaban?.text || 'Tidak ada teks jawaban'}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Soal;