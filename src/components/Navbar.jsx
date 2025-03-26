import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <nav class="bg-white border-gray-200 dark:bg-gray-900 border-b border-b-gray-900 dark:border-b-white">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Finance Space</span>
          </Link>
          <div class="flex items-center space-x-6 rtl:space-x-reverse">
            {/* <a href="tel:5541251234" class="text-sm  text-gray-500 dark:text-white hover:underline">(555) 412-1234</a> */}
            <button onClick={toggleTheme}>{theme == 'light' ? <Moon fill='white' /> : <Sun className='text-white' />}</button>
            <Link to={isAuthenticated ? props.card == 'private' ? '/logout' : '/dashboard' : '/'} type="button" class="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">{isAuthenticated ? props.card == 'private' ? 'Logout' : 'Dashboard' : 'Home'}</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar