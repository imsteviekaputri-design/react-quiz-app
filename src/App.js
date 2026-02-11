import { useState } from "react";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import "./App.css";


function App() {
  const [page, setPage] = useState("login");
  const [result, setResult] = useState(null);

 return (
  <div className="app-container">
    <div className="card">
      {page === "login" && <Login onLogin={() => setPage("quiz")} />}
      {page === "quiz" && (
        <Quiz
          onFinish={(res) => {
            setResult(res);
            setPage("result");
          }}
        />
      )}
      {page === "result" && <Result result={result} />}
    </div>
  </div>
);

}

export default App;
