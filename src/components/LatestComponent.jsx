import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom"; // Importando Link do react-router-dom

const LatestComponent = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/produtos");
        const data = await response.json();

        if (response.ok) {
          setLatestProducts(data.slice(0, 8)); // Pega os 8 últimos produtos
        } else {
          console.error("Erro ao buscar produtos:", data.message);
        }
      } catch (error) {
        console.error("Erro ao fazer a requisição:", error);
      }
    };

    fetchLatestProducts();
  }, []);

  return (
    <div className="my-12 px-4 md:px-8">
      {/* Título e descrição */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          <span className="text-purple-600">ÚLTIMOS</span> LANÇAMENTOS
        </h2>
        <p className="mt-2 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
          Descubra nossa seleção de produtos mais recentes, perfeitos para
          qualquer ocasião. Não perca as novidades que acabaram de chegar!
        </p>
        <div className="mt-4 border-t-2 border-purple-600 w-16 mx-auto"></div>
      </div>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4">
        {latestProducts.map((item) => (
          <Link
            key={item._id} // Utilizando o _id como key para o Link
            to={`/product/${item._id}`} // Rota para a página do produto
            className="bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out"
          >
            <img
              src={item.foto}
              alt={item.nome}
              className="w-full h-56 sm:h-64 md:h-80 lg:h-96 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-base sm:text-lg font-medium text-gray-800 truncate">
                {item.nome}
              </h3>
              <p className="text-sm sm:text-base text-gray-500 mb-2">
                {item.categoria}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-gray-900">
                  R$ {item.preco.toFixed(2)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestComponent;
