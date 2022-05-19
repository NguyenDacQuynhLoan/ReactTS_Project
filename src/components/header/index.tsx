import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './style.scss';
import { auth, useAuth } from '../../queries/api/firebase';
import { useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import { current } from '@reduxjs/toolkit';

export default function Header(props: any) {
  const userInfo = useAppSelector((state: RootState) => state.userInfo).userInfo;
  const [search, setSeach] = useState('');
  const currentUser = auth.currentUser;
  const searching = (keyword: string) => {
    setSeach(keyword);
  };

  return (
    <div className="header  ">
      <div className="wrapped ">
        <div className="header-container justify-between py-1 flex items-center text-white text-sm">
          <div className=" w-full logo md:w-1/6 lg:w-1/6 mr-2.5 ">
            <Link to="/">
              <img
                className="my-auto mx-5"
                src="https://firebasestorage.googleapis.com/v0/b/shopping-online-16b07.appspot.com/o/logo.png?alt=media&token=15d781ab-0134-4be3-9871-66830313a3f9"
                alt=""
              />
            </Link>
          </div>

          <div className="hidden md:block lg:block search w-1/3 flex md:flex lg:flex  bg-gray-100 cursor-pointer">
            <input
              placeholder="Nhập sản phẩm tìm kiếm"
              onChange={(e) => searching(e.target.value)}
              className="focus:outline-none w-full text-black py-2 px-1 mx-2  bg-gray-100 "
              type="text"
              list="find-product"
            />
            <Link to={!search ? '/' : `search/${search}`}>
              <div className=" py-2 px-3 bg-orange-500">
                <i className="fa fa-search "></i>
              </div>
            </Link>
          </div>
          <div className="contact hidden md:block md:flex lg:block lg:flex w-1/2 flex gap-x-1 font-bold  justify-end  ml-4 cursor-pointer">
            {/* <div className="contact-container flex mx-2">
              <i className="fas fa-heart hover:text-orange-500 text-2xl"></i>
            </div> */}
            {userInfo.role == 'admin' ? (
              ''
            ) : (
              <Link to="/cart">
                <div className=" contact-container flex mx-3">
                  <i className="fa fa-cart-plus hover:text-orange-500 text-2xl "></i>
                </div>
              </Link>
            )}
            <Link
              to={
                userInfo.role == 'admin' ? '/admin' : userInfo.role == 'user' ? '/user' : '/login'
              }
            >
              {currentUser ? (
                <div className="contact-container flex mx-3">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={
                      userInfo.photoURL
                        ? userInfo.photoURL
                        : 'https://john-mohamed.com/wp-content/uploads/2018/05/Profile_avatar_placeholder_large.png'
                    }
                    alt=""
                  />
                </div>
              ) : (
                <div className="contact-container flex mx-3">
                  <i className="fas fa-user hover:text-orange-500 text-2xl"></i>
                </div>
              )}
            </Link>
          </div>

          <button
            onClick={(e) => {
              props.isToggle(true);
            }}
            className="mobile-menu-button md:hidden lg:hidden inline-block px-6 py-2.5  text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:text-orange-500 hover:shadow-lg focus:text-orange-500 focus:shadow-lg  focus:outline-none focus:ring-0 active:text-orange-500 active:shadow-lg transition duration-150 ease-in-out mr-1.5"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            <i className="fas fa-bars hover:text-orange-500 text-2xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
