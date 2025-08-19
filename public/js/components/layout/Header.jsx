import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { logout } from '../../actions/userActions';
import { resetCart } from '../../actions/cartActions';
import { resetOrderList } from '../../actions/orderActions';
import { resetProductList } from '../../actions/productActions';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(resetCart());
    dispatch(resetOrderList());
    dispatch(resetProductList());
    setIsOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/search/${searchKeyword}`);
      setSearchKeyword('');
      setIsSearchOpen(false);
    } else {
      navigate('/');
    }
    setIsOpen(false);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close search when route changes
  useEffect(() => {
    setIsSearchOpen(false);
  }, [location]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-800">
            LensCraft
          </Link>

          {/* Search Form - Desktop */}
          <form
            onSubmit={submitHandler}
            className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 flex-1 max-w-xl mx-8"
          >
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent border-none outline-none w-full"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit" className="ml-2 text-gray-500">
              <FaSearch />
            </button>
          </form>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-gray-700 hover:text-gray-900 text-xl" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </Link>
            {userInfo ? (
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-gray-900">
                  <FaUser className="mr-1" />
                  {userInfo.name.split(' ')[0]}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  {userInfo.isAdmin && (
                    <>
                      <Link
                        to="/admin/orderlist"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Orders
                      </Link>
                      <Link
                        to="/admin/productlist"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Products
                      </Link>
                      <Link
                        to="/admin/userlist"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Users
                      </Link>
                    </>
                  )}
                  <button
                    onClick={logoutHandler}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center text-gray-700 hover:text-gray-900"
              >
                <FaUser className="mr-1" />
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700"
            >
              <FaSearch />
            </button>
            <Link to="/cart" className="relative text-gray-700">
              <FaShoppingCart className="text-xl" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="mt-4 md:hidden">
            <form onSubmit={submitHandler} className="flex">
              <input
                type="text"
                placeholder="Search products..."
                className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FaSearch />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3 mt-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-gray-900 py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              {userInfo ? (
                <>
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-gray-900 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  {userInfo.isAdmin && (
                    <>
                      <Link
                        to="/admin/orderlist"
                        className="text-gray-700 hover:text-gray-900 py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Orders
                      </Link>
                      <Link
                        to="/admin/productlist"
                        className="text-gray-700 hover:text-gray-900 py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Products
                      </Link>
                      <Link
                        to="/admin/userlist"
                        className="text-gray-700 hover:text-gray-900 py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Users
                      </Link>
                    </>
                  )}
                  <button
                    onClick={() => {
                      logoutHandler();
                      setIsOpen(false);
                    }}
                    className="text-left text-red-600 py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
