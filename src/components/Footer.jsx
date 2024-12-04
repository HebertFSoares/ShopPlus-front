const Footer = () => {
  return (
    <div className="bg-purple-600 text-white mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 py-10 px-8 md:px-20 text-sm">
        <div className="sm:col-span-2 md:col-span-1">
          <p className="text-gray-300">
            Desde produtos eletrônicos e móveis até utensílios para o dia a dia, nossa loja oferece uma grande variedade de itens para atender todas as suas necessidades. Explore nossa vasta gama de produtos de qualidade.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">SOBRE A LOJA</p>
          <ul className="flex flex-col gap-2 text-gray-300">
            <li className="hover:text-white cursor-pointer transition">Início</li>
            <li className="hover:text-white cursor-pointer transition">Sobre Nós</li>
            <li className="hover:text-white cursor-pointer transition">Entrega</li>
            <li className="hover:text-white cursor-pointer transition">Política de Privacidade</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">FALE CONOSCO</p>
          <ul className="flex flex-col gap-2 text-gray-300">
            <li className="hover:text-white transition">+55 81 8318-4075</li>
            <li className="hover:text-white transition">sshopplus.suporte@gmail.com</li>
            <li>
              <a
                href="https://instagram.com/fancyshop"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Linha de separação e direitos autorais */}
      <div className="bg-purple-700 py-4">
        <hr className="border-purple-500" />
        <p className="text-center mt-4 text-sm text-gray-300">
          Copyright 2024 @ shopplus.com - Todos os direitos reservados
        </p>
      </div>
    </div>
  );
};

export default Footer;
