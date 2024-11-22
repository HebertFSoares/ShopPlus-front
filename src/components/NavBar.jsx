import { useContext } from 'react'
import {assets} from '../assets/assets'
import {Link, NavLink} from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const NavBar = () => {
  const {setShowSearch, getCartCount} = useContext(ShopContext)
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'>
        <div className='flex items-center'>
          <span className='ml-3 text-xl font-semibold text-gray-800'>ShopPlus</span>
        </div>
      </Link>
      <ul className='flex gap-5'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
            <p>INÍCIO</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>  
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
            <p>COLEÇÃO</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
            <p>SOBRE NÓS</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
        </NavLink>
      {/* 
      <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTATO</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'></hr>
      </NavLink> */}

      </ul>

      <div className='flex items-center gap-6'>
        <Link to='/collection'>
          <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className="w-5 cursor-pointer" alt="Ícone de busca" />
        </Link>
        <div className='group relative'>
          <Link to='/login'>
            <img src={assets.profile_icon} className="w-5 cursor-pointer" alt="Ícone de perfil" />
          </Link>
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <p className='cursor-pointer hover:text-black'>Meu Perfil</p>
              <p className='cursor-pointer hover:text-black'>Meus Pedidos</p>
              <p className='cursor-pointer hover:text-black'>Sair</p>
            </div>
          </div>
        </div>
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className="w-5" alt="Ícone do carrinho" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>
      </div>
    </div>
  )
}

export default NavBar
