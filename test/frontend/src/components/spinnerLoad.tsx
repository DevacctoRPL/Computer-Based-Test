import React, { useState, useEffect } from 'react';

const SpinnerLoad = () => {
  const [rotation, setRotation] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const loadingTexts = ['Sedang mengambil data', 'Melakukan load data'];

  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 15) % 360);
    }, 50);

    const textInterval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    }, 3000);

    return () => {
      clearInterval(rotationInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 p-8 rounded-lg shadow-lg">
      <svg
        className="w-16 h-16 mb-4 text-indigo-600"
        viewBox="0 0 24 24"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <div className="text-xl font-medium text-gray-800">
        {loadingTexts[textIndex]}
        <AnimatedDots />
      </div>
    </div>
  );
};

const AnimatedDots = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) return '';
        return prevDots + '.';
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block w-8">
      {dots.split('').map((dot, index) => (
        <span
          key={index}
          className="inline-block transition-transform duration-300"
          style={{
            transform: `translateY(${Math.sin(index * Math.PI / 2) * 5}px)`
          }}
        >
          {dot}
        </span>
      ))}
    </span>
  );
};

export default SpinnerLoad;