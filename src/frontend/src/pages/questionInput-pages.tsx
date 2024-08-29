import React, { useState } from "react";
import ExamDetails from "../components/question/ExamDetail.js"; // Pastikan path ini benar
import InputQuestion from "../components/question/ConverterDOCX.js"

const QuestionInput: React.FC = () => {
  const [isExamDetailsComplete, setIsExamDetailsComplete] = useState(false);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Sistem Ujian</h1>
      <ExamDetails onComplete={setIsExamDetailsComplete} />
      {isExamDetailsComplete ? (
        <InputQuestion />
      ) : (
        <div className="text-center text-gray-500 mt-4">
          Harap lengkapi detail ujian terlebih dahulu.
        </div>
      )}
    </div>
  );
};

export default QuestionInput;
