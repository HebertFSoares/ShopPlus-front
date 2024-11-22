import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const [collectionItems, setCollectionItems] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
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

  // Função para aplicar filtros
  const applyFilter = () => {
    let productCopy = [...collectionItems];

    if (category.length > 0)
      productCopy = productCopy.filter((item) => category.includes(item.category));

    if (subCategory.length > 0)
      productCopy = productCopy.filter((item) => subCategory.includes(item.subCategory));

    if (showSearch && search)
      productCopy = productCopy.filter((item) => item.name.toLowerCase().includes(search));

    setCollectionItems(productCopy);
  };

  // Função para ordenar os produtos
  const sortProduct = () => {
    let fpCopy = collectionItems.slice(); // Cria uma cópia da lista de produtos
    switch (sortType) {
      case 'low-high':
        setCollectionItems(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setCollectionItems(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
    }
  };

  // Efeitos colaterais
  useEffect(() => {
    fetchProducts(); // Faz a requisição para buscar os produtos ao carregar o componente
  }, []);

  useEffect(() => {
    applyFilter(); // Aplica os filtros sempre que as categorias ou o termo de busca mudarem
  }, [category, subCategory, search, showSearch]);

  useEffect(() => {
    sortProduct(); // Ordena os produtos sempre que o tipo de ordenação mudar
  }, [sortType]);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prevState) =>
      prevState.includes(value)
        ? prevState.filter((cat) => cat !== value)
        : [...prevState, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prevState) =>
      prevState.includes(value)
        ? prevState.filter((subCat) => subCat !== value)
        : [...prevState, value]
    );
  };

  return (
    <div className="flex gap-28 pt-10 border-t">
      {/* Filtros */}
      <div className="w-16"> {/* Diminuí a largura para 1/6 para ficar mais fino e encolhido à direita */}
        <p className="text-xl font-semibold mb-4">Filtros</p>
        <div className="border-b pb-4 mb-6">
          <p className="text-sm font-medium mb-2">Categorias</p>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                value="Eletronicos"
                onChange={toggleCategory}
                className="mr-2"
              />
              <span className="text-sm">Eletrônicos</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                value="Roupas"
                onChange={toggleCategory}
                className="mr-2"
              />
              <span className="text-sm">Roupas</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                value="Outros"
                onChange={toggleCategory}
                className="mr-2"
              />
              <span className="text-sm">Outros</span>
            </div>
          </div>
        </div>
      </div>

      {/* Produtos */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <Title text1={"Todos"} text2={"Produtos"} />
        </div>

        {/* Exibe mensagem de erro ou carregamento */}
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {collectionItems.map((item) => (
              <ProductItem key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
