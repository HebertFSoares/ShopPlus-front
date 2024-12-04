import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  const fetchProductData = async () => {
    const response = await fetch(`http://localhost:8080/api/produtos/${productId}`);
    const data = await response.json();
    setProductData(data);
    setImage(data.foto);
  };

  const fetchRelatedProducts = async () => {
    const response = await fetch(`http://localhost:8080/api/produtos`);
    const data = await response.json();
    setRelatedProducts(data);
  };

  useEffect(() => {
    fetchProductData();
    fetchRelatedProducts();
  }, [productId]);

  if (!productData) {
    return <div className="text-center mt-10 text-lg font-medium">Carregando...</div>;
  }

  const isClothing = productData.categoria === "Roupas";

  return (
    <div className="pt-20 px-4 md:px-8">
      {/* Conteúdo principal */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-12">
        {/* Imagens */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-[40%]">
          <div className="flex flex-col w-[30%] md:w-[25%]">
            <img
              className="w-full mb-4 cursor-pointer border rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              src={productData.foto}
              alt={productData.nome}
              onClick={() => setImage(productData.foto)}
            />
          </div>
          <div className="w-full md:w-[75%]">
            <img className="w-full h-auto rounded-lg shadow-xl" src={image} alt="Produto principal" />
          </div>
        </div>

        {/* Detalhes */}
        <div className="flex-1 w-full md:w-[60%]">
          <h1 className="font-extrabold text-2xl md:text-3xl mb-3 text-gray-800">{productData.nome}</h1>
          <div className="flex items-center gap-2 mb-6">
            {Array(4).fill().map((_, i) => (
              <img key={i} src={assets.star_icon} alt="Estrela" className="w-5" />
            ))}
            <p className="text-sm text-gray-600">(123 avaliações)</p>
          </div>

          {/* Preço formatado */}
          <p className="text-3xl md:text-4xl font-semibold text-green-600">
            R$ {productData.preco.toFixed(2).replace('.', ',')}
          </p>

          {isClothing && (
            <div className="mt-6">
              <p className="text-lg font-semibold text-gray-800 mb-4">Selecione o tamanho:</p>
              <div className="flex gap-4">
                {["P", "M", "G"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setSize(item)}
                    className={`py-2 px-4 sm:py-3 sm:px-6 border rounded-lg text-sm font-medium transition-colors duration-300 ${
                      size === item
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-white text-gray-800 border-gray-300 hover:bg-purple-50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => addToCart(productData._id, size)}
            className="mt-8 w-full bg-purple-600 text-white py-4 rounded-md text-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            ADICIONAR AO CARRINHO
          </button>
        </div>
      </div>

      <div className="my-14">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          <span className="text-purple-600">MAIS</span> PRODUTOS
        </h2>
        <div className="mt-4 border-t-2 border-purple-600 w-16 mx-auto"></div>
      </div>
  
  {/* Grid de Produtos Relacionados */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4">
    {relatedProducts.map((item) => (
      <div
        key={item._id}
        className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out"
      >
        <img
          src={item.foto}
          alt={item.nome}
          className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover"
        />
        <div className="p-4">
          <h3 className="text-sm sm:text-base font-medium text-gray-800 truncate">{item.nome}</h3>
          <p className="text-sm sm:text-base text-gray-500 mb-2">{item.categoria}</p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-900">
              R$ {item.preco.toFixed(2).replace('.', ',')}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default Product;
