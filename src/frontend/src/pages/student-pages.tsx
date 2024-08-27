import React from "react";
import axios from "axios";
import Navbar from "../components/navbar.js";

const SoalSiswa: React.FC = () => {
  return (
    <>
      <div className="h-screen">
        <Navbar />
        <main className="flex justify-between mt-6 h-[85%]">
          <div className="flex flex-col w-1/5 p-4 space-y-4 fixed">
            <div className="bg-purple-100 rounded-lg h-[400px]"></div>
            <div className="bg-purple-100 rounded-lg h-[220px]"></div>
          </div>
          <div id="soal" className="soal flex flex-col w-1/2 bg-purple-100 p-3 space-y-6 my-4 mx-auto rounded-md">
            <div className="bg-white p-4 py-6 max-h-[310px] min-h-[310px] overflow-scroll overflow-x-hidden rounded-md flex justify-center items-start !text-center">Ini Soal (Ambil dari API)</div>
            <div className="flex flex-col space-y-2 max-h-max overflow-y-scroll rounded-md">
              {Array(5)
                .fill(null)
                .map((_, index) => {
                  const abcde = String.fromCharCode(65 + index);
                  return (
                    <div
                      key={index}
                      className="flex items-center bg-white p-2 rounded-md "
                    >
                      <input
                        type="radio"
                        name="answer"
                        id={`answer${index}`}
                        className="h-6 w-6 mr-4 hidden"
                      />
                      <label
                        htmlFor={`answer${index}`}
                        className="flex-grow flex items-center px-3 group"
                      >
                        <div className="flex justify-center items-center pr-3">
                          <span className="radio w-2 h-2  border-black p-2 flex items-center justify-center mr-2 transition-all duration-300 bg-black/50 group-hover:p-2.5"></span>
                          <span className="font-semibold">{abcde}. </span>
                        </div>
                        Ini Jawaban (ambil dari API)
                      </label>
                    </div>
                  );
                })}
            </div>
          </div>
          <div id="daftarSoal" className="flex flex-col w-1/6 bg-purple-100 p-4 space-y-4 my-4 fixed right-0 mr-4">
            <div className="bg-purple-200 text-center py-2">daftar soal</div>
            <div className="grid grid-cols-3 gap-2">
              {Array(50)
                .fill(null)
                .map((_, index) => (
                  <button
                    key={index}
                    className="bg-white border border-purple-300 h-10 w-10"
                  >
                    {index + 1}
                  </button>
                ))}
            </div>
            <div className="flex justify-between">
              <button className="bg-purple-200 p-2 rounded">{"<"}</button>
              <button className="bg-purple-200 p-2 rounded">{">"}</button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SoalSiswa;
