import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import toast, { Toaster } from 'react-hot-toast';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorUsername, setErrorUsername] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const onLogin = () => {
    if (username && password) {
      sessionStorage.setItem('username', username);
      toast.success('You have successfully logged in');
      navigate('/');
    } else {
      if (!username) {
        setErrorUsername('Please fill the username');
      }
      if (!password) {
        setErrorPassword('Please fill the password');
      }
    }
  }
  return (
    <div className='text-left h-screen flex items-center justify-center bg-green-300'>
      <div className='md:mx-auto shadow-md md:p-16 p-8 md:mx-0 mx-2 align-self rounded-lg bg-white'>
        <img src={logo} alt="logo" className='md:mb-16 mb-12 mt-4' />
        <form action="">
          <div className='w-full'>
            <label htmlFor="">Username</label><br />
            <input type="text" placeholder="Input your username" className='border rounded-md w-full p-2 mt-1' onChange={(e: React.ChangeEvent<HTMLInputElement>)=> setUsername(e.target.value)} />
            <p className='text-xs text-red-500'>{errorUsername}</p>
          </div>
          <div className='w-full mt-5'>
            <label htmlFor="">Password</label><br />
            <input type="password" placeholder="Input your password" className='border rounded-md w-full p-2 mt-1 mb-1' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
            <p className='text-xs text-red-500'>{errorPassword}</p>
          </div>
        </form>
        <a href="/forgot-password" className='block text-right text-xs mb-5'>Forgot Password?</a>
        <button className='bg-green-300 text-white w-full rounded-lg py-2 font-bold' onClick={() => onLogin()}>Login</button>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
