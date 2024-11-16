import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  // Importando o Router e as Routes

import App from "./components/App";
import OtpVerification from "./components/Otp";  // Importando o componente OTP

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <Router>  {/* Envolvendo a aplicação com o Router */}
      <Routes>  {/* Definindo as rotas */}
        <Route path="/" element={<App />} />  {/* Rota para a página inicial (SignUp ou SignIn) */}
        <Route path="/otp" element={<OtpVerification />} />  {/* Rota para a página de verificação do código */}
      </Routes>
    </Router>
  </React.StrictMode>,
  rootElement
);
