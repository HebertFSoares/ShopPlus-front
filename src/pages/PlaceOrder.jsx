import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CartTotal from '../components/CartTotal';
import QRCode from 'react-qr-code';

const PlaceOrder = () => {
  const { state } = useLocation();
  const { produtos, total, pedidoId, email } = state || {};

  const [method, setMethod] = useState('cod');
  const [payerEmail, setPayerEmail] = useState(email || '');
  const [orderId, setOrderId] = useState('');
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });
  const [qrCodeData, setQrCodeData] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const formatCurrency = (value) => `R$ ${value.toFixed(2).replace('.', ',')}`;

  useEffect(() => {
    if (!produtos || produtos.length === 0) {
      alert('Nenhum produto encontrado no pedido.');
    }
    if (pedidoId) {
      setOrderId(pedidoId);
    }

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Você precisa estar logado para finalizar a compra.');
          return;
        }

        const response = await fetch('https://shopplus.ddns.net/api/cliente', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            address: data.address || '',
            city: data.city || '',
            state: data.state || '',
            zipcode: data.zipcode || '',
            country: data.country || '',
            phone: data.phone || '',
          });

          setPayerEmail(data.email || '');
        } else {
          alert('Erro ao buscar dados do cliente.');
        }
      } catch (error) {
        alert('Houve um erro ao carregar os dados do cliente.');
      }
    };

    fetchUserData();
  }, [produtos, pedidoId]);

  const handlePlaceOrder = async () => {
    if (!orderId) {
      alert('Pedido inválido!');
      return;
    }

    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(orderId);
    if (!isValidObjectId) {
      alert('ID do pedido inválido.');
      return;
    }

    setLoading(true);

    if (method === 'pix') {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Você precisa estar logado para finalizar a compra.');
          return;
        }

        const requestBody = {
          pedidoId: orderId,
          payerEmail: payerEmail,
        };

        const response = await fetch('https://shopplus.ddns.net/api/pagamento/pix', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        });

        const responseData = await response.json();

        if (response.ok) {
          setQrCodeData(responseData.paymentData.point_of_interaction.transaction_data.qr_code);
          setShowModal(true);
        } else {
          alert('Houve um erro ao processar o pagamento. Tente novamente mais tarde.');
        }
      } catch (error) {
        alert('Houve um erro inesperado. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="pt-24 px-4 lg:px-20 min-h-screen">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          <span className="text-purple-600">FINALIZE</span> SEU PEDIDO
        </h1>
        <p className="text-gray-600 mt-2">Escolha o método de pagamento e forneça suas informações de entrega.</p>
        <div className="mt-4 border-t-2 border-purple-600 w-16 mx-auto"></div>
      </div>

      {/* Layout principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Coluna: Informações de Entrega */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">
            <span className="text-purple-600">INFORMAÇÕES</span> DA ENTREGA
            <div className="border-t-2 border-purple-600 w-16"></div>
          </h1>
          {/* Inputs de entrega omitidos para brevidade */}
        </div>

        {/* Coluna: Resumo do Pedido */}
        <div className="space-y-6">
          <CartTotal total={total} />
          <h1 className="text-base font-bold text-gray-800">
            <span className="text-purple-600">MÉTODOS</span> DE PAGAMENTO
            <div className="border-t-2 border-purple-600 w-16"></div>
          </h1>
          <div className="space-y-4">
            {/* Pagamento via PIX */}
            <div
              onClick={() => setMethod('pix')}
              className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer ${
                method === 'pix' ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
              }`}
            >
              <img src="https://img.icons8.com/color/48/pix.png" alt="PIX" className="w-6 h-6" />
              <p className="text-gray-700 font-medium">PIX</p>
            </div>

            {/* Pagamento via Cartão de Crédito */}
            <div
              onClick={() => setMethod('creditCard')}
              className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer ${
                method === 'creditCard' ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
              }`}
            >
              <img src="https://i.imgur.com/iQluR7W.png" alt="Cartão de Crédito" className="w-6 h-6" />
              <p className="text-gray-700 font-medium">Cartão de Crédito</p>
            </div>
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium transition ${
              loading
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {loading ? (
              <div className="flex justify-center items-center space-x-2">
                <div className="w-5 h-5 border-4 border-t-4 border-white rounded-full animate-spin"></div>
                <span>Processando...</span>
              </div>
            ) : (
              'FINALIZAR PEDIDO'
            )}
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">Pagamento Pendente</h2>
            <div className="flex flex-col items-center">
              <QRCode value={qrCodeData} size={256} className="mb-6" />
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate('/'); // Redireciona para a página inicial
                }}
                className="bg-purple-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-purple-700 transition"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
