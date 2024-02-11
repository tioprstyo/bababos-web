import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const [username, setUsername] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const getUsername = () => {
    setUsername(sessionStorage.getItem('username') || '');
  }

  const getCart = () => {
    let cartStorage = sessionStorage.getItem('cart') !== null ? JSON.parse(sessionStorage.getItem('cart') || '') : [];
    setCartCount(cartStorage.length);
  }

  useEffect(() => {
    getUsername();
    getCart();
  }, []);

  return (
    <div className='flex w-full shadow-md px-8 py-5'>
      <button onClick={() => navigate('/')}>
        <img src={require('../../assets/img/logo.png')} alt="brand-logo" className='h-10 w-auto' />
      </button>
      <div className='ml-auto flex'>
        <button className='flex' onClick={() => navigate('/cart')}>
          <FaShoppingCart className='self-center h-6 w-6' />
          {
            cartCount > 0 && (
              <span className='bg-red-500 text-white text-[10px] px-1.5 py-0.3 rounded-full'>{cartCount}</span>
            )
          }
        </button>
        <div className='self-center'>
          <button className='ml-5 flex' onClick={() => setDropdown(!dropdown)}>
            <img src={require('../../assets/img/company-logo.jpeg')} alt="company-logo-profile" className='w-6 h-6 pbject-fit self-center mr-2' />
            <p className='self-center'>{username}</p>
          </button>
          {
            dropdown && (
              <div id="dropdown" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 fixed right-8 top-16">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <button
                      className="w-full block px-4 py-2 hover:bg-green-500 text-black hover:text-white"
                      onClick={() => {
                      setDropdown(!dropdown)
                      navigate('/profile')
                    }}
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button 
                      className="w-full block px-4 py-2 hover:bg-green-500 text-black hover:text-white"
                      onClick={() => {
                        sessionStorage.removeItem('username');
                        navigate('/login')
                      }}
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            )
          }
        </div>
        
      </div>
    </div>
  )
}
export default Header;