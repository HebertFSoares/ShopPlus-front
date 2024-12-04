import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-purple-700 to-indigo-800 text-white h-[85vh] w-screen">
      <div className="text-center md:text-left md:w-1/2 px-4 md:px-0">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          A melhor loja online para suas compras!
        </h1>
        <p className="text-lg sm:text-xl mb-4">
          Descubra uma variedade incrível de produtos de alta qualidade para todas as suas necessidades. Compre com confiança e receba em casa!
        </p>
        <div className="flex justify-center md:justify-start">
          <a
            href="#produtos"
            className="bg-yellow-400 text-purple-800 px-6 py-3 rounded-lg mr-4 hover:bg-yellow-500 transition duration-300"
          >
            Ver Produtos
          </a>
          <a
            href="#ofertas"
            className="bg-white text-purple-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition duration-300"
          >
            Ofertas Especiais
          </a>
        </div>
      </div>

      {/* Lado direito com a imagem */}
      <div className="mt-10 md:mt-0 md:w-96">
        <img
          className="w-full h-full object-cover rounded-lg shadow-xl"
          src={assets.hero_img}
          alt="Loja Online"
        />
      </div>
    </div>
  );
};

export default Hero;
