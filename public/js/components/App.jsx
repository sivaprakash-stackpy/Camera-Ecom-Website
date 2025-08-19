import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Header from './layout/Header';
import Footer from './layout/Footer';
import Loader from './common/Loader';
import Message from './common/Message';

// Pages
import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import ShippingPage from '../pages/ShippingPage';
import PaymentPage from '../pages/PaymentPage';
import PlaceOrderPage from '../pages/PlaceOrderPage';
import OrderPage from '../pages/OrderPage';
import OrderListPage from '../pages/admin/OrderListPage';
import ProductListPage from '../pages/admin/ProductListPage';
import ProductEditPage from '../pages/admin/ProductEditPage';
import UserListPage from '../pages/admin/UserListPage';
import UserEditPage from '../pages/admin/UserEditPage';
import PageNotFound from '../pages/PageNotFound';

// Actions
import { listProducts } from '../actions/productActions';
import { listMyOrders } from '../actions/orderActions';

const App = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Load products on app mount
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // Load user orders if logged in
  useEffect(() => {
    if (userInfo) {
      dispatch(listMyOrders());
    }
  }, [dispatch, userInfo]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search/:keyword" element={<HomePage />} />
            <Route path="/page/:pageNumber" element={<HomePage />} />
            <Route
              path="/search/:keyword/page/:pageNumber"
              element={<HomePage />}
            />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />}>
              <Route path=":id" element={<CartPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            <Route path="/order/:id" element={<OrderPage />} />
            <Route path="/admin/orderlist" element={<OrderListPage />} />
            <Route path="/admin/productlist" element={<ProductListPage />} />
            <Route
              path="/admin/productlist/:pageNumber"
              element={<ProductListPage />}
            />
            <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
            <Route path="/admin/userlist" element={<UserListPage />} />
            <Route path="/admin/user/:id/edit" element={<UserEditPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
};

export default App;
