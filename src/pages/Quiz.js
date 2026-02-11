import { useEffect, useState } from "react";

function Quiz({ onFinish }) {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [time, setTime] = useState(60);
  const [loading, setLoading] = useState(true); //  PENTING

  //  Ambil data resume
  useEffect(() => {
    const savedIndex = localStorage.getItem("quizIndex");
    const savedCorrect = localStorage.getItem("quizCorrect");
    const savedTime = localStorage.getItem("quizTime");

    if (savedIndex) setIndex(Number(savedIndex));
    if (savedCorrect) setCorrect(Number(savedCorrect));
    if (savedTime) setTime(Number(savedTime));
  }, []);

  //  Ambil soal dari API (FIX UTAMA)
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        console.log("API RESPONSE:", data); //  DEBUG
        if (data && Array.isArray(data.results)) {
          setQuestions(data.results);
          setLoading(false); // PENTING
        }
      })
      .catch((err) => {
        console.error("API ERROR:", err);
        setLoading(false);
      });
  }, []);

  //  Timer
  useEffect(() => {
    if (loading) return; //  JANGAN JALANKAN TIMER SAAT LOADING

    if (time === 0) {
      localStorage.clear();
      onFinish({ correct, total: index });
      return;
    }

    const timer = setInterval(() => {
      setTime((t) => {
        localStorage.setItem("quizTime", t - 1);
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [time, loading, correct, index, onFinish]);

  //  PENGAMAN LOADING
  if (loading) {
    return <p>Loading soal...</p>;
  }

  //  PENGAMAN INDEX (INI WAJIB)
  if (!questions[index]) {
    return <p>Menyiapkan soal...</p>;
  }

  const question = questions[index];
  const answers = [
    ...question.incorrect_answers,
    question.correct_answer,
  ].sort();

  const chooseAnswer = (answer) => {
    let newCorrect = correct;

    if (answer === question.correct_answer) {
      newCorrect = correct + 1;
      setCorrect(newCorrect);
    }

    const nextIndex = index + 1;

    localStorage.setItem("quizIndex", nextIndex);
    localStorage.setItem("quizCorrect", newCorrect);

    if (nextIndex < questions.length) {
      setIndex(nextIndex);
    } else {
      localStorage.clear();
      onFinish({
        correct: newCorrect,
        total: questions.length,
      });
    }
  };

  return (
  <>
    <div className="timer">Waktu: {time} detik</div>

    <h3 className="title">
      Soal {index + 1} / {questions.length}
    </h3>

    <div
      className="question"
      dangerouslySetInnerHTML={{ __html: question.question }}
    />

    <div className="answers">
      {answers.map((ans, i) => (
        <button key={i} onClick={() => chooseAnswer(ans)}>
          <span dangerouslySetInnerHTML={{ __html: ans }} />
        </button>
      ))}
    </div>
  </>
);

}

export default Quiz;
