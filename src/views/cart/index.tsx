import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ProductProps } from '../../type';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [totalCart, setTotalCart] = useState(0);
  const [username, setUsername] = useState('');

  const getCart = () => {
    let cartStorage = sessionStorage.getItem('cart') !== null ? JSON.parse(sessionStorage.getItem('cart') || '') : [];
    var groupBy = function () {
      let total = 0;
      let cartData = cartStorage.reduce(function (r: any, a: ProductProps) {
        total += a.price;
        r[a.id] = r[a.id] || [];
        r[a.id].push(a);
        return r;
      }, Object.create(null));

      return {
        cartData,
        total
      };
    };
    setCart(groupBy().cartData);
    setTotalCart(groupBy().total)
  }

  const getUsername = () => {
    setUsername(sessionStorage.getItem('username') || '')
  }

  const checkoutCart = () => {
    let orders = [];
    orders = JSON.parse(sessionStorage.getItem(`order-${username}`) || '[]');
    const order = {
      orderId: Math.floor(Math.random() * 100),
      orderName: `Order-${Date.now()}`,
      createDate: new Date(),
      orders: cart
    };
    orders.push(order);
    sessionStorage.setItem(`order-${username}`, JSON.stringify(orders));
    sessionStorage.removeItem('cart');
    setCart(null);
    toast.success('You have successfully checked out');
  }

  useEffect(() => {
    getCart();
    getUsername();
  }, []);

  return (
    <div className='md:p-8 p-5 text-left'>
      <div className='mb-10'>
        <h1 className='text-2xl font-bold'>Shopping Cart</h1>
        <div className='overflow-x-scroll'>
          <div className='table w-full min-w-[600px] mt-5 overflow-x-scroll'>
            <div className='table-header-group'>
              <div className='table-row'>
                <div className='table-cell py-3 border-b border-t border-current-500 font-bold'>Product Details</div>
                <div className='table-cell py-3 border-b border-t border-current-500 font-bold'>Quantity</div>
                <div className='table-cell py-3 border-b border-t border-current-500 font-bold'>Price</div>
                <div className='table-cell py-3 border-b border-t border-current-500 font-bold'>Total</div>
              </div>
              </div>
            {
              (cart && Object.keys(cart).length > 0)  && (
                <div className='table-row-group'>
                  {
                    Object.entries(cart).map((e: any, index: number) => (
                      <div className='table-row' key={index}>
                        <div className='table-cell max-w-[150px] py-5 border-b border-current-500'>
                          <div className='flex'>
                            <img src={e[1][0].image} alt={`product-${e[1][0].id}`} className='w-24 h-24 object-cover mr-5' />
                            <div>
                              <p className='text-sm'><span className='font-bold'>Name:</span> {e[1][0].title}</p>
                              <p className='text-sm'><span className='font-bold'>Category:</span> {e[1][0].category}</p>
                            </div>
                          </div>
                        </div>
                        <div className='table-cell text-sm py-5 border-b border-current-500'>
                          <div className='flex'>
                            <p>{e[1].length}</p>
                          </div>
                        </div>
                        <div className='table-cell text-sm py-5 border-b border-current-500'>$ {e[1][0].price}</div>
                        <div className='table-cell text-sm py-5 border-b border-current-500'>${(e[1][0].price) * e[1].length}</div>
                      </div>
                    ))
                  }
                  <div className='table-row'>
                    <div className='table-cell py-3 font-bold'>
                      Total
                    </div>
                    <div className='table-cell' />
                    <div className='table-cell' />
                    <div className='table-cell py-3 font-bold'>
                      $ {totalCart}
                    </div>
                  </div>
                </div>
              )
            }
          </div>
          {
            (!cart || Object.keys(cart).length === 0) && (
              <div className='flex justify-center border-b border-current-500'>
                <p className='w-full py-3 text-center text-sm text-gray-500'>Empty List</p>
              </div>
            )
          }
        </div>
      </div>
      {
        (cart && Object.keys(cart).length > 0) &&  (
          <div className='flex justify-center'>
            <button className='bg-green-500 rounded text-white md:w-1/3 w-full py-3 font-bold' onClick={() => checkoutCart()}>Checkout</button>
          </div>
         )
      }
      <Toaster />
    </div>
  )
}

export default Cart;