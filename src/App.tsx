import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Home from 'pages/home';
import LayoutComponent from './layouts';
import LoginPage from 'pages/loginPage';
import PayCheck from 'pages/paymentPage/payment-check';
import Payment from 'pages/paymentPage';
import PayAddress from 'pages/paymentPage/payment-address';
import PayAnnounce from 'pages/paymentPage/payment-announment';
import DetailPage from 'pages/detailPage';
import Cart from 'pages/cart';
import Search from 'pages/searchPage';
import { auth, db, useAuth } from './queries/api/firebase';
import ErrorURL from 'pages/error';
import Category from 'pages/categoryPage';
import AdminOrderState from './components/dashboard/admin/orders';

import UserOrders from './components/dashboard/users/orders';
import UserBoughtProduct from './components/dashboard/users/boughtProduct';
import AdminListProduct from './components/dashboard/admin/list-products';
import ProtectPrivateRouteAdmin from './components/dashboard/admin/protect-router-admin';
import ProtectPrivateRouteUser from './components/dashboard/users/protect-router-user';
import UserDashboardPage from 'pages/dashboardUserPage';
import AdminDashboardPage from 'pages/dashboardAdminPage';
import AdminEdit from './components/dashboard/admin/edit-infomation';
import UserEdit from './components/dashboard/users/edit-infomation';

export default function App() {
  const currentUser = auth.currentUser;

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* {currentUser != undefined ? ( */}
          <Route path="" element={<LayoutComponent />}>
            <Route index element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/category" element={<Category />} />
            <Route path="/search/:keyword" element={<Search />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/payment" element={<Payment />}>
              <Route path="address" element={<PayAddress />} />
              <Route path="done" element={<PayAnnounce />} />
              <Route path="check" element={<PayCheck />} />
            </Route>

            <Route
              path="/admin"
              element={
                <ProtectPrivateRouteAdmin>
                  <AdminDashboardPage />
                </ProtectPrivateRouteAdmin>
              }
            >
              <Route path="" element={<AdminListProduct />} />
              <Route path="products" element={<AdminListProduct />} />
              <Route path="orders" element={<AdminOrderState />} />
              <Route path="edit" element={<AdminEdit />} />

            </Route>
            <Route
              path="/user"
              element={
                <ProtectPrivateRouteUser>
                  <UserDashboardPage />
                </ProtectPrivateRouteUser>
              }
            >
              <Route path="" element={<UserOrders />} />
              <Route path="orders" element={<UserOrders />} />
              <Route path="edit" element={<UserEdit />} />

              {/* <Route path="products" element={<UserBoughtProduct />} /> */}
            </Route>
          </Route>

          <Route path="*" element={<ErrorURL />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
