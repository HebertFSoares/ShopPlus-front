import React, { useState } from "react";

function SignInForm() {
  const [state, setState] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { email, password } = state;

    try {
      const response = await fetch("http://localhost:8080/api/auth/cliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Falha na autenticação");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      alert("Login bem-sucedido!");
      console.log("Token armazenado com sucesso:", data.token);

      setState({
        email: "",
        password: ""
      });
      setError(null);
    } catch (error) {
      setError("Credenciais inválidas, tente novamente.");
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Entre na Shop Plus</h1>
        <div className="social-container">
          <a href="//shopplus-frontend" className="social">
            <img
              src={require('../utils/pesquisa.png')}
              alt="Google"
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%"
              }}
            />
          </a>
          <a href="//shopplus-frontend" className="social">
            <img
              src={require('../utils/facebook.png')}
              alt="Facebook"
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%"
              }}
            />
          </a>
          <a href="//shopplus-frontend" className="social">
            <img
              src={require('../utils/linkedin.png')}
              alt="LinkedIn"
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%"
              }}
            />
          </a>
        </div>
        <span>ou entre com seu e-mail</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={state.password}
          onChange={handleChange}
        />
        <a href="//shopplus-frontend">Esqueceu sua senha?</a>
        <button type="submit" className="form-button">Entrar</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default SignInForm;
