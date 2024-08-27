import React, { useState, useRef, FormEvent, ChangeEvent } from 'react';
import useClearNullList from '../hooks/useClearNullList.js';
// import './App.css';

interface Answer {
  mapel: string;
  question_id: string;
  question_text: string;
  answer_text: string;
  answer_alphabet: string;
  questionImage: string | null;
  arrayJawabanText: string;
  arrayAnswerImages: string | null;
}

const InputQuestion: React.FC = () => {
  useClearNullList()
  const [soal, setSoal] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:7772/convert", {
          method: "POST",
          body: formData,
        });

        const html = await response.text();
        processHTML(html);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const processHTML = (html: string) => {
    if (!outputRef.current) return;
  
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
  
    const listItems = tempDiv.querySelectorAll("ol li, ul li");
    let answerIndex = 0;
    const labels = ["A", "B", "C", "D", "E"];
    let currentSoal: HTMLElement | null = null;
    let localQuestionIndex = 1;  // Inisialisasi indeks soal lokal
  
    listItems.forEach((item, index) => {
      const listAnswerDiv = document.createElement("div");
      listAnswerDiv.classList.add("list-answer");
      listAnswerDiv.classList.add("ml-2");
  
      // Hapus elemen list yang kosong
      if (item.textContent?.trim() === '') {
        item.remove();
        return;
      }
  
      if (index % 5 === 0) {
        //5 adalah = 1 soal, 4 jawaban (a,b,c,d)
        const soalText = item.innerHTML;
        item.id = `soal-${localQuestionIndex}`;  // Gunakan indeks lokal
        item.classList.add('border-b-2', 'border-red-600', 'mb-4')
  
        const soalP = document.createElement("p");
        soalP.id = item.id;
        soalP.innerHTML = soalText;
  
        item.innerHTML = "";
        item.appendChild(soalP);
  
        // Tambahin border ke elemen soal
        // soalP.style.border = "2px solid #000";  // Buat Developing jarak soal ke Jawaban
        soalP.classList.add("mb-6")
  
        localQuestionIndex++;  // Increment indeks lokal
        answerIndex = 0;
        currentSoal = item as HTMLElement;
      } else {
        const radioLabel = document.createElement("label");
        radioLabel.classList.add("radio-label");
        radioLabel.classList.add("flex");
        radioLabel.classList.add("mb-6");
  
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = `jawaban-${localQuestionIndex - 1}`;  // Gunakan indeks lokal
        radioInput.classList.add("radio-input");
        radioInput.value = labels[answerIndex];
  
        listAnswerDiv.innerHTML = item.innerHTML;
        item.innerHTML = "";
        item.appendChild(listAnswerDiv);
  
        radioLabel.appendChild(radioInput);
        radioLabel.appendChild(listAnswerDiv);
  
        if (currentSoal) currentSoal.appendChild(radioLabel);
        answerIndex += 1;
      }
    });
  
    outputRef.current.innerHTML = '';  // Bersihkan output sebelum menambahkan yang baru
    outputRef.current.appendChild(tempDiv);
  };
  

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const answers: Answer[] = [];
    const allImageURIs: { pilihan: string; url: string }[] = [];

    const getImageAnswerURIs = (questionId: string) => {
      const uris: { pilihan: string; url: string }[] = [];
      const questionElement = document.querySelector(`#${questionId}`);
      if (questionElement) {
        const answerElements = questionElement.querySelectorAll("label");
        answerElements.forEach((label) => {
          const answerDiv = label.querySelector(".list-answer");
          if (answerDiv) {
            const imgTag = answerDiv.querySelector("img");
            if (imgTag) {
              uris.push({
                pilihan: answerDiv.textContent || '',
                url: imgTag.getAttribute("src") || ''
              });
            }
          }
        });
      }
      return uris;
    };

    let questionCount = 1;
    while (document.querySelector(`#soal-${questionCount}`)) {
      const questionId = `soal-${questionCount}`;
      const imgURIs = getImageAnswerURIs(questionId);
      if (imgURIs.length > 0) {
        allImageURIs.push(...imgURIs);
      } else {
        console.log(`No image found in list-answer for question ${questionId}`);
      }
      questionCount++;
    }

    const getImageQuestionURI = (element: Element): string | null => {
      const imgTag = element.querySelector("img");
      return imgTag ? imgTag.getAttribute("src") : null;
    };

    const removeImgAndBrFromP = (element: Element) => {
      Array.from(element.children).forEach((child) => {
        if (child.tagName === "IMG" || child.tagName === "BR") {
          element.removeChild(child);
        }
      });
    };

    for (let i = 1; i < questionCount; i++) {
      const tagP = document.querySelector(`p#soal-${i}`);

      if (tagP) {
        let listJawaban: string[] = [];
        console.log(tagP);

        document.querySelector(`#soal-${i}`)?.querySelectorAll("label").forEach(res => {
          const listAnswer = res.querySelector(".list-answer");
          if (listAnswer) listJawaban.push(listAnswer.textContent || '');
        });
        
        const imgURI = getImageQuestionURI(tagP);
        removeImgAndBrFromP(tagP);

        const nilaiTagP = tagP.textContent?.trim() || '';
        const checkedRadio = document.querySelector(
          `input[name='jawaban-${i}']:checked`
        ) as HTMLInputElement | null;

        if (checkedRadio) {
          const answerText = checkedRadio.nextElementSibling?.textContent?.trim() || '';
          const alphabetRadio = checkedRadio.value;

          const receiveObject: Answer = {
            mapel: soal,
            question_id: tagP.id,
            question_text: nilaiTagP,
            answer_text: answerText,
            answer_alphabet: alphabetRadio,
            questionImage: imgURI,
            arrayJawabanText: JSON.stringify(listJawaban),
            arrayAnswerImages: imgURI === null ? null : JSON.stringify({data: allImageURIs})
          };

          console.log(`ID Tag <p>: ${tagP.id}`);
          console.log(`Nilai dari Tag <p>: ${nilaiTagP}`);
          console.log(`Value Radio Checked: ${answerText}`);
          console.log(`Alphabet Radio Checked: ${alphabetRadio}`);
          console.log(`URL GAMBAR SOAL-${i}: ${imgURI}`);
          console.log(`ARRAY URL GAMBAR JAWABAN: `, imgURI === null ? null : allImageURIs);

          answers.push(receiveObject);
        }
      }
    }

    try {
      const response = await fetch("https://49kdgk28-7772.asse.devtunnels.ms/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.text();
      alert(result);

      setSoal('');
      const radioInputs = document.querySelectorAll<HTMLInputElement>(".radio-input");
      radioInputs.forEach((input) => {
        input.checked = false;
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Convert DOCX to HTML</h1>
      <form
        onSubmit={handleFileUpload}
        encType="multipart/form-data"
        className="flex flex-col items-center mb-6"
      >
        <input
          type="file"
          ref={fileInputRef}
          accept=".docx"
          required
          className="border border-gray-300 rounded-md p-2 mb-4"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Convert
        </button>
      </form>

      <form onSubmit={handleSave} className="flex flex-col space-y-4">
        <label
          htmlFor="soal"
          className="block text-sm font-medium text-gray-700"
        >
          Letakkan Nama Mapel Anda
        </label>
        <input
          type="text"
          name="soal"
          id="soal"
          value={soal}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSoal(e.target.value)}
          className="border border-red-600 rounded-md p-2 mb-4"
        />
        
        <div
          ref={outputRef}
          id="output"
          className="space-y-4 bg-gray-100 border-red-600 p-4 rounded-md"
        ></div>
        
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default InputQuestion;


