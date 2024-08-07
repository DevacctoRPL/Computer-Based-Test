import React from "react";
import Navbar from "../components/navbar";
const SoalSiswa : React.FC = () => {
    return (
        <>
    <div className="min-h-screen bg-slate-800 p-4">
        <Navbar/>
      <main className="flex justify-between mt-6">
        <div className="flex flex-col w-1/4 bg-purple-100 p-4 space-y-4">
          <div className="bg-purple-200 h-48"></div>
          <div className="bg-purple-200 h-48"></div>
        </div>
        <div className="flex flex-col w-1/2 bg-white p-4 space-y-4 h-[600px]">
          <div className="bg-purple-100 p-4 h-80">
            INI SOAL BLA BLA BLA
          </div>
          <div className="flex flex-col space-y-2">
          {Array(5).fill().map((_, index) => (
              <div key={index} className="flex items-center bg-purple-100 p-2">
                <input
                  type="radio"
                  name="answer"
                  id={`answer${index}`}
                  className="h-6 w-6 mr-4"
                />
                <label
                  htmlFor={`answer${index}`}
                  className="flex-grow bg-white border border-blue-500 h-10 flex items-center pl-2"
                >
                  Answer {index + 1}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-[282px] bg-purple-100 p-4 space-y-4">
          <div className="bg-purple-200 text-center py-2">daftar soal</div>
          <div className="grid grid-cols-3 gap-2">
            {Array(30).fill().map((_, index) => (
              <button key={index} className="bg-white border border-purple-300 h-10 w-10">{index + 1}</button>
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
    )
}

export default SoalSiswa;
