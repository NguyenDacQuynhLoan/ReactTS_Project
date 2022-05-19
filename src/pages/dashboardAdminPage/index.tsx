import { useEffect, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import UserManagement from '../../components/dashboard/users/users-management';
import ShareDashboardSidebar from '../../components/dashboard/admin/sidebar';
import AdminManagement from '../../components/dashboard/admin/admin-management';
import { auth, db } from '../../queries/api/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/dashboard/admin/sidebar';

export default function AdminDashboardPage() {
  return (
    <div className="flex w-full">
      <div className="hidden md:lg:w-1/6 md:lg:block min-h-screen">
        <AdminSidebar />
      </div>
      <div className="md:lg:w-5/6 w-full">
        <Outlet />
      </div>
  
    </div>
  );
  //   return (
  //     <div>
  //       <div className="flex min-h-screen">
  //         {isOpen ? (
  //           <div className="w-1/6 ">
  //             <ShareDashboardSidebar/>
  //           </div>
  //         ) : (
  //           ''
  //         )}
  //         <div className={isOpen ? 'w-5/6 flex relative' : 'w-full flex relative'}>
  //           <div
  //             className={
  //               isOpen ? ' right-full absolute text-white px-3' : ' bg-gray-800 text-white px-3'
  //             }
  //           >
  //             <div className="flex flex-col gap-3">
  //               <button onClick={() => setOpen(!isOpen)}>
  //                 <i className={isOpen ? 'fa fa-angle-double-left' : 'fa fa-angle-double-right'}></i>
  //               </button>
  //               <button className={isOpen ? 'hidden ' : ''}>
  //                 <i className="fa fa-comment  mx-1"></i>
  //               </button>
  //               <button className={isOpen ? 'hidden ' : ''}>
  //                 <i className="fas fa-bell  mx-1"></i>
  //               </button>
  //             </div>
  //           </div>
  //           <div className="w-full ">

  //             <Outlet/>
  //             {/* {admin ?   <Outlet/> : ''}
  //             {user ?  <Outlet/> : ''} */}
  //             {/* {admin ? <AdminManagement edit={isEdit} orders={isAdminOrders} /> : ''}
  //             {user ? <UserManagement edit={isEdit} orders={isUserOrders}/> : ''} */}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
}
