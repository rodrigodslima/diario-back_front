import { useState } from "react";
import api from "../../services/api";

function Cadastro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await api.post("/usuario/registro", {
        email,
        password,
      });

      setMessage(`Usuário ${response.data.email} cadastrado com sucesso!`);

      setEmail("");
      setPassword("");
    } catch (err: any) {
      if (err.response && err.response.data) {
        const errorMessage = err.response.data.message;

        if (Array.isArray(errorMessage)) {
          setError(errorMessage.join(", "));
        } else {
          setError(errorMessage || "Erro desconhecido.");
        }
      } else {
        setError("Não foi possível conectar ao servidor.");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Formulário de Cadastro</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Senha:</label>
          <input
            type="password"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 15px" }}>
          Cadastrar
        </button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Cadastro;
