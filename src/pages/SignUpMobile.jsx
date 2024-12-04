import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpMobile() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: ""
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

    const { email, password, confirmPassword } = state;

    // Validação simples de senha
    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Falha no cadastro");
      }

      const data = await response.json();
      alert("Cadastro bem-sucedido!");
      console.log("Cadastro realizado com sucesso:", data);

      // Redireciona para a página de login após o cadastro
      navigate("/login"); // Ajuste o caminho de acordo com sua necessidade

      setState({
        email: "",
        password: "",
        confirmPassword: ""
      });
      setError(null);
    } catch (error) {
      setError("Erro ao cadastrar, tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-[95%] md:w-[80%] lg:w-[60%] xl:w-[40%]">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            <img src="https://i.imgur.com/sHaP0ka.png" alt="logo" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-800">Crie sua conta</h1>
          <p className="text-gray-500 text-sm">Cadastre-se para começar a usar</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleOnSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-5 py-4 bg-gray-50 rounded-lg shadow-sm text-gray-800 border border-gray-300 focus:ring focus:ring-purple-500 focus:outline-none text-lg"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              placeholder="Senha"
              className="w-full px-5 py-4 bg-gray-50 rounded-lg shadow-sm text-gray-800 border border-gray-300 focus:ring focus:ring-purple-500 focus:outline-none text-lg"
            />
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              value={state.confirmPassword}
              onChange={handleChange}
              placeholder="Confirme a Senha"
              className="w-full px-5 py-4 bg-gray-50 rounded-lg shadow-sm text-gray-800 border border-gray-300 focus:ring focus:ring-purple-500 focus:outline-none text-lg"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-lg shadow-lg font-medium hover:opacity-90 transition text-lg"
          >
            Criar Conta
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-lg">
          Já tem uma conta?{" "}
          <a href="/login" className="text-purple-600 hover:underline font-semibold">
            Faça login
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignUpMobile;
