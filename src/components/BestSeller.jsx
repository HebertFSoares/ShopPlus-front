import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';
import Title from './Title';

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://shopplus.ddns.net/api/produtos/oldest')
      .then((response) => response.json())
      .then((data) => {
        setBestSeller(data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
        setLoading(false);
      });
  }, []); 

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={'MAIS'} text2={'VENDIDOS'} />
        <p className="w-3/4 m-auto text-xs text-gray-600">
          Camisetas são versáteis e podem ser usadas em diversas situações, desde encontros casuais até para realizar tarefas do dia a dia. Confira a nossa coleção de camisetas!
        </p>
        <div className="grid grid-cols-5 gap-4 pt-7">
          {
            loading ? (
              <p>Carregando...</p>
            ) : (
              bestSeller.map((item) => (
                <ProductItem key={item._id} item={item} />
              ))
            )
          }
        </div>
      </div>
    </div>
  )
}

export default BestSeller;
