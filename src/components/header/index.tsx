import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './style.scss';
import { auth, logout, useAuth } from '../../queries/api/firebase';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import { cleanUserInfo } from 'store/reducer/userInfo';

export default function Header(props: any) {
  const userInfo = useAppSelector((state: RootState) => state.userInfo).userInfo;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = auth.currentUser;
  const [search, setSeach] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [openTab, setOpenTab] = useState(false);

  useEffect(() => {}, [props]);
  const searching = (keyword: string) => {
    setSeach(keyword);
  };

  const handleLogout = () => {
    logout(auth);
    dispatch(cleanUserInfo(true));
    localStorage.clear();
    navigate('/login');
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
              {userInfo.photoURL ? (
                <div className="contact-container flex mx-3">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={
                      userInfo.photoURL !== ''
                        ? userInfo.photoURL
                        : 'https://lh3.googleusercontent.com/a-/AOh14GgpGYmmltaoYz4t8lsmJveUsb_bjoDxspCClkOOaw=s96-c'
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
              if (!isOpen) {
                setOpen(true);
              } else {
                setOpen(false);
              }
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

      {/* mobile */}
      {isOpen ? (
        <nav
          id="sidebar"
          className="block md:lg:hidden fixed text-gray-300 h-full ml-12 z-10 pin-y bg-gray-700 shadow-md w-full sm:w-1/3 lg:w-1/4 sidebar-inactive"
        >
          <div className="text-lg py-6 px-3 bg-grey-lighter border-grey-light border-b text-grey-darkest">
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
                  // onClick={() => setIsToggleMobibleNav(false)}
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
                <div onClick={() => setOpen(false)} className=" flex mx-3 gap-3 items-center">
                  <i className="fa fa-cart-plus hover:text-orange-500 text-2xl "></i>
                  <span>Giỏ hàng</span>
                </div>
              </Link>
            </li>

            <li className="hover:bg-teal my-2">
              <Link
                to={
                  userInfo.role == 'admin' ? '/admin' : userInfo.role == 'user' ? '/user' : '/login'
                }
              >
                <div className="flex mx-3 w-full items-center ">
                  <div
                    onClick={() => {
                      if (!openTab) {
                        setOpenTab(true);
                      } else {
                        setOpenTab(false);
                      }
                      // setOpen(false);
                    }}
                    className=""
                  >
                    <i className="fas fa-user hover:text-orange-500 text-2xl mx-1"></i>
                    {currentUser ? <span>{userInfo.name}</span> : <span>Tài khoản</span>}
                  </div>

                  <div className="">
                    <button className=" ">
                      <i className={openTab ? 'hidden' : 'fa-solid fa-caret-left px-3 mt-1'}></i>
                    </button>
                    <i className={openTab ? 'fa-solid fa-sort-down mb-2 px-3 mt-1' : 'hidden'}></i>
                  </div>
                </div>
                {currentUser ? (
                  <div>
                    {userInfo.role == 'admin' ? (
                      /* Admin */
                      <div>
                        {openTab ? (
                          <div className="flex flex-col w-1/2 items-start ml-12">
                            <button onClick={() => setOpen(false)} className="my-3">
                              <Link to={'/admin/products'}>
                                <span className=" text-left"> Danh sách sản phẩm</span>
                              </Link>
                            </button>
                            <button onClick={() => setOpen(false)} className="my-3">
                              <Link to={'/admin/orders'}>
                                <span className="text-left"> Đơn hàng</span>
                              </Link>
                            </button>
                            <button onClick={() => setOpen(false)} className="my-3">
                              <Link to={'/admin/edit'}>
                                <span className="text-left"> Thông tin cá nhân</span>
                              </Link>
                            </button>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    ) : (
                      /* User */
                      <div>
                        {openTab ? (
                          <div className="flex flex-col w-1/2 items-start ml-12">
                            <button onClick={() => setOpen(false)} className="my-3">
                              <Link to={'/user/orders'}>
                                <span className="text-left"> Đơn hàng</span>
                              </Link>
                            </button>
                            <button onClick={() => setOpen(false)} className="my-3">
                              <Link to={'/user/edit'}>
                                <span className="text-left"> Thông tin cá nhân</span>
                              </Link>
                            </button>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  ''
                )}
              </Link>
            </li>
            <Link to="/category">
              <li className="hover:bg-teal my-2">
                <div onClick={() => setOpen(false)} className="flex mx-3 gap-3 items-center">
                  <i className="fas fa-store hover:text-orange-500 text-2xl"></i>
                  <span>Danh sách sản phẩm</span>
                </div>
              </li>
            </Link>
            <li className="hover:bg-teal my-2">
              <button
                onClick={() => {
                  // setOpen(false);
                  handleLogout();
                }}
                className={currentUser ? 'flex mx-3 gap-3 items-center' : 'hidden'}
              >
                <i className="fas fa-sign-out hover:text-orange-500 text-2xl"></i>
                <span>Đăng xuất</span>
              </button>
            </li>
          </ul>
        </nav>
      ) : (
        ''
      )}
    </div>
  );
}
