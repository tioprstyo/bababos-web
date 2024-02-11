import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BiCategory } from "react-icons/bi";
import { MdAttachMoney } from "react-icons/md";
import { TiStar } from "react-icons/ti";
import { FaShoppingCart } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { ProductProps } from '../../../type';

const ProductDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductProps>();


  const getProductsById = () => {
    if (state) {
      fetch(`https://fakestoreapi.com/products/${state.id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setProduct(data);
        });
    } else {
      navigate('/')
    }
  };

  const addToCart = () => {
    let savedCart: ProductProps[] = [];
    savedCart = sessionStorage.getItem('cart') !== null ? JSON.parse(sessionStorage.getItem('cart') || '') : [];
    savedCart.push(product as ProductProps);
    sessionStorage.setItem('cart', JSON.stringify(savedCart));
    toast.success('You have successfully added to cart')
  }

  useEffect(() => {
    getProductsById();
  }, []);

  return (
    <div className='md:p-8 p-5 text-left'>
      <h1 className='font-bold text-2xl mb-5'>{product?.title}</h1>
      <div className='md:grid md:grid-cols-2 md:gap-10 '>
        <div className='mb-5'>
          <img src={product?.image} alt="product-pict" className='w-full h-96 object-cover' />
          <div className='md:grid md:grid-cols-3 md:gap-5 md:p-8 p-5 hidden'>
            <img src={product?.image} alt="product-pict" className='w-full h-36 object-cover' />
            <img src={product?.image} alt="product-pict" className='w-full h-36 object-cover' />
            <img src={product?.image} alt="product-pict" className='w-full h-36 object-cover' />
          </div>
        </div>
        <div>
          <h3 className='font-bold text-xl mb-5'>Product Descriptions</h3>
          <p>{product?.description}</p>
          <div className='flex mt-5'>
            <BiCategory className='self-center' />
            <p className='ml-3'>{product?.category}</p>
          </div>
          <div className='flex'>
            <TiStar className='self-center' />
            <p className='ml-3'>{product?.rating.rate} / {product?.rating.count}</p>
          </div>
          <div className='flex'>
            <MdAttachMoney className='self-center' />
            <p className='ml-3'>{product?.price}</p>
          </div>
          <button className='w-full py-3 mt-10 font-bold bg-green-500 rounded-md text-white flex justify-center' onClick={addToCart}>
            <FaShoppingCart className='self-center h-6 w-6 mr-3' />
            Add to Cart
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  )
};

export default ProductDetail;