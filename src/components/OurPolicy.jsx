import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="flex flex-row justify-around gap-x-96 text-center py-25 text-base text-gray-700">
        <div className="space-y-3">
          <img src={assets.exchange_icon} className="w-16 m-auto mb-5" alt="" />
          <p className="font-semibold text-black text-lg">Política de Troca Fácil</p>
          <p className="text-gray-900">Oferecemos uma política de troca sem complicação</p>
        </div>
        <div className="space-y-3">
          <img src={assets.quality_icon} className="w-16 m-auto mb-5" alt="" />
          <p className="font-semibold text-black text-lg">Política de Devolução em 7 Dias</p>
          <p className="text-gray-900">Oferecemos política de devolução em até 7 dias</p>
        </div>
        <div className="space-y-3">
          <img src={assets.support_img} className="w-16 m-auto mb-5" alt="" />
          <p className="font-semibold text-black text-lg">Melhor Suporte ao Cliente</p>
          <p className="text-gray-900">Oferecemos suporte 24/7</p>
        </div>
      </div>
    </div>
  )
}

export default OurPolicy
