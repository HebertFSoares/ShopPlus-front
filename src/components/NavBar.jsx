import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const NavBar = () => {
  const { setShowSearch, getCartCount } = useContext(ShopContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const toggleMenu = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
    setIsMenuOpen(!isMenuOpen); 
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-purple-600 text-white shadow-lg z-50">
      <div className="flex items-center justify-between w-full py-4 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl sm:text-3xl font-bold text-white">ShopPlus</span>
        </Link>

        <div className="sm:hidden flex items-center relative">
          <button
            onClick={toggleMenu}
            className="text-white text-2xl"
            aria-label="Abrir menu"
          >
            <div
              className={`hamburger-icon flex flex-col justify-between items-center w-7 h-6 transform transition-all duration-300 ${
                isHamburgerOpen ? "rotate-45" : ""
              }`}
            >
              <div
                className={`h-1 w-7 bg-white transform transition-all duration-300 ${
                  isHamburgerOpen ? "rotate-45 translate-x-1" : ""
                }`}
              ></div>
              <div
                className={`h-1 w-7 bg-white transform transition-all duration-300 ${
                  isHamburgerOpen ? "opacity-0" : ""
                }`}
              ></div>
              <div
                className={`h-1 w-7 bg-white transform transition-all duration-300 ${
                  isHamburgerOpen ? "rotate--45 translate-x-1" : ""
                }`}
              ></div>
            </div>
          </button>

          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white text-gray-800 rounded shadow-lg w-48">
              <ul className="flex flex-col">
                <NavLink
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 hover:bg-purple-100"
                >
                  INÍCIO
                </NavLink>
                <NavLink
                  to="/collection"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 hover:bg-purple-100"
                >
                  COLEÇÃO
                </NavLink>
                <NavLink
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 hover:bg-purple-100"
                >
                  SOBRE NÓS
                </NavLink>
                {/* Ícone de Perfil no Menu de Hambúrguer */}
                <div className="px-4 py-2 hover:bg-purple-100">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <img
                      src={assets.profile_icon}
                      className="w-6 h-6 inline-block mr-2"
                      alt="Ícone de perfil"
                    />
                    Meu Perfil
                  </Link>
                </div>

                {/* Carrinho no Menu de Hambúrguer */}
                <div className="px-4 py-2 hover:bg-purple-100">
                  <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                    <img
                      src={assets.cart_icon}
                      className="w-6 h-6 inline-block mr-2"
                      alt="Ícone do carrinho"
                    />
                    Carrinho ({getCartCount()})
                  </Link>
                </div>
              </ul>
            </div>
          )}
        </div>

        {/* Links de Navegação */}
        <ul className="hidden sm:flex gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-2 py-1 rounded ${
                isActive
                  ? "bg-white text-purple-600 font-bold"
                  : "text-white hover:bg-purple-500 hover:text-gray-200 transition"
              }`
            }
          >
            INÍCIO
          </NavLink>
          <NavLink
            to="/collection"
            className={({ isActive }) =>
              `flex items-center px-2 py-1 rounded ${
                isActive
                  ? "bg-white text-purple-600 font-bold"
                  : "text-white hover:bg-purple-500 hover:text-gray-200 transition"
              }`
            }
          >
            COLEÇÃO
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex items-center px-2 py-1 rounded ${
                isActive
                  ? "bg-white text-purple-600 font-bold"
                  : "text-white hover:bg-purple-500 hover:text-gray-200 transition"
              }`
            }
          >
            SOBRE NÓS
          </NavLink>
        </ul>

        {/* Ícones e Interações */}
        <div className="flex items-center gap-6 hidden sm:flex">
          {/* Perfil */}
          <div className="relative group">
            <Link to="/login">
              <img
                src={assets.profile_icon}
                className="w-8 cursor-pointer hover:scale-110 transition-transform"
                alt="Ícone de perfil"
              />
            </Link>
            <div className="absolute hidden group-hover:block right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-white text-gray-600 rounded shadow-lg">
                <p className="cursor-pointer hover:text-purple-500">Meu Perfil</p>
                <p className="cursor-pointer hover:text-purple-500">Meus Pedidos</p>
                <p className="cursor-pointer hover:text-purple-500">Sair</p>
              </div>
            </div>
          </div>

          {/* Carrinho */}
          <Link to="/cart" className="relative">
            <img
              src={assets.cart_icon}
              className="w-8 hover:scale-110 transition-transform"
              alt="Ícone do carrinho"
            />
            <p className="absolute right-[-5px] bottom-[-5px] w-6 text-center leading-4 bg-white text-purple-600 border border-purple-600 aspect-square rounded-full text-[10px]">
              {getCartCount()}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
