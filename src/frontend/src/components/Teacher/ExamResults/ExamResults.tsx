import React from 'react';
import { FileBarChart, Loader, AlertCircle } from 'lucide-react';
import useGetExamResult from '../../../hooks/Teacher/useGetExamResult.js';

const ExamResults: React.FC = () => {
  const { examResults, loading, error } = useGetExamResult();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="animate-spin text-purple-600" size={24} />
        <span className="ml-2 text-purple-600">Loading exam results...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        <AlertCircle size={24} />
        <span className="ml-2">{error}</span>
      </div>
    );
  }

  if (examResults.length === 0) {
    return (
      <div className="text-center text-gray-600">
        <p>Tidak ada hasil ujian untuk ditampilkan.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-purple-700 mb-4 flex items-center">
        <FileBarChart className="mr-2" />
        Hasil Ujian Terkini
      </h2>
      <div className="space-y-4">
        {examResults.map((result) => (
          <div key={result.id} className="bg-purple-50 rounded-lg p-4 flex justify-between items-center">
            <div>
              <h3 className="font-medium text-purple-800">{result.nama_siswa || 'Unknown'}</h3>
              <p className="text-sm text-gray-600">NIS: {result.nis}</p>
              <p className="text-sm text-gray-600">ID Ujian: {result.id_ujian}</p>
            </div>
            <div className="text-lg font-bold text-purple-600">
              {result.nilai_akhir.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamResults;