import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask"; // Importando o InputMask

function AuthMobile() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre Login e Cadastro
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cep, setCep] = useState("");
  const [error, setError] = useState(null);

  // Função para verificar o token no localStorage
  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  };

  useEffect(() => {
    checkToken();
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, [navigate]);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://shopplus.ddns.net/api/auth/cliente", {
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
      localStorage.setItem("email", email);

      alert("Login bem-sucedido!");
      navigate("/home");

      setEmail("");
      setPassword("");
      setError(null);
    } catch (error) {
      setError("Credenciais inválidas, tente novamente.");
    }
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    if (!nome || !cpf || !email || !password || !cep) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const response = await fetch("https://shopplus.ddns.net/api/auth/cliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, cpf, email, password, cep }),
      });

      if (!response.ok) {
        throw new Error("Falha ao criar conta");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", email);

      alert("Cadastro bem-sucedido!");
      navigate("/home");

      setNome("");
      setCpf("");
      setEmail("");
      setPassword("");
      setCep("");
      setError(null);
    } catch (error) {
      setError("Erro ao criar conta, tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white rounded-3xl shadow-2xl p-12 w-[95%] md:w-[85%] lg:w-[70%] xl:w-[50%]">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            <img src="https://i.imgur.com/sHaP0ka.png" alt="logo" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-800">
            {isLogin ? "Entre na sua conta" : "Crie sua conta"}
          </h1>
        </div>

        {/* Formulário de Login ou Cadastro */}
        <form onSubmit={isLogin ? handleSubmitLogin : handleSubmitSignUp} className="space-y-6">
          {!isLogin && (
            <div>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome"
                className="w-full px-5 py-4 bg-gray-50 rounded-lg shadow-sm text-gray-800 border border-gray-300 focus:ring focus:ring-purple-500 focus:outline-none text-lg"
              />
            </div>
          )}
          {!isLogin && (
            <div>
              <InputMask
                mask="999.999.999-99"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type="text"
                    placeholder="CPF"
                    className="w-full px-5 py-4 bg-gray-50 rounded-lg shadow-sm text-gray-800 border border-gray-300 focus:ring focus:ring-purple-500 focus:outline-none text-lg"
                  />
                )}
              </InputMask>
            </div>
          )}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-5 py-4 bg-gray-50 rounded-lg shadow-sm text-gray-800 border border-gray-300 focus:ring focus:ring-purple-500 focus:outline-none text-lg"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="w-full px-5 py-4 bg-gray-50 rounded-lg shadow-sm text-gray-800 border border-gray-300 focus:ring focus:ring-purple-500 focus:outline-none text-lg"
            />
          </div>
          {!isLogin && (
            <div>
              <InputMask
                mask="99999-999"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type="text"
                    placeholder="CEP"
                    className="w-full px-5 py-4 bg-gray-50 rounded-lg shadow-sm text-gray-800 border border-gray-300 focus:ring focus:ring-purple-500 focus:outline-none text-lg"
                  />
                )}
              </InputMask>
            </div>
          )}

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-lg shadow-lg font-medium hover:opacity-90 transition text-lg"
          >
            {isLogin ? "Entrar" : "Criar Conta"}
          </button>
        </form>

        {/* Alternar entre login e cadastro */}
        <div className="mt-8 text-center text-lg">
          {isLogin ? (
            <span>
              Não tem uma conta?{" "}
              <a
                onClick={() => setIsLogin(false)}
                className="text-purple-600 hover:underline font-semibold cursor-pointer"
              >
                Cadastre-se
              </a>
            </span>
          ) : (
            <span>
              Já tem uma conta?{" "}
              <a
                onClick={() => setIsLogin(true)}
                className="text-purple-600 hover:underline font-semibold cursor-pointer"
              >
                Faça login
              </a>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthMobile;
