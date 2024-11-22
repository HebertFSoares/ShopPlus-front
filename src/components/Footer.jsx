const Footer = () => {
  return (
    <div>
      <div className='grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm'>
        <div>
            <p className='w-2/3 text-gray-600'>
              Desde produtos eletrônicos e móveis até utensílios para o dia a dia, nossa loja oferece uma grande variedade de itens para atender todas as suas necessidades. Explore nossa vasta gama de produtos de qualidade.
            </p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>SOBRE A LOJA</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Início</li>
                <li>Sobre Nós</li>
                <li>Entrega</li>
                <li>Política de Privacidade</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>FALE CONOSCO</p>
            <ul className='flex flex-col gap-1 text-slate-600'>
                <li>+55 81 8318-4075</li>
                <li>sshopplus.suporte@gmail.com</li>
                <li><a href="https://instagram.com/fancyshop" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className='text-center my-4 text-sm'>Copyright 2024 @ shopplus.com - Todos os direitos reservados</p>
      </div>
    </div>
  )
}

export default Footer
