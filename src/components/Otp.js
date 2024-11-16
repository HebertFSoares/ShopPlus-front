import React, { useState, useEffect } from 'react';
import '../styles/OtpVerification.css';

const CodeVerification = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [timer, setTimer] = useState(30);
  const [email, setEmail] = useState('');

  // Recuperando o e-mail do localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleCodeChange = (e, index) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 1) value = value[0];

    setCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = value;
      return newCode;
    });

    if (value && index < code.length - 1) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  // Função para enviar o código para o backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredCode = code.join('');

    try {
      // Fazendo o fetch para o backend
      const response = await fetch('http://localhost:8080/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: enteredCode,
        }),
      });

      const data = await response.json();
      if (data.status === 200 || response.status === 201) {
        alert('Código verificado com sucesso!');
        // Redirecionar ou realizar ações após a verificação bem-sucedida
      } else {
        alert('Código inválido. Tente novamente.');
      }
  } catch (error) {
    console.error('Erro ao verificar o código', error);
    alert('Ocorreu um erro. Tente novamente.');
  }
};

  const handleResendCode = () => {
    setTimer(30);
    setIsResendEnabled(false);
    console.log('Reenviando código...');
  };

  useEffect(() => {
    if (timer === 0) {
      setIsResendEnabled(true);
      return;
    }
    const intervalId = setInterval(() => {
      if (timer > 0) setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timer]);

  const handlePaste = (e) => {
    const pastedCode = e.clipboardData.getData('Text').replace(/\D/g, '');
    if (pastedCode.length === 6) {
      setCode(pastedCode.split(''));
    }
  };

  return (
    <div className="code-verification-container">
      <form onSubmit={handleSubmit} className="verification-form">
        <h1 className="form-title">Verificação de Código</h1>
        <p className="form-description">
          Enviamos um código para o seu e-mail ({email}). Insira-o abaixo para continuar.
        </p>

        <div className="code-input-container">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleCodeChange(e, index)}
              className="code-input"
              placeholder="—"
              onPaste={handlePaste}
            />
          ))}
        </div>

        <button type="submit" className="submit-button">
          Confirmar Código
        </button>

        <div className="resend-container">
          <a
            href="/"
            className={`resend-link ${isResendEnabled ? '' : 'disabled'}`}
            onClick={(e) => {
              e.preventDefault();
              if (isResendEnabled) handleResendCode();
            }}
          >
            {isResendEnabled
              ? 'Reenviar Código'
              : `Reenvio disponível em 00:${timer < 10 ? `0${timer}` : timer}`}
          </a>
        </div>
      </form>
    </div>
  );
};

export default CodeVerification;
