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
  const userInfo = useAppSelector((state: RootState) => state.userInfo).userInfo;
  const [isToggleMobibleNav, setIsToggleMobibleNav] = useState(false);
  const [search, setSeach] = useState('');
  const [open, setOpen] = useState(false);
  const currentUser = auth.currentUser
  const listLaptop = ['Macbook', 'ASUS', 'Dell'];

  const navigate = useNavigate();

  const isToggleFunc = (e: boolean) => {
    setIsToggleMobibleNav(e);
  };

  const searching = (keyword: string) => {
    setSeach(keyword);
  };
  const handleLogout = () => {
    logout(auth);
    navigate('/login');
    localStorage.clear();
  };
  return (
    <div className="layout bg-gray-50">
      <div className=" sticky w-full overflow-hidden top-0 ">
        <Header isToggle={isToggleFunc} />
      </div>

      <div className="">
        {isToggleMobibleNav ? (
          <nav
            id="sidebar"
            className="block md:lg:hidden fixed text-gray-300 h-full ml-12 z-10 pin-y bg-gray-700 shadow-md w-full sm:w-1/3 lg:w-1/4 sidebar-inactive"
          >
            <button
              className="flex  gap-3 items-center mx-4 py-2"
              onClick={() => setIsToggleMobibleNav(false)}
            >
              <i className="fas fa-caret-left text-2xl"></i>Close
            </button>

            <div className="text-lg pt-2 pb-6 px-3 bg-grey-lighter border-grey-light border-b text-grey-darkest">
              <div className="search w-3/5 ml-3 flex  bg-gray-100 cursor-pointer">
                <input
                  placeholder="Nhập sản phẩm tìm kiếm"
                  onChange={(e) => searching(e.target.value)}
                  className="focus:outline-none w-full text-black py-2 px-1 mx-2  bg-gray-100 "
                  type="text"
                  list="find-product"
                />
                <Link to={!search ? '/' : `search/${search}`}>
                  <div
                    onClick={() => setIsToggleMobibleNav(false)}
                    className=" py-2 px-3 bg-orange-500"
                  >
                    <i className="fa fa-search "></i>
                  </div>
                </Link>
              </div>
            </div>

            <ul className="my-4">
              <li className="hover:bg-teal my-2">
                <Link to="/cart">
                  <div
                    onClick={() => setIsToggleMobibleNav(false)}
                    className=" flex mx-3 gap-3 items-center"
                  >
                    <i className="fa fa-cart-plus hover:text-orange-500 text-2xl "></i>
                    <span>Giỏ hàng</span>
                  </div>
                </Link>
              </li>
              <li className="hover:bg-teal my-2">
                <Link
                  to={
                    userInfo.role == 'admin'
                      ? '/admin'
                      : userInfo.role == 'user'
                      ? '/user'
                      : '/login'
                  }
                >
                  <div className="flex mx-3 w-full items-center ">
                    <div onClick={() => setIsToggleMobibleNav(false)} className="">
                      <i className="fas fa-user hover:text-orange-500 text-2xl mx-1"></i>
                      {currentUser?
                      <span>{userInfo.name}</span>:
                      <span>Tài khoản</span>
                    }
                    </div>
                    <div className="">
                      <button className=" " onClick={() => setOpen(true)}>
                        <i className={open ? 'hidden' : 'fa-solid fa-caret-left px-3 mt-1'}></i>
                      </button>
                      <i
                        onClick={() => setOpen(false)}
                        className={open ? 'fa-solid fa-sort-down mb-2 px-3 mt-1' : 'hidden'}
                      ></i>
                    </div>
                  </div>
                  {userInfo.role == 'admin' ? (
                    <div>
                      {open ? (
                        <ul className="ml-12">
                          <Link to={'/admin/products'}>
                            <li  className='my-3'> Danh sách sản phẩm</li>
                          </Link>
                          <Link to={'/admin/orders'}>
                            <li  className='my-3'> Đơn hàng</li>
                          </Link>
                          <Link to={'/admin/edit'}>
                            <li  className='my-3'> Thông tin cá nhân</li>
                          </Link>
                        </ul>
                      ) : (
                        ''
                      )}
                    </div>
                  ) : (
                    <div>
                      {open ? (
                        <ul className="ml-12">
                          {/* <Link to={'/user/products'}>
                            <li> Sản phẩm</li>
                          </Link> */}
                          <Link to={'/user/orders'}>
                            <li className='my-3'> Đơn hàng</li>
                          </Link>
                          <Link to={'/user/edit'}>
                          <li className='my-3'> Thông tin cá nhân</li>
                          </Link>
                        </ul>
                      ) : (
                        ''
                      )}
                    </div>
                  )}
                </Link>
              </li>
              <Link to="/category">
                <li className="hover:bg-teal my-2">
                  <div
                    onClick={() => setIsToggleMobibleNav(false)}
                    className="flex mx-3 gap-3 items-center"
                  >
                    <i className="fas fa-store hover:text-orange-500 text-2xl"></i>
                    <span>Danh sách sản phẩm</span>
                  </div>
                </li>
              </Link>
              <li className="hover:bg-teal my-2">
                <div
                  onClick={() => {
                    setIsToggleMobibleNav(false);
                    handleLogout();
                  }}
                  className="flex mx-3 gap-3 items-center"
                >
                  <i className="fas fa-sign-out hover:text-orange-500 text-2xl"></i>
                  <span>Đăng xuất</span>
                </div>
              </li>
            </ul>
          </nav>
        ) : (
          ''
        )}
      </div>
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
}
