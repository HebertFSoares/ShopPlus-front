import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-row border border-gray-400'>
      {/* Lado esquerdo do Hero */}
      <div className='w-full flex items-center justify-center py-10'>
        <div className='text-[#414141]'>
          <div className='flex items-center gap-2'>
            <p className='w-8 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm'>NOSSOS MAIS VENDIDOS</p>
          </div>
          <h1 className='text-3xl leading-relaxed'>Novidades Chegaram</h1>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm'>COMPRE AGORA</p>
            <p className='w-8 h-[1px] bg-[#414141]'></p>
          </div>
        </div>
        {/* Lado direito com a imagem */}
      </div>
      <img className="w-2/5" src={assets.hero_img} alt="Hero" />
    </div>
  )
}

export default Hero
