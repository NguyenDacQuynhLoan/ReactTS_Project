import Header from '../components/header';
import Footer from '../components/footer';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.scss';
import { RootState } from 'store/store';
import { useAppSelector } from 'store/hooks';
import { auth, logout } from '../queries/api/firebase';
export default function LayoutComponent() {
  return (
    <div className="layout bg-gray-50">
      <div className=" sticky w-full overflow-hidden top-0 ">
        <Header />
      </div>

      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
}
