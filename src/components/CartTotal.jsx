import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  // Função para formatar valores monetários
  const formatCurrency = (value) => {
    return `${currency} ${value.toFixed(2).replace('.', ',')}`;
  };

  const subTotal = getCartAmount();
  const total = subTotal + delivery_fee;

  return (
    <div className='w-[480px]'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTAL'} />
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>SubTotal</p>
          <p>{formatCurrency(subTotal)}</p>
        </div>
        <br />
        <hr />
        <br />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{formatCurrency(delivery_fee)}</p>
        </div>
        <br />
        <hr />
        <br />
        <div className='flex justify-between font-bold'>
          <p>Total</p>
          <p>{formatCurrency(total)}</p>
        </div>
        <br />
        <hr />
      </div>
    </div>
  );
};

export default CartTotal;
