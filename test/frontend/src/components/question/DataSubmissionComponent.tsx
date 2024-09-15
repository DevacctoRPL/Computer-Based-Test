import React, { useState, useEffect } from 'react';

type DataSubmissionComponentProps = {
  isSubmitting: boolean;
  onReturn: () => void;
};

const DataSubmissionComponent: React.FC<DataSubmissionComponentProps> = ({ isSubmitting, onReturn }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isSubmitting && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      onReturn();
    }
    return () => clearTimeout(timer);
  }, [isSubmitting, countdown, onReturn]);

  useEffect(() => {
    if (!isSubmitting) {
      setCountdown(5);
    }
  }, [isSubmitting]);

  const [dots, setDots] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-purple-100 rounded-lg shadow-md">
      {isSubmitting ? (
        <>
          <img 
            src="/api/placeholder/100/100" 
            alt="Owl mascot" 
            className="w-24 h-24 mb-4"
          />
          <div className="text-xl font-semibold text-purple-700 mb-2">
            Sedang mengirim data{dots}
          </div>
        </>
      ) : (
        <>
          <div className="text-2xl font-bold text-green-600 mb-4">
            Data sudah terkirim!
          </div>
          <div className="text-md text-purple-600 mb-4">
            Anda akan diarahkan ke homepage dalam {countdown} detik.
          </div>
          <button 
            onClick={onReturn}
            className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition duration-300"
          >
            Kembali ke Home
          </button>
        </>
      )}
    </div>
  );
};

export default DataSubmissionComponent;