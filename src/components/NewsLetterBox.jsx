import { useState } from 'react';

const NewsLetterBox = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // Simula uma ação de inscrição
    if (email) {
      setIsSubscribed(true);
      setEmail(''); // Limpa o campo de email

      // Restaura o estado de inscrição após 5 segundos para permitir nova inscrição
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Inscreva-se agora e ganhe 20% de desconto</p>
      <p className='mt-3 text-gray-400'>
        Desconto de ₹1.200 em compras com cartão de crédito HDFC Bank, em parcelamentos de 6 ou 9 meses, com valor mínimo de ₹15.000.
      </p>

      {isSubscribed ? (
        <p className='mt-6 text-green-600 text-lg font-semibold transition-opacity duration-700 ease-in-out'>
          🎉😀 Obrigado por se inscrever! Você receberá as últimas atualizações em breve.
        </p>
      ) : (
        <form onSubmit={onSubmitHandler} className='w-1/2 flex items-center mx-auto my-6 border pl-3 shadow-md rounded-md'>
          <input
            className='w-full outline-none py-2 px-4 text-gray-700'
            type='email'
            placeholder='Digite seu e-mail'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type='submit' className='bg-black text-white text-sm font-medium px-8 py-3 rounded-r-md transition-transform hover:scale-105'>
            INSCREVER-SE
          </button>
        </form>
      )}
    </div>
  );
};

export default NewsLetterBox;
