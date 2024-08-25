import React, { useState, useRef, FormEvent, ChangeEvent } from 'react';
import useClearNullList from '../hooks/useClearNullList.js';

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

const InputQuestionTest: React.FC = () => {
  useClearNullList();
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
        const response = await fetch("https://49kdgk28-7774.asse.devtunnels.ms/api/convert", {
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
    let localQuestionIndex = 1;
  
    listItems.forEach((item, index) => {
      const listAnswerDiv = document.createElement("div");
      listAnswerDiv.classList.add("list-answer", "ml-2");
  
      if (item.textContent?.trim() === '') {
        item.remove();
        return;
      }
  
      if (index % 5 === 0) {
        const soalText = item.innerHTML;
        item.id = `soal-${localQuestionIndex}`;
        item.classList.add('border-b-2', 'border-red-600', 'mb-4');
  
        const soalP = document.createElement("p");
        soalP.id = item.id;
        soalP.innerHTML = soalText;
  
        item.innerHTML = "";
        item.appendChild(soalP);
  
        soalP.classList.add("mb-6");
  
        localQuestionIndex++;
        answerIndex = 0;
        currentSoal = item as HTMLElement;
      } else {
        const radioLabel = document.createElement("label");
        radioLabel.classList.add("radio-label", "flex", "mb-6");
  
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = `jawaban-${localQuestionIndex - 1}`;
        radioInput.classList.add("radio-input");
        radioInput.value = labels[answerIndex];
  
        let answerText = item.innerHTML.trim();
        const listAnswerDivContent = item.innerHTML;
  
        // Periksa jika div berisi gambar dan teks '(asTrueAnswer)'
        if (listAnswerDivContent.includes('(asTrueAnswer)')) {
          const divWithImg = item.querySelector('div.list-answer');
          if (divWithImg && divWithImg.querySelector('img')) {
            // Hapus teks '(asTrueAnswer)' dan ubah warna teks menjadi merah
            answerText = answerText.replace("(asTrueAnswer)", "").trim();
            listAnswerDiv.style.color = "red"; // Ubah warna teks menjadi merah
          }
        }
  
        // Periksa jika teks di akhir kalimat
        if (answerText.endsWith("(asTrueAnswer)")) {
          answerText = answerText.replace("(asTrueAnswer)", "").trim();
          listAnswerDiv.style.color = "red"; // Ubah warna teks menjadi merah
        }
  
        listAnswerDiv.innerHTML = answerText;
        item.innerHTML = "";
        item.appendChild(listAnswerDiv);
  
        radioLabel.appendChild(radioInput);
        radioLabel.appendChild(listAnswerDiv);
  
        if (currentSoal) currentSoal.appendChild(radioLabel);
        answerIndex += 1;
      }
    });
  
    outputRef.current.innerHTML = ''; // Bersihkan output sebelum menambahkan yang baru
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
            arrayAnswerImages: imgURI === null ? null : JSON.stringify({ data: allImageURIs })
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
      const response = await fetch("https://49kdgk28-7774.asse.devtunnels.ms/submit", {
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
        className="mb-8"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Select a DOCX file:
          </label>
          <input
            type="file"
            ref={fileInputRef}
            accept=".docx"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Upload
        </button>
      </form>
      <form onSubmit={handleSave}>
        <div ref={outputRef} className="output-html mb-4"></div>
        <button
          type="submit"
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300"
        >
          Save Answers
        </button>
      </form>
    </div>
  );
};

export default InputQuestionTest;
