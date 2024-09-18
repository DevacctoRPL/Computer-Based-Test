import React, { useState } from "react";
import InputQuestion from "../../../components/Teacher/Question/ConverterDOCX.js"

const QuestionInput: React.FC = () => {

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg my-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Sistem Ujian</h1>
        <InputQuestion />
    </div>
  );
};

export default QuestionInput;
