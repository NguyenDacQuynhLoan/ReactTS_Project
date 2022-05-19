import { db } from '../../../queries/api/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import AdminListProduct from './list-products';
import AdminOrderState from './orders';
import EditModal from '../../../components/modal/modal-admin-edit';
import { Outlet } from 'react-router-dom';
import { getDocData } from 'shared/products';

export default function AdminManagement(props: any) {
  const [isOrders, setOrders] = useState(false);
  const [listOrders, setListOrders] = useState<any>();
  const [isEdit, setEdit] = useState(false);
  

  useEffect(() => {
 
    setOrders(props.orders);
    // editing()
  }, [props]);
  // const editing = ()=>{    
  //   if(props.edit){
  //     setEdit(true)
  //   setOrders(false);

  //   }
  // }

  return (
    <div className="w-full">
      <Outlet/>
    </div>
  );
}
