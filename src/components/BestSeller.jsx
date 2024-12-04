import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';
import Title from './Title';

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState([]);
  const [loading, setLoading] = useState(true);  // Adiciona um estado de loading

  useEffect(() => {
    // Realiza a requisição com fetch
    fetch('http://localhost:8080/api/produtos/oldest')
      .then((response) => response.json())  // Converte a resposta para JSON
      .then((data) => {
        setBestSeller(data);  // Atualiza o estado com os produtos recebidos
        setLoading(false);  // Desativa o loading
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
        setLoading(false);  // Desativa o loading em caso de erro
      });
  }, []);  // O array vazio garante que o efeito seja executado apenas uma vez

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
              <p>Carregando...</p>  // Exibe uma mensagem de carregamento
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
