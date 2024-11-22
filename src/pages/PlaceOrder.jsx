import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Para acessar o estado passado via navegação
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';

const PlaceOrder = () => {
  const { state } = useLocation(); // Obtém o estado passado na navegação
  const { produtos, total, pedidoId, email } = state || {}; // Desestruturar os dados do pedido (produtos e total)

  const [method, setMethod] = useState('cod');
  const [payerEmail, setPayerEmail] = useState('');
  const [orderId, setOrderId] = useState('');

  // Função para formatar valores em reais (R$)
  const formatCurrency = (value) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  useEffect(() => {
    if (!produtos || produtos.length === 0) {
      // Caso não haja dados ou produtos, redirecionar ou exibir um alerta
      alert('Nenhum produto encontrado no pedido.');
    }
    
    // Log para verificar quais dados chegaram na navegação
    console.log("Estado passado para PlaceOrder:", state);

    if (pedidoId) {
      setOrderId(pedidoId);
    }
    if (email) {
      setPayerEmail(email);
    }
  }, [produtos, state]);

  const handlePlaceOrder = async () => {
    if (!orderId) {
      alert('Pedido inválido!');
      return;
    }

    // Verifica se o pedidoId é um ObjectId válido
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(orderId);
    if (!isValidObjectId) {
      alert('ID do pedido inválido.');
      return;
    }

    if (method === 'pix') {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Você precisa estar logado para finalizar a compra.');
          return;
        }

        const requestBody = {
          pedidoId: orderId,  // Assegura que o pedidoId seja válido
          payerEmail: payerEmail || email, // Utiliza o email passado ou o email inserido
        };

        // Log para verificar o que está sendo enviado para o backend
        console.log('Enviando os seguintes dados para o backend:', requestBody);

        const response = await fetch('http://localhost:8080/api/pagamento/pix', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Pagamento PIX realizado com sucesso:', data);
          alert('Pagamento PIX realizado com sucesso!');
        } else {
          const errorData = await response.json();
          console.error('Erro ao realizar o pagamento:', errorData);
          alert('Houve um erro ao processar o pagamento. Tente novamente mais tarde.');
        }
      } catch (error) {
        console.error('Erro ao enviar a requisição:', error);
        alert('Houve um erro inesperado. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className='flex flex-row justify-between gap-4 pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-[480px]'>
        <div className='text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input
            type="text"
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder='First Name'
          />
          <input
            type="text"
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder='Last Name'
          />
        </div>
        <input
          type="email"
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          placeholder='Email Address'
          value={payerEmail}
          onChange={(e) => setPayerEmail(e.target.value)}
        />
        <input
          type="text"
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          placeholder='Street'
        />
        <div className='flex gap-3'>
          <input
            type="text"
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder='City'
          />
          <input
            type="text"
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder='State'
          />
        </div>
        <div className='flex gap-3'>
          <input
            type="text"
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder='Zipcode'
          />
          <input
            type="number"
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            placeholder='Country'
          />
        </div>
        <input
          type="number"
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          placeholder='Phone'
        />
      </div>

      {/* Cart Total Section */}
      <div className='mt-8'>
        <div className='mt-8 min-w-8'>
          <CartTotal />
        </div>
        <div className='mt-8'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex gap-3'>
            {/* PIX Method */}
            <div
              onClick={() => setMethod('pix')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === 'pix' ? 'bg-green-400' : ''}`}
              ></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>PIX</p>
            </div>
            {/* Credit Card Method */}
            <div
              onClick={() => setMethod('creditCard')}
              className='flex items-center gap-3 border p-2 px-3 cursor-pointer'
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === 'creditCard' ? 'bg-green-400' : ''}`}
              ></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CREDIT CARD</p>
            </div>
          </div>
          <div className='w-full mt-8 text-end'>
            <button
              onClick={handlePlaceOrder}
              className='bg-black text-white px-16 py-3 text-sm'
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>

      {/* Exibir os produtos no pedido e o total */}
      <div className="mt-4">
        <h2>Order Details:</h2>
        {produtos && produtos.length > 0 ? (
          <ul>
            {produtos.map((produto, index) => (
              <li key={index}>
                Produto ID: {produto.produtoId}, Quantidade: {produto.quantidade}
              </li>
            ))}
          </ul>
        ) : (
          <p>No products found in the order.</p>
        )}
        <p><strong>Total: {formatCurrency(total)}</strong></p>
      </div>
    </div>
  );
};

export default PlaceOrder;
