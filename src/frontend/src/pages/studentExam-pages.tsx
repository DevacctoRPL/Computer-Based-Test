import React, { useState } from "react";
import Navbar from "../components/navbar.js";
import DetailSiswa from "../components/Exam/detail_siswa.js";
import Soal from "../components/Exam/soal.js";
import NomorSoal from "../components/Exam/nomor_soal.js";

const SoalSiswa: React.FC = () => {
  // State untuk menyimpan ID soal yang sedang dipilih
  const [currentQuestionId, setCurrentQuestionId] = useState<string>('initialQuestionId'); // Set the initial question ID here

  const handleNextQuestion = (nextQuestionId: string) => {
    setCurrentQuestionId(nextQuestionId);
  };
  return (
    <div className="h-screen">
      <Navbar />
      <main className="flex justify-between mt-6 h-[85%]">
        <DetailSiswa />
        {/* Kirimkan ID soal yang sedang dipilih ke komponen Soal */}
        <Soal currentQuestionId={currentQuestionId} onNextQuestion={handleNextQuestion} />
        {/* Kirimkan fungsi untuk mengubah ID soal ke komponen NomorSoal */}
        <NomorSoal onSoalClick={(id: string) => setCurrentQuestionId(id)} />
      </main>
    </div>
  );
};

export default SoalSiswa;
