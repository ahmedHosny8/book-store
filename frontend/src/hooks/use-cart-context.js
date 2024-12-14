import { useContext } from 'react';
import CartContext from '../context/cartContext';

function useCartContext() {
  return useContext(CartContext);
}

export default useCartContext;
