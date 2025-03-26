import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import loginImage from './../assets/loginImage.png'

const Login = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [errorMsg, seterrorMsg] = useState('')
  const [MsgType, setMsgType] = useState('red')

  const users = [
    { username: 'admin', password: '1234' },
    { username: 'user1', password: '12345' }
  ];
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validUser = users.find(user => user.username === username && user.password === password);
    if (validUser) {
      localStorage.setItem('isAuthenticated', true);
      setMsgType('green')
      seterrorMsg('Login Successful!')
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      setMsgType('red')
      seterrorMsg('Username/Password wrong!')
      setTimeout(() => {
        seterrorMsg('')
      }, 2000);
    }
  }


  return (
    <>
      {(errorMsg ?
        <div class={`relative top-0 left-0 right-0 bg-${MsgType}-500 text-white text-center py-3 px-4 shadow-lg z-50 `}>
          <span class="font-bold"></span> {errorMsg}
          <button class="absolute top-2 right-2 text-white" onclick="this.parentElement.style.display='none';">
            &times;
          </button>
        </div>
        : null)}
      <div className='flex flex-col md:flex-row  items-center w-full h-screen justify-center md:justify-evenly dark:bg-gray-900'>
        <div className=" md:block w-1/2 md:w-1/4   ">
          <img src={loginImage} alt="" />
        </div>
        {
          isAuthenticated ? 
          <form className="w-full md:w-1/4  h-1/3 rounded-2xl md:shadow-2xl flex flex-col items-center justify-center md:dark:border" onSubmit={handleSubmit}>
            <Link to={'/dashboard'} className="my-2 text-center px-4 py-2 w-3/5 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-700 hover:w-4/5 transition-all duration-300 ease-in-out">Dashboard</Link>
            <Link to={'/logout'} className="my-2 text-center px-4 py-2 w-3/5 cursor-pointer bg-red-500 text-white rounded hover:bg-red-700 hover:w-4/5 transition-all duration-300 ease-in-out">Logout</Link>
          </form>
          :
            <form className="w-full md:w-1/4  h-1/3 rounded-2xl md:shadow-2xl flex flex-col items-center justify-center md:dark:border" onSubmit={handleSubmit}>
              <h2 className='dark:text-white text-xl lg:text-2xl lg:font-semibold italic'>Finance Login Form</h2>
              <input className="w-4/5 p-4 border rounded my-2" placeholder='Username' type="text" name='username' value={username} onChange={(e) => { setusername(e.target.value) }} />
              <input className="w-4/5 p-4 border rounded my-2" placeholder='Password' type="password" name='username' value={password} onChange={(e) => { setpassword(e.target.value) }} />
              <button onSubmit={handleSubmit} className="text-center px-4 py-2 w-3/5 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-700 hover:w-4/5 transition-all duration-300 ease-in-out">Login</button>
            </form>
        }
      </div>
    </>
  )
}

export default Login