import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ item }) => {
  const { _id, nome, preco, foto } = item; // Use 'nome' e 'preco' do backend
  const { currency } = useContext(ShopContext);

  // Verifique se a foto existe, se não, use uma imagem padrão
  const imageUrl = foto ? foto : '/path/to/default-image.jpg'; // Imagem padrão se não houver foto

  return (
    <Link className="group block text-gray-700 cursor-pointer" to={`/product/${_id}`}>
      {/* Card do Produto - Aumentado no eixo Y (altura maior) */}
      <div className="rounded-lg overflow-hidden shadow-md transition-transform group-hover:scale-105 group-hover:shadow-xl h-[460px] flex flex-col">
        {/* Imagem do Produto - Garantindo que a imagem ocupe 100% de largura e com altura aumentada */}
        <img
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
          src={imageUrl}
          alt={nome}
          loading="lazy"
        />
        {/* Conteúdo dentro do card */}
        <div className="px-4 py-3 flex flex-col justify-between flex-grow">
          {/* Nome do Produto */}
          <p className="text-sm font-semibold text-gray-800 text-center">{nome}</p>
          {/* Preço do Produto */}
          <p className="text-sm font-medium text-purple-600 text-center">{currency}{preco}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
