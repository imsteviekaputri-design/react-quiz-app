function Result({ result }) {
  return (
    <div className="result">
      <h2 className="title">Hasil Kuis</h2>
      <p>Jawaban Benar: {result.correct}</p>
      <p>Jawaban Salah: {result.total - result.correct}</p>
      <p>Total Soal: {result.total}</p>
    </div>
  );
}

export default Result;
