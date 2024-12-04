import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const { products, currency, cartItems, updateQuantity, addToCart } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const i in cartItems) {
      for (const j in cartItems[i]) {
        if (cartItems[i][j] > 0) {
          tempData.push({
            _id: i,
            size: j,
            quantity: cartItems[i][j],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const calculateSubTotal = () => {
    let subTotal = 0;
    cartData.forEach((item) => {
      const product = products.find((product) => product._id === item._id);
      if (product) {
        subTotal += product.preco * item.quantity;
      }
    });
    return subTotal;
  };

  const calculateShippingFee = () => {
    return 10; // Exemplo de taxa de envio
  };

  const calculateTotal = () => {
    const subTotal = calculateSubTotal();
    const shippingFee = calculateShippingFee();
    return subTotal + shippingFee;
  };

  const handleFinalizePurchase = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Você precisa estar logado para finalizar a compra.');
        return;
      }
  
      const decodedToken = JSON.parse(atob(token.split('.')[1])); 
      const clienteId = decodedToken.id; 
  
      const produtos = cartData.map(item => ({
        produtoId: item._id,
        quantidade: item.quantity,
      }));
  
      const requestBody = {
        clienteId,
        produtos,
      };
  
      const response = await fetch('http://localhost:8080/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Pedido realizado com sucesso:', data);
  
        const userEmail = localStorage.getItem('userEmail');
  
        navigate('/place-order', {
          state: {
            pedidoId: data.pedido._id,
            produtos,
            total: calculateTotal(),
            email: userEmail,
          },
        });
      } else {
        const errorData = await response.json();
        console.error('Erro ao realizar pedido:', errorData);
        alert('Houve um erro ao processar seu pedido. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro ao enviar a requisição:', error);
      alert('Houve um erro inesperado. Tente novamente mais tarde.');
    }
  };

  // Função para adicionar um produto ao carrinho
  const handleAddToCart = (productId) => {
    addToCart(productId, 1);  // Adiciona o produto com quantidade 1
  };

  return (
    <div className="pt-20 px-4">
      <div className="text-wrap mb-1">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          <span className="text-purple-600">SEU</span> CARRINHO
        </h2>
        <div className="mt-4 border-t-2 border-purple-600 w-16 mx-auto"></div>
      </div>

      {/* Layout com duas colunas ajustadas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Listagem dos produtos - ocupando mais espaço */}
        <div className="md:col-span-2 space-y-6">
          {cartData.map((item) => {
            const productData = products.find((i) => i._id === item._id);
            if (!productData) return null;

            const productImage = productData.foto ? productData.foto : 'default-image.jpg';

            return (
              <div key={item._id + item.size} className="flex items-center justify-between py-4 border-b">
                <div className="flex items-center gap-4">
                  <img className="w-20 h-20 object-cover" src={productImage} alt={productData.nome} />
                  <div>
                    <p className="text-lg sm:text-xl font-medium">{productData.nome}</p>
                    <div className="flex gap-4 mt-2 items-center">
                      <p className="text-sm sm:text-lg">{currency}{productData.preco}</p>
                      <p className="px-3 py-1 border bg-slate-50 text-sm">{item.size}</p>
                    </div>
                  </div>
                </div>

                {/* Quantidade */}
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => e.target.value === '' || e.target.value === '0' ? updateQuantity(item._id, item.size, 0) : updateQuantity(item._id, item.size, Number(e.target.value))}
                  className="border w-14 px-2 py-1"
                  min={1}
                />

                {/* Lixeira */}
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  src={assets.bin_icon}
                  className="cursor-pointer w-5 ml-4"
                  alt="Remover"
                />
              </div>
            );
          })}
        </div>

        {/* Resumo da Compra - ocupando 1/3 do espaço */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <div className="space-y-4">
            <div className="flex justify-between text-lg sm:text-xl font-medium text-gray-700">
              <span>SubTotal</span>
              <span>{currency}{calculateSubTotal().toFixed(2).replace('.', ',')}</span>
            </div>

            <div className="flex justify-between text-lg sm:text-xl font-medium text-gray-700">
              <span>Taxa de Envio</span>
              <span>{currency}{calculateShippingFee().toFixed(2).replace('.', ',')}</span>
            </div>

            <div className="flex justify-between text-lg sm:text-xl font-medium text-gray-700">
              <span className="font-semibold">Total</span>
              <span className="font-semibold text-green-600">{currency}{calculateTotal().toFixed(2).replace('.', ',')}</span>
            </div>
          </div>

          {/* Botão Finalizar Compra */}
          <div className="mt-6">
            <button
              onClick={handleFinalizePurchase}
              className="w-full bg-purple-600 text-white text-lg sm:text-xl font-medium py-3 rounded-full hover:bg-purple-700 transition duration-300"
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>

      {/* Seção de Outros Produtos */}
      <div className="my-12 px-4 md:px-8">
        {/* Título e descrição */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            <span className="text-purple-600">OUTROS</span> PRODUTOS
          </h2>
          <p className="mt-2 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Descubra mais produtos que podem interessar a você. Não perca!
          </p>
          <div className="mt-4 border-t-2 border-purple-600 w-16 mx-auto"></div>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 px-1">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden transform hover:scale-95 transition duration-300 ease-in-out"
            >
              <img
                src={item.foto}
                alt={item.nome}
                className="w-full h-64 sm:h-72 object-cover rounded-t-lg"
              />
              <div className="p-6"> {/* Aumentando o padding para dar mais altura ao conteúdo */}
                <h3 className="text-base sm:text-lg font-medium text-gray-800 truncate">
                  {item.nome}
                </h3>
                <p className="text-sm sm:text-base text-gray-500 mb-2">
                  {item.categoria}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-900">
                    {currency}{item.preco.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => handleAddToCart(item._id)}
                  className="bg-purple-600 text-white text-xs sm:text-sm py-2 px-3 rounded-lg hover:bg-purple-700 transition duration-300"
                >
                  Adicionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
