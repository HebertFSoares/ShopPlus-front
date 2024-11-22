import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestComponent = () => {
  const { products } = useContext(ShopContext);  // Você pode manter o contexto, mas vai substituir isso pelo fetch.
  const [latestProducts, setLatestProduct] = useState([]);

  useEffect(() => {
    // Função para buscar os últimos produtos do backend
    const fetchLatestProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/produtos'); // Endpoint para buscar todos os produtos
        const data = await response.json();

        if (response.ok) {
          setLatestProduct(data.slice(0, 8));  // Pega os 8 últimos produtos (se necessário)
        } else {
          console.error('Erro ao buscar produtos:', data.message);
        }
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
      }
    };

    fetchLatestProducts();
  }, []);

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'ÚLTIMOS'} text2={'LANÇAMENTOS'} />
        <p className='w-3/4 m-auto text-xs text-gray-600'>
          Para momentos casuais com amigos ou familiares, as camisetas podem ser muito úteis. Confira nossa grande variedade de camisetas que atendem suas necessidades.
        </p>
      </div>
      <div className='grid grid-cols-4 gap-4'>
        {
          latestProducts.map((item) => (
            <ProductItem key={item._id} item={item} />
          ))
        }
      </div>
    </div>
  )
}

export default LatestComponent
