import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductProps } from '../../type';

const Product = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState<ProductProps[]>([]);
  const [filterList, setFilterList] = useState<ProductProps[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  
  const getProducts = () => {
    fetch('https://fakestoreapi.com/products/')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let category: string[] = [];
        setAllProducts(data);
        setFilterList(data);
        data.forEach((e: ProductProps) => {
          if (!category.find(ctgry => ctgry === e.category)) {
            category.push(e.category);
          }
        });
        setCategories(category);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  const onChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      let filterCategory = [...allProducts];
      setFilterList(filterCategory.filter((products: ProductProps) => products.category === e.target.value));
    } else {
      setFilterList(allProducts);
    }
  }
  return (
    <div className='md:grid md:grid-cols-5 md:gap-5 md:p-8 p-5 text-left'>
      <div className='md:col-span-1 shadow-lg p-4 md:min-h-screen md:min-w-[200px]'>
        <h2 className='text-lg font-bold mb-3 text-left'>Filter</h2>
        <p className='mb-2 text-left'>Category</p>
        {
          categories.map((e: string, index: number) => (
            <div className='mb-1 flex' key={index + 2}>
              <input type="checkbox" id={`category-${index + 2}`} name={`category-${index + 2}`} className='self-center mr-2' value={e} onChange={onChangeCategory}></input>
              <p>{e.charAt(0).toUpperCase() + e.slice(1)}</p>
            </div>
          ))
        }
      </div>
      <div className='md:col-span-4 flex flex-wrap mt-5 md:mt-0'>
        {
          filterList.map((e: ProductProps, index: number) => (
            <div className='md:basis-1/4 md:p-3 cursor-pointer mt-5 md:mt-0' key={index} onClick={() => navigate('/detail/', { state: {id: e.id}})}>
              <div className='p-5 w-full shadow-lg rounded inline-grid justify-center'>
                <img src={e.image} alt="product-img" className='w-28 h-28 object-cover justify-self-center' />
                <p className='text-sm line-clamp-1 font-bold mt-5'>{e.title}</p>
                <p className='text-sm text-ellipsis line-clamp-3 mt-2'>{e.description}</p>
                <p className='font-bold mt-2'>$ {e.price}</p>
              </div>
            </div>
          ))
        }
        
      </div>
      </div>
  )
}

export default Product;