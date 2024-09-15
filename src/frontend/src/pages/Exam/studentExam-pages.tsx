import React, { useState } from "react";
import Navbar from "../../components/navbar.js";
import StudentDetails from "../../components/Exam/studentDetails.js";
import Question from "../../components/Exam/question.js";
import QuestionNumber from "../../components/Exam/questionNumber.js";

const StudentsQuestions: React.FC = () => {
  // State untuk menyimpan ID soal yang sedang dipilih
  const [currentQuestionId, setCurrentQuestionId] = useState<string>('initialQuestionId'); // Set the initial question ID here

  const handleNextQuestion = (nextQuestionId: string) => {
    setCurrentQuestionId(nextQuestionId);
  };
  return (
    <div className="h-screen">
      <Navbar />
      <main className="flex justify-between mt-6 h-[85%]">
        <StudentDetails />
        {/* Kirimkan ID soal yang sedang dipilih ke komponen Soal */}
        <Question currentQuestionId={currentQuestionId} onNextQuestion={handleNextQuestion} />
        {/* Kirimkan fungsi untuk mengubah ID soal ke komponen NomorSoal */}
        <QuestionNumber onSoalClick={(id: string) => setCurrentQuestionId(id)} />
      </main>
    </div>
  );
};

export default StudentsQuestions;
