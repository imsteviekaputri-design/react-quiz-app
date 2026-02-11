import { useState } from "react";

function Login({ onLogin }) {
  const [name, setName] = useState("");

return (
  <>
    <h2 className="title">Login Kuis</h2>
    <input
      className="input"
      placeholder="Masukkan nama"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <button className="button" onClick={onLogin}>
      Mulai Kuis
    </button>
  </>
);

}

export default Login;
