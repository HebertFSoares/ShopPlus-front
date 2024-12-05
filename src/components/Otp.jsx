import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CodeVerification = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [timer, setTimer] = useState(30);
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Para redirecionar

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
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredCode = code.join('');

    try {
      const response = await fetch('https://shopplus.ddns.net/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: enteredCode }),
      });

      const data = await response.json();
      if (data.status === 200 || response.status === 201) {
        alert('Código verificado com sucesso!');
        // Redireciona para a tela de login após sucesso
        navigate('/login');
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
    <div
      className="min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12"
      style={{
        background: 'linear-gradient(135deg, #e6d9f7, #d0b3e0)',
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 sm:p-14 lg:p-20 xl:p-24 rounded-3xl shadow-xl max-w-lg w-full text-center"
        style={{ boxShadow: '0 10px 50px rgba(0, 0, 0, 0.1)' }}
      >
        <h1 className="text-3xl sm:text-4xl font-semibold text-purple-700 mb-6">Verificação de Código</h1>
        <p className="text-base sm:text-lg text-gray-600 mb-8">
          Enviamos um código para o seu e-mail (<span className="text-purple-700">{email}</span>).
          Insira-o abaixo para continuar.
        </p>

        {/* Container de inputs com responsividade */}
        <div className="flex justify-center mb-8 space-x-2 max-w-full">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleCodeChange(e, index)}
              className="w-12 sm:w-16 md:w-16 h-16 text-2xl sm:text-3xl text-center border-2 border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:border-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105"
              placeholder="—"
              onPaste={handlePaste}
            />
          ))}
        </div>

        <button
          type="submit"
          className="bg-purple-700 text-white py-3 px-10 rounded-full text-lg sm:text-xl font-semibold hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
        >
          Confirmar Código
        </button>

        <div className="mt-10">
          <a
            href="/"
            className={`text-lg sm:text-xl ${isResendEnabled ? 'text-purple-700 hover:text-purple-800' : 'text-gray-500 cursor-not-allowed'} transition-all duration-300 ease-in-out`}
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
