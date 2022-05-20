import { auth, db, logout, useAuth } from '../../../queries/api/firebase';
import { useNavigate } from 'react-router-dom';
import './sidebar.scss';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { cleanUserInfo } from 'store/reducer/userInfo';
export default function UserSidebar(props: any) {
  const userInfo = useAppSelector((state: RootState) => state.userInfo).userInfo;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    logout(auth);
    dispatch(cleanUserInfo(true));
    localStorage.clear();
    navigate('/login');
  };
  return (
    <div className="flex h-full">
      <div className="profile-person py-3 w-full flex flex-col bg-gray-800 text-white">
        <div className="user flex flex-col ">
          <div className="user-avatar mx-auto">
            <img
              className="w-20 h-20 rounded-full object-cover"
              src={
                userInfo.photoURL
                  ? userInfo.photoURL
                  : 'https://john-mohamed.com/wp-content/uploads/2018/05/Profile_avatar_placeholder_large.png'
              }
              // src={userInfo.photoURL}
              alt=""
            />
          </div>
          <div className="user-nofi flex mx-auto p-4">
            <i className="fa fa-comment text-gray-400 mx-1"></i>
            <i className="fas fa-bell text-gray-400 mx-1"></i>
          </div>
          <div className="user-info mb-4 mx-auto ">
            <p className="text-center mb-3 text-2xl">User</p>
            <p className="truncate">
              {userInfo.email ? userInfo.email.replace('@gmail.com', '') : ''}
            </p>
          </div>
        </div>
        <hr />
        {/* <div className="person-edit ml-5">
          <div className="my-4">
            <p className="ml-2 text-lg">Quản lý</p>

            <ul className="ml-5 cursor-pointer">
              <Link to={'/user/orders'}>
                <li className="hover:text-orange-500">Đơn hàng</li>
              </Link>
            </ul>
          </div>
          <div className="my-4">
            <p className="ml-2 text-lg">Thông tin cá nhân </p>
            <ul className="ml-5 cursor-pointer">
            <Link to={'/user/edit'}>
              <li className="hover:text-orange-500">
                Hồ sơ
              </li>
            </Link>
              <li className="hover:text-orange-500">Địa chỉ</li>
              <li>
                <button onClick={handleLogout} className="text-red-500 font-medium">
                  Đăng xuất
                </button>
              </li>
            </ul>
          </div>
        </div> */}
        <div className="person-edit ml-5">
          <div className="my-4">
            <p onClick={() => console.log(userInfo)} className="ml-2 text-lg">
              Quản lý
            </p>

            <ul className="ml-5 cursor-pointer">
              {/* <Link to={'/admin/products'}>
              <li className="hover:text-orange-500">Danh sách sản phẩm</li>
              </Link> */}
              <Link to={'/user/orders'}>
                <li className="hover:text-orange-500">Đơn hàng</li>
              </Link>
            </ul>
          </div>
          <div className="my-4">
            <p className="ml-2 text-lg">Thông tin cá nhân </p>
            <ul className="ml-5 cursor-pointer">
              <Link to={'/user/edit'}>
                <li className="hover:text-orange-500">Hồ sơ</li>
              </Link>
              <li className="hover:text-orange-500">Địa chỉ</li>
              <li>
                <button onClick={handleLogout} className="text-red-500 font-medium">
                  Đăng xuất
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
//   {user ? (
//   <ul className="ml-5 cursor-pointer">
//   <Link to={'/dashboard/products'}>
//     <li className="hover:text-orange-500 ">Sản phẩm </li>
//   </Link>
//   <li className="hover:text-orange-500">Theo dõi đơn hàng</li>
// </ul>
// ) : (
// ''
// )}
