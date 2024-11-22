import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams(); // Pega o ID do produto na URL
  const { addToCart } = useContext(ShopContext); // Função de adicionar ao carrinho
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState(""); // Para selecionar o tamanho de roupas
  const [relatedProducts, setRelatedProducts] = useState([]); // Produtos relacionados

  const fetchProductData = async () => {
    // Fetch dos dados do produto
    const response = await fetch(`http://localhost:8080/api/produtos/${productId}`);
    const data = await response.json();
    setProductData(data);
    console.log("Dados do produto:", data); // Verifique a estrutura aqui
    setImage(data.foto); // Atribuir a foto do produto
  };
  

  const fetchRelatedProducts = async () => {
    // Fetch de produtos relacionados (adapte a URL conforme necessário)
    const response = await fetch(`http://localhost:8080/api/produtos`);
    const data = await response.json();
    setRelatedProducts(data);
  };

  useEffect(() => {
    fetchProductData();
    fetchRelatedProducts();
  }, [productId]); // Carregar novamente se o ID do produto mudar

  if (!productData) {
    return <div className="text-center mt-10">Carregando...</div>; // Exibir enquanto os dados não são carregados
  }

  const isClothing = productData.categoria === "Roupas"; // Verificar se é um produto de roupa

  return (
    <div className="border-t-2 pt-10">
      <div className="flex gap-12">
        {/* Imagens do produto */}
        <div className="flex flex-1 gap-2">
          <div className="flex flex-col w-[19%]">
            <img className="w-full mb-2 cursor-pointer" src={productData.foto} alt={productData.nome} />
          </div>
          <div className="w-[80%]">
            <img className="w-full h-auto" src={image} alt="Produto principal" />
          </div>
        </div>

        {/* Detalhes do produto */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl">{productData.nome}</h1>
          <div className="flex items-center gap-1">
            <img src={assets.star_icon} alt="Estrela" className="w-3.5" />
            <img src={assets.star_icon} alt="Estrela" className="w-3.5" />
            <img src={assets.star_icon} alt="Estrela" className="w-3.5" />
            <img src={assets.star_icon} alt="Estrela" className="w-3.5" />
            <p className="pl-2">(123)</p> {/* Número de avaliações */}
          </div>
          <p className="mt-1 text-3xl font-medium">{productData.currency}{productData.preco}</p>

          {/* Se o produto for roupa, permite a seleção de tamanho */}
          {isClothing && (
            <div className="flex flex-col gap-3 my-4">
              <p className="text-lg font-medium">Selecione o tamanho</p>
              <div className="flex gap-2">
                {["P", "M", "G"].map((item) => (
                  <button
                    onClick={() => setSize(item)}
                    className={`border py-2 px-2 bg-white text-black rounded-md text-sm ${item === size ? "border-orange-500" : "border-gray-300"}`}
                    key={item}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Botão de adicionar ao carrinho */}
          <button
            onClick={() => {
              console.log("Produto adicionado ao carrinho:", productData._id, size);  // Se a chave for _id
              addToCart(productData._id, size);  // Usar _id se for esse o nome correto
            }}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 mt-4"
          >
            ADICIONAR AO CARRINHO
          </button>
        </div>
      </div>

      {/* Produtos relacionados */}
      <div className="my-14">
        <div className="font-medium text-3xl text-center mt-10">
          <Title text1="RELACIONADOS" text2="PRODUTOS" />
        </div>
        <div className="my-3">
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </div>
  );
};

export default Product;
