import { useEffect, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import UserManagement from '../../components/dashboard/users/users-management';
import ShareDashboardSidebar from '../../components/dashboard/admin/sidebar';
import AdminManagement from '../../components/dashboard/admin/admin-management';
import { auth, db } from '../../queries/api/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Outlet } from 'react-router-dom';
import UserSidebar from '../../components/dashboard/users/sidebar';

export default function UserDashboardPage() {
  return (
    <div className='flex'>
      <div className='hidden md:lg:w-1/6 md:lg:block min-h-screen' >
      <UserSidebar />
      </div>
      <div className="w-full">
          <Outlet/>
      </div>
    </div>
  );
}
/*  const userInfo = useAppSelector((state: RootState) => state.userInfo).userInfo;

  const [isOpen, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (Object.keys(userInfo).length == 0) {
      check();
    }
  }, []);
  const check = async() => {
    let currentID = JSON.parse(localStorage.getItem('user')!) || [];

    // if (currentUser !== null) {
    let listUser: any = [];
    await getDocs(collection(db, 'users')).then((data) => {
      data.forEach((doc) => listUser.push(doc.data()));
      let temp = listUser.filter((item: any) => item.userID == currentID && item.role == 'admin');
    });

    // }
  };
  return (
    <div>
      {loading ? (
        'loading...'
      ) : (
        <div className="flex min-h-screen">
          {isOpen ? (
            <div className="w-1/6 ">
              <ShareDashboardSidebar />
            </div>
          ) : (
            ''
          )}
          <div className={isOpen ? 'w-5/6 flex relative' : 'w-full flex relative'}>
            <div
              className={
                isOpen ? ' right-full absolute text-white px-3' : ' bg-gray-800 text-white px-3'
              }
            >
              <div className="flex flex-col gap-3">
                <button onClick={() => setOpen(!isOpen)}>
                  <i
                    className={isOpen ? 'fa fa-angle-double-left' : 'fa fa-angle-double-right'}
                  ></i>
                </button>
                <button className={isOpen ? 'hidden ' : ''}>
                  <i className="fa fa-comment  mx-1"></i>
                </button>
                <button className={isOpen ? 'hidden ' : ''}>
                  <i className="fas fa-bell  mx-1"></i>
                </button>
              </div>
            </div>
            <div className="w-full ">
              <Outlet />
              {/* {admin ?   <Outlet/> : ''}
            {user ?  <Outlet/> : ''} 
               {admin ? <AdminManagement edit={isEdit} orders={isAdminOrders} /> : ''}
            {user ? <UserManagement edit={isEdit} orders={isUserOrders}/> : ''} 
            </div>
          </div>
        </div>
      )}
    </div>
  ); */