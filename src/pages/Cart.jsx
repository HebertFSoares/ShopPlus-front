import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  const navigate = useNavigate();
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
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

  // Calcula o valor total do carrinho
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
    // Defina uma taxa fixa de envio ou calcule conforme necessário
    return 10; // Exemplo de taxa de envio
  };

  const calculateTotal = () => {
    const subTotal = calculateSubTotal();
    const shippingFee = calculateShippingFee();
    return subTotal + shippingFee;
  };

  // Função para finalizar a compra e chamar a API
  const handleFinalizePurchase = async () => {
    try {
      // Recupera o token JWT do localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Você precisa estar logado para finalizar a compra.');
        return;
      }
  
      // Decodifica o token para obter o clienteId (se necessário)
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodifica o JWT
      const clienteId = decodedToken.id; // Supondo que o clienteId esteja no payload do token
  
      // Monta o corpo da requisição com base nos dados do carrinho
      const produtos = cartData.map(item => ({
        produtoId: item._id,
        quantidade: item.quantity,
      }));
  
      const requestBody = {
        clienteId,
        produtos,
      };
  
      // Envia a requisição para a API com o token no cabeçalho Authorization
      const response = await fetch('http://localhost:8080/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Envia o token JWT no cabeçalho da requisição
        },
        body: JSON.stringify(requestBody),
      });
  
      // Verifica se a requisição foi bem-sucedida
      if (response.ok) {
        const data = await response.json();
        console.log('Pedido realizado com sucesso:', data);
  
        // Recupera o e-mail do usuário do localStorage
        const userEmail = localStorage.getItem('userEmail'); // Recupera o e-mail do usuário do localStorage
  
        // Exemplo de redirecionamento, passando o _id do pedido e o e-mail
        navigate('/place-order', {
          state: {
            pedidoId: data.pedido._id, // Passa o _id do pedido
            produtos,
            total: calculateTotal(),
            email: userEmail, // Passa o e-mail
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
  

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div>
        {cartData.map((item) => {
          const productData = products.find((i) => i._id === item._id); // Encontra o produto
          if (!productData) return null; // Se o produto não for encontrado, não renderiza o item

          // Verifica se a URL da foto é válida
          const productImage = productData.foto ? productData.foto : 'default-image.jpg'; // Usa uma imagem padrão caso não tenha foto

          return (
            <div key={item._id + item.size} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
              <div className="flex items-start gap-6">
                <img className="w-20" src={productImage} alt={productData.nome} />
                <div>
                  <p className="text-lg font-medium">{productData.nome}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>{currency}{productData.preco}</p>
                    <p className="px-3 py-1 border bg-slate-50">{item.size}</p>
                  </div>
                </div>
              </div>
              <input
                type="number"
                value={item.quantity} // Utiliza o value controlado
                onChange={(e) => e.target.value === '' || e.target.value === '0' ? updateQuantity(item._id, item.size, 0) : updateQuantity(item._id, item.size, Number(e.target.value))}
                className="border w-14 px-2 py-1"
                min={1}
              />
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                src={assets.bin_icon}
                className="cursor-pointer w-5 mr-4"
                alt="Remover"
              />
            </div>
          );
        })}
        <div className="flex justify-end my-20">
          <div className="w-[450px]">
            <div className="flex justify-between text-xl font-medium">
              <span>SubTotal</span>
              <span>{currency}{calculateSubTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-medium mt-4">
              <span>Shipping Fee</span>
              <span>{currency}{calculateShippingFee().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-medium mt-4">
              <span>Total</span>
              <span>{currency}{calculateTotal().toFixed(2)}</span>
            </div>
            {/* O botão agora está isolado e não afeta o layout do Total */}
            <div className="w-full text-end mt-8">
              {/* Chama a função handleFinalizePurchase ao clicar */}
              <button
                onClick={handleFinalizePurchase}
                className="bg-black text-white text-sm px-8 py-3 rounded-full hover:bg-gray-800 transition duration-200 ease-in-out"
              >
                FINALIZE PURCHASE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
