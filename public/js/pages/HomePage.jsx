import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import { formatPrice } from '../utils/format';
import { FaStar, FaShoppingCart, FaSearch, FaArrowRight } from 'react-icons/fa';
import { Loader, Message, ButtonLoader } from '../components/common';
import Meta from '../components/Meta';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { keyword, pageNumber } = useParams();
  const [searchKeyword, setSearchKeyword] = useState(keyword || '');

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  // Handle search submission
  const submitHandler = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/search/${searchKeyword}`);
    } else {
      navigate('/');
    }
  };

  // Fetch products when the component mounts or when keyword/page changes
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber || 1));
  }, [dispatch, keyword, pageNumber]);

  // Hero Section
  const HeroSection = () => (
    <div className="relative bg-gray-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Capture Life's</span>
                <span className="block text-blue-400">Beautiful Moments</span>
              </h1>
              <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Discover our premium collection of cameras and photography equipment to bring your creative vision to life.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to="/shop"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                  >
                    Shop Now
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    to="/about"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt="Photographer with camera"
        />
      </div>
    </div>
  );

  // Featured Products Section
  const FeaturedProducts = () => (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Cameras
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Explore our curated selection of high-quality cameras
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-8 max-w-2xl mx-auto">
          <form onSubmit={submitHandler} className="flex">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search products..."
              className="flex-1 min-w-0 block w-full px-4 py-2 rounded-l-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaSearch className="h-4 w-4 mr-2" />
              Search
            </button>
          </form>
        </div>

        {loading ? (
          <Loader className="my-12" />
        ) : error ? (
          <Message variant="error">{error}</Message>
        ) : (
          <>
            <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.slice(0, 8).map((product) => (
                <div key={product._id} className="group">
                  <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={product.images[0] || '/images/default-product.jpg'}
                        alt={product.name}
                        className="w-full h-64 object-cover object-center group-hover:opacity-75"
                      />
                    </Link>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link to={`/product/${product._id}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                        </Link>
                      </h3>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`${
                              i < Math.floor(product.rating || 0)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            } h-4 w-4`}
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">
                          ({product.numReviews || 0} reviews)
                        </span>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                to="/shop"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                View All Products
                <FaArrowRight className="ml-2 -mr-1 h-4 w-4" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );

  // Features Section
  const FeaturesSection = () => (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose Our Store?
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {[
              {
                name: 'Free Shipping',
                description: 'Free shipping on all orders over $50',
                icon: '🚚',
              },
              {
                name: '30-Day Returns',
                description: 'Not satisfied? Return within 30 days for a full refund',
                icon: '↩️',
              },
              {
                name: 'Warranty',
                description: '1-year warranty on all products',
                icon: '🔧',
              },
              {
                name: 'Expert Support',
                description: 'Our photography experts are here to help',
                icon: '📞',
              },
            ].map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <span className="text-xl">{feature.icon}</span>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Newsletter Section
  const NewsletterSection = () => (
    <div className="bg-blue-700">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Stay in the loop</span>
          <span className="block">Subscribe to our newsletter</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-blue-200">
          Get the latest deals, photography tips, and product updates.
        </p>
        <form className="mt-8 sm:flex">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full px-5 py-3 border border-transparent text-base rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white focus:border-white sm:max-w-xs"
            placeholder="Enter your email"
          />
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
            <button
              type="submit"
              className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <Meta title="Home | LensCraft" />
      <HeroSection />
      <FeaturedProducts />
      <FeaturesSection />
      <NewsletterSection />
    </>
  );
};

export default HomePage;
