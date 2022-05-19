import { ReactChild, ReactChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db, useAuth } from '../../../queries/api/firebase';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import SpinnerLoading from '../../loading/loading-spinner';

interface Tprops {
  children: ReactChild | ReactChildren;
}

export default function ProtectPrivateRouteAdmin(props: any) {
  // const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state: RootState) => state.userInfo).userInfo;
  const [admin, setAdmin] = useState(false);
  const [photo, setPhoto] = useState('');
  const currentUser = auth.currentUser;
  // useEffect(() => {
  //   if (Object.keys(userInfo).length == 0) {
  //     check();
  //   }
  // }, []);
  // const check = async() => {
  //   let currentID = JSON.parse(localStorage.getItem('user')!) || [];

  //   // if (currentUser !== null) {
  //   let listUser: any = [];
  //   await getDocs(collection(db, 'users')).then((data) => {
  //     data.forEach((doc) => listUser.push(doc.data()));
  //     let temp = listUser.filter((item: any) => item.userID == currentID && item.role == 'admin');
  //     temp.forEach((item: any) => dispatch(addUserInfo(item)));
  //   });

  //   // }
  // };
  // const check = () => {
  //   if (currentUser !== null) {
  //     let listUser: any = [];

  //     getDocs(collection(db, 'users')).then((data) => {
  //       data.forEach((doc) => listUser.push(doc.data()));

  //     });
  //   }
  // };
  return <>
  
  {userInfo.role == 'admin' ? props.children : <Navigate to="/" />
  }</>;
}
