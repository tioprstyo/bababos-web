import React, { useState, useEffect } from 'react';
import { IoMdPeople } from "react-icons/io";
import { MdAttachMoney } from "react-icons/md";
import { FaFlag } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { FaChartBar } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import moment from 'moment';
import { ProductProps, TransactionHistoryProps } from '../../type';


function Profile() {
  const [username, setUsername] = useState('');
  const [transaction, setTransaction] = useState<TransactionHistoryProps[]>([]);

  const getProfile = () => {
    let userName = sessionStorage.getItem('username') || '';
    let historyTransaction = JSON.parse(sessionStorage.getItem(`order-${userName}`) || '[]');
    setUsername(userName);
    setTransaction(historyTransaction);
    historyTransaction.forEach((e: TransactionHistoryProps) => {
      e.isOpenDetail = false;
    });
  };

  const openDetail = (i: number) => {
    let updateData = [...transaction];
    updateData[i].isOpenDetail = !updateData[i].isOpenDetail;
    setTransaction(updateData);
  }

  useEffect(() => {
    getProfile();
  }, [])

  return (
    <div className='md:grid md:grid-cols-2 md:gap-10 md:p-8 p-5 text-left'>
      <div className='mb-10'>
        <h1 className='text-center font-bold text-4xl'>{username}</h1>
        <img src={require('../../assets/img/company-logo.jpeg')} alt="company-logo" className='w-32 h-32 mx-auto my-12' />
        <p className='mb-5'>Jl. Pasir No.19, Pd. Karya, Kec. Pd. Aren, Kota Tangerang Selatan, Banten 15412</p>
        <div className='mb-5'>
          <p className='font-bold'>About {username}</p>
          <p>{username} may be growing as it has recently secured a $3 million funding round, which is a strong indicator of investor confidence and financial backing. This influx of capital is intended to help the company double its customer base, suggesting an expansion of its market presence and potential increase in revenue. The company's position in the supply chain industry, coupled with this recent funding, indicates a trajectory of growth and development.</p>
        </div>
        <div className='flex'>
          <IoMdPeople className='self-center mr-2' />
          <span>
            11-50
          </span>
        </div>
        <div className='flex'>
          <MdAttachMoney className='self-center mr-2' />
          <span>
            Seed
          </span>
        </div>
        <div className='flex'>
          <FaFlag className='self-center mr-2' />
          <span>
            Private
          </span>
        </div>
        <div className='flex'>
          <TbWorld className='self-center mr-2' />
          <span>
            www.rafatech.com
          </span>
        </div>
        <div className='flex'>
          <FaChartBar className='self-center mr-2' />
          <span>
            17,421
          </span>
        </div>
      </div>
      <div>
        <h1 className='font-bold text-xl mb-5'>Transaction History</h1>
        {
          transaction && transaction.map((e: TransactionHistoryProps, index: number) => (
            <div className='md:p-3 shadow-md' key={index}>
              <div className={`flex ${e.isOpenDetail ? 'border-b border-current-500 pb-3' : ''}`} onClick={() => openDetail(index)}>
                <img src={(Object.entries(e.orders)[0][1] as ProductProps[])[0].image} className='w-12 h-12 object-fit self-center mr-5 ' alt="" />
                <div className='self-center'>
                  <p className='text-sm font-bold'>{e.orderName}</p>
                  <p className='text-xs'>{moment(e.createDate).format('DD MMM yyyy')}</p>
                </div>
                <div className='ml-auto self-center'>
                  {
                    e.isOpenDetail ? (
                      <IoIosArrowUp />
                    ) : 
                      (
                        <IoIosArrowDown />
                      )
                  }
                </div>
              </div>
              {
                e.isOpenDetail && Object.entries(e.orders).map((o: any, idx: number) => (
                  <div className='flex mt-5 px-3' key={idx}>
                    <img src={o[1][0].image} alt="product-img" className='w-8 h-8 mr-3' />
                    <div>
                      <p className='text-xs font-bold truncate w-[200px]'>{o[1][0].title}</p>
                      <p className='text-xs'>{o[1][0].category}</p>
                    </div>
                    <div className='ml-auto self-center'>
                      <p className='text-xs font-bold'>{o[1].length}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Profile;
