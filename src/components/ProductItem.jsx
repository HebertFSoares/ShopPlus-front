import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ item }) => {
  const { _id, nome, preco, foto } = item; // Use 'nome' e 'preco' do backend
  const { currency } = useContext(ShopContext);

  // Verifique se a foto existe, se não, use uma imagem padrão
  const imageUrl = foto ? foto : '/path/to/default-image.jpg'; // Imagem padrão se não houver foto

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${_id}`}>
      <div className="overflow-hidden">
      <img
        className="hover:scale-110 transition ease-in-out"
        src={imageUrl}
        alt={nome}
        loading="lazy"
      />
      </div>
      <p className="pt-3 pb-1 text-sm">{nome}</p> {/* Exibir o nome */}
      <p className="text-sm font-medium">{currency}{preco}</p> {/* Exibir o preço com a moeda */}
    </Link>
  );
};

export default ProductItem;
