import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping, faBars, faXmark,faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../Cards/CartContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const isLogin = localStorage.getItem('isLoggedIn') === 'true';
  const username = localStorage.getItem('username');
  const userImage = localStorage.getItem('image');

  const handleHamburger = () => {
    setMenuOpen((Mopen) => !Mopen);
  };

  const handleLogin = () => {
    if (isLogin) {
      // Clear login info and log out
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('image');
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-between shadow-xl fixed w-full px-14 top-0 bg-white z-50">
      <div className="text-[35px] text-bold text-[#c72092]">
        WOW<span className="text-blue-700 underline">shoes</span>
      </div>
      <div className="hidden md:flex">
        <ul className="flex gap-[20px] lg:gap-[42px]">
          <li>
            <Link to="/home" className="hover:text-[#c72092] border-b-2 border-transparent hover:border-blue-700">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className="hover:text-[#c72092] border-b-2 border-transparent hover:border-blue-700">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/deals" className="hover:text-[#c72092] border-b-2 border-transparent hover:border-blue-700">
              Deals
            </Link>
          </li>
          <li>
            <Link to="/form" className="hover:text-[#c72092] border-b-2 border-transparent hover:border-blue-700">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/blog" className="hover:text-[#c72092] border-b-2 border-transparent hover:border-blue-700">
              Blog
            </Link>
          </li>
          <li>
            <Link to="/faqs" className="hover:text-[#c72092] border-b-2 border-transparent hover:border-blue-700">
              FAQs
            </Link>
          </li>
        </ul>
      </div>
      <div className="hidden md:flex">
        <span className="text-2xl mr-6">
          {/* <FontAwesomeIcon icon={faHeart} className="mr-3 hover:text-[#c72092]" /> */}
          <Link to="/cart" className="relative">
            <FontAwesomeIcon icon={faCartShopping} className="-mr-[8px] hover:text-[#c72092]" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {cartItems.length}
              </span>
            )}
          </Link>
        </span>
        {isLogin ? (
          <div className="relative flex items-center mr-4 bg-gray-100 px-[17px] py-[3px] rounded-xl">
            {userImage && (  
              <img
                src={`http://localhost:5000/${userImage}`}
                alt="User"
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={toggleDropdown} // Toggle dropdown on click
              />
            )}
            <FontAwesomeIcon icon={faAngleDown} className='text-[13px] mt-[15px]'/> 
            {dropdownOpen && (
              <div className="absolute top-10 right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10">
                <span className="block px-4 py-2 text-gray-700">Welcome, {username}</span>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleLogin}
                >
                  LogOut
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="bg-[#c72092] rounded-md text-white px-2 py-1 mr-4" onClick={handleLogin}>
            LogIn
          </button>
        )}
      </div>
      <span
        className="md:hidden bg-gray-500 text-white px-4 py-[6px] fa-xl rounded-sm"
        onClick={handleHamburger}
      >
        <FontAwesomeIcon icon={!menuOpen ? faBars : faXmark} />
      </span>
      {menuOpen && (
        <div className="flex items-center justify-center absolute mt-[305px] bg-gray-200 w-full left-0">
          <ul className="flex-col">
            <li className="mb-3">
              <Link to="/home" className="hover:text-[#c72092] border-b-2 border-transparent hover:border-blue-700">
                Home
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/shop" className="hover:text-[#c72092] border-b-2 border-transparent hover:border-blue-700">
                Shop
              </Link>
            </li>
            <li className='mb-3'>
            <Link to="/deals" className="hover:text-[#c72092] border-b-2 border-transparent hover:border-blue-700">
              Deals
            </Link>
          </li>
            <li className="mb-3">
              <Link to="/form" className="hover:text-[#c72092] border-b-2 border-transparent hover:border-blue-700">
                Contact
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/blog" className="hover:text-[#c72092] border-b-2 border-transparent hover:border-blue-700">
                Blog
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/faqs" className="hover:text-[#c72092] border-b-2 border-transparent hover:border-blue-700">
                FAQs
              </Link>
            </li>
            <li className="pb-4">
              <button
                className="bg-[#c72092] rounded-md text-white px-2 py-1 -ml-2"
                onClick={handleLogin}
              >
                {isLogin ? 'LogOut' : 'LogIn'}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
