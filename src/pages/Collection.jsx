import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom'; // Importando Link do react-router-dom
import Title from '../components/Title';

const Collection = () => {
  const [collectionItems, setCollectionItems] = useState([]);
  const [sortType, setSortType] = useState('a');
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [error, setError] = useState(null); // Estado de erro
  const { search, showSearch } = useContext(ShopContext);

  // Função para pegar os produtos
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/produtos');
      if (!response.ok) {
        throw new Error('Erro ao buscar os produtos');
      }
      const data = await response.json();
      setCollectionItems(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Função para ordenar os produtos
  const sortProduct = () => {
    let fpCopy = collectionItems.slice(); // Cria uma cópia da lista de produtos
    switch (sortType) {
      case 'low-high':
        setCollectionItems(fpCopy.sort((a, b) => a.preco - b.preco));
        break;
      case 'high-low':
        setCollectionItems(fpCopy.sort((a, b) => b.preco - a.preco));
        break;
      default:
        setCollectionItems(fpCopy); // Caso sem ordenação, apenas mantemos a lista original
    }
  };

  // Efeitos colaterais
  useEffect(() => {
    fetchProducts(); // Faz a requisição para buscar os produtos ao carregar o componente
  }, []);

  useEffect(() => {
    sortProduct(); // Ordena os produtos sempre que o tipo de ordenação mudar
  }, [sortType]);

  return (
    <div className="py-12 bg-gray-100">
      {/* Título da página */}
      <div className="text-center mb-10">
        <Title text1="Todos" text2="Produtos" />
      </div>

      {/* Barra de Ordenação */}
      <div className="flex justify-between items-center mb-6 max-w-7xl mx-auto px-4">
        <p className="text-lg font-medium text-gray-800">Ordenar por:</p>
        <select
          onChange={(e) => setSortType(e.target.value)}
          className="px-4 py-2 border rounded-md shadow-md text-purple-600 bg-white focus:outline-none"
        >
          <option value="a">Selecione</option>
          <option value="low-high">Preço: Menor para Maior</option>
          <option value="high-low">Preço: Maior para Menor</option>
        </select>
      </div>

      {/* Exibe mensagem de erro ou carregamento */}
      {loading ? (
        <div className="text-center text-gray-500">Carregando...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-8 max-w-7xl mx-auto px-4">
          {collectionItems.map((item) => (
            <Link
              key={item._id} // Utilizando o _id como key para o Link
              to={`/product/${item._id}`} // Rota para a página do produto
              className="bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out p-6"
            >
              <img
                src={item.foto}
                alt={item.nome}
                className="w-full h-72 sm:h-80 md:h-96 lg:h-96 xl:h-96 object-cover rounded-lg"
              />
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{item.nome}</h3>
                <p className="text-sm text-gray-500 mb-2">{item.categoria}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-900">R$ {item.preco.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collection;
