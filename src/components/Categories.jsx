import { Link } from 'react-router-dom';

const Categories = () => {
  return (
    <div className="py-10">
      {/* Título */}
      <h2 className="text-center text-3xl font-semibold mb-8">Nossas Categorias</h2>

      {/* Grid de Categorias */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 place-items-center">
        {/* Categoria: Tecnologia */}
        <div className="text-center">
          <Link to="/categoria/tecnologia" className="group">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-lg transition-transform transform group-hover:scale-110">
              <img
                src="/src/assets/celular.png"
                alt="Tecnologia"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-lg font-medium text-gray-800 mt-4">Tecnologia</p>
          </Link>
        </div>

        {/* Categoria: Roupas */}
        <div className="text-center">
          <Link to="/categoria/roupas" className="group">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-lg transition-transform transform group-hover:scale-110">
              <img
                src="/src/assets/roupas.png"
                alt="Roupas"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-lg font-medium text-gray-800 mt-4">Roupas</p>
          </Link>
        </div>

        {/* Categoria: Comida */}
        <div className="text-center">
          <Link to="/categoria/comida" className="group">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-lg transition-transform transform group-hover:scale-110">
              <img
                src="/src/assets/comida.png"
                alt="Comida"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-lg font-medium text-gray-800 mt-4">Comida</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Categories;
