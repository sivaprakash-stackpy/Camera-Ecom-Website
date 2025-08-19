import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';

// Pages
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import OrderListPage from './pages/admin/OrderListPage';
import ProductListPage from './pages/admin/ProductListPage';
import ProductEditPage from './pages/admin/ProductEditPage';
import UserListPage from './pages/admin/UserListPage';
import UserEditPage from './pages/admin/UserEditPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search/:keyword" element={<HomePage />} />
              <Route path="/page/:pageNumber" element={<HomePage />} />
              <Route path="/search/:keyword/page/:pageNumber" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Protected Routes */}
              <Route path="/profile" element={<PrivateRoute />}>
                <Route path="" element={<ProfilePage />} />
              </Route>
              
              <Route path="/shipping" element={<PrivateRoute />}>
                <Route path="" element={<ShippingPage />} />
              </Route>
              
              <Route path="/payment" element={<PrivateRoute />}>
                <Route path="" element={<PaymentPage />} />
              </Route>
              
              <Route path="/placeorder" element={<PrivateRoute />}>
                <Route path="" element={<PlaceOrderPage />} />
              </Route>
              
              <Route path="/order/:id" element={<PrivateRoute />}>
                <Route path="" element={<OrderPage />} />
              </Route>
              
              {/* Admin Routes */}
              <Route path="/admin/orderlist" element={<AdminRoute />}>
                <Route path="" element={<OrderListPage />} />
              </Route>
              
              <Route path="/admin/productlist" element={<AdminRoute />}>
                <Route path="" element={<ProductListPage />} />
                <Route path="page/:pageNumber" element={<ProductListPage />} />
              </Route>
              
              <Route path="/admin/product/:id/edit" element={<AdminRoute />}>
                <Route path="" element={<ProductEditPage />} />
              </Route>
              
              <Route path="/admin/userlist" element={<AdminRoute />}>
                <Route path="" element={<UserListPage />} />
              </Route>
              
              <Route path="/admin/user/:id/edit" element={<AdminRoute />}>
                <Route path="" element={<UserEditPage />} />
              </Route>
              
              <Route path="*" element={<NotFoundPage />} />
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
    </Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
