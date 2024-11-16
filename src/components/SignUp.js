import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    cpf: "",
    cep: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
  
    const { name, cpf, email, password, cep } = state;
  
    if (!name || !email || !password || !cpf || !cep) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
  
    setLoading(true);
    setError(null);
  
  
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: name,
          cpf,
          email,
          password,
          cep,
        }),
      });
  
      const data = await response.json();
  
      if (response.status === 200 || response.status === 201) {
        alert("Cadastro realizado com sucesso! Enviamos um código de verificação para o seu e-mail.");
  
        localStorage.setItem('userEmail', email);
        setOtpSent(true);
        setState({
          name: "",
          email: "",
          password: "",
          cpf: "",
          cep: "",
        });
        navigate("/otp");
      } else {
        setError(data.message || "Erro ao realizar o cadastro.");
      }
    } catch (error) {
      setError("Ocorreu um erro ao tentar se cadastrar.");
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit} className="sign-up-form">
        <h1>Crie sua conta</h1>
        <div className="social-container">
          <a href="//shopplus-frontend" className="social">
            <img
              src={require("../utils/pesquisa.png")}
              alt="Google"
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
              }}
            />
          </a>
          <a href="//shopplus-frontend" className="social">
            <img
              src={require("../utils/facebook.png")}
              alt="Facebook"
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
              }}
            />
          </a>
          <a href="//shopplus-frontend" className="social">
            <img
              src={require("../utils/linkedin.png")}
              alt="LinkedIn"
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
              }}
            />
          </a>
        </div>
        <span>ou cadastre-se com seu e-mail</span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Nome"
        />
        <input
          type="text"
          name="cpf"
          value={state.cpf}
          onChange={handleChange}
          placeholder="CPF"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Senha"
        />
        <div className="cep-container">
          <input
            type="text"
            name="cep"
            value={state.cep}
            onChange={handleChange}
            placeholder="CEP"
          />
          <a
            href="https://buscacep.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="find-cep-link"
          >
            Não sabe o CEP? Clique aqui
          </a>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? (
          <p>Enviando...</p>
        ) : (
          <>
            <button type="submit">Inscrever-se</button>
            {otpSent && (
              <p style={{ color: "green" }}>
                Código enviado! Redirecionando...
              </p>
            )}
          </>
        )}
      </form>
    </div>
  );
}

export default SignUpForm;
