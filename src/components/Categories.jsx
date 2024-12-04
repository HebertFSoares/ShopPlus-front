import { Link } from 'react-router-dom';

const Categories = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-purple-100 to-indigo-100">
      <div className="text-center mb-8">
        {/* Título e descrição */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          <span className="text-purple-600">NOSSAS</span> CATEGORIAS
        </h2>
        <p className="mt-2 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
          Explore as diversas categorias que preparamos especialmente para você! Produtos incríveis que atendem todas as suas necessidades e preferências.
        </p>
        <div className="mt-4 border-t-2 border-purple-600 w-16 mx-auto"></div>
      </div>

      {/* Grid de Categorias */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center">
        {/* Categoria: Tecnologia */}
        <div className="text-center group transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <Link to="/categoria/tecnologia" className="block">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full overflow-hidden shadow-2xl mb-3">
              <img
                src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTBFQOrOGqcuPnjj9dRDHS3GRqzYRZPG9fQODbY_0z8Spg-wsqq"
                alt="Tecnologia"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm sm:text-lg font-medium text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
              Tecnologia
            </p>
          </Link>
        </div>

        {/* Categoria: Roupas */}
        <div className="text-center group transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <Link to="/categoria/roupas" className="block">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full overflow-hidden shadow-2xl mb-3">
              <img
                src="https://cdn.awsli.com.br/600x450/1953/1953797/produto/154151090/1-em9nj7bzmf.jpg"
                alt="Roupas"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm sm:text-lg font-medium text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
              Roupas
            </p>
          </Link>
        </div>

        {/* Categoria: Comida */}
        <div className="text-center group transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <Link to="/categoria/comida" className="block">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full overflow-hidden shadow-2xl mb-3">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyoDgm28_AF_HJgHixgi9N0IQNNMC6YDYnig&s"
                alt="Comida"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm sm:text-lg font-medium text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
              Comida
            </p>
          </Link>
        </div>

        {/* Categoria: Esportes */}
        <div className="text-center group transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <Link to="/categoria/esportes" className="block">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full overflow-hidden shadow-2xl mb-3">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-qE3orfDtbxd8bDbiJLH_Fjxgk9zpTJXKTg&s"
                alt="Esportes"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm sm:text-lg font-medium text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
              Esportes
            </p>
          </Link>
        </div>

        {/* Categoria: Casa e Decoração */}
        <div className="text-center group transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <Link to="/categoria/casa-decoracao" className="block">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full overflow-hidden shadow-2xl mb-3">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGAQgb0EZfetzJrTsHplAVPTf7eTT8CSjaMA&s"
                alt="Casa e Decoração"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm sm:text-lg font-medium text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
              Casa e Decoração
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Categories;
