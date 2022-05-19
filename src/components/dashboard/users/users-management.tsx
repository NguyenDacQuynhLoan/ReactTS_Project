import { db } from '../../../queries/api/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import UserOrders from './orders';
import UserBoughtProduct from './boughtProduct';
export default function UserManagement(props:any) {
  const [isOrders, setOrders] = useState(false);
  useEffect(() => {
    setOrders(props.orders);
  }, [props]);
  // const getCurrentUserInfo = () => {
  //   let info: any = [];
  //   getDocs(collection(db, 'users'))
  //     .then((data) => {
  //       data.docs.forEach((doc) => {
  //         info.push({
  //           ...doc.data(),
  //           id: doc.id,
  //         });
  //       });
  //       setInfo(info.filter((element: any) => element.userID == currentUser?.uid));
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // };
  return <div className="w-full"></div>;
}
