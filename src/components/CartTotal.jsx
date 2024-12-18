import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  const formatCurrency = (value) => {
    return `${currency} ${value.toFixed(2).replace('.', ',')}`;
  };

  const subTotal = getCartAmount();
  const total = subTotal + delivery_fee;

  return (
    <div className="w-full max-w-sm lg:max-w-[480px]">
      <div className="text-2xl">
        <h1 className="text-2xl font-bold text-gray-800">
          <span className="text-purple-600">TOTAL</span> DO CARRINHO
          <div className="border-t-2 border-purple-600 w-16"></div>
        </h1>
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>SubTotal</p>
          <p>{formatCurrency(subTotal)}</p>
        </div>
        <br />
        <hr />
        <br />
        <div className="flex justify-between">
          <p>Taxa de envio</p>
          <p>{formatCurrency(delivery_fee)}</p>
        </div>
        <br />
        <hr />
        <br />
        <div className="flex justify-between font-bold">
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
