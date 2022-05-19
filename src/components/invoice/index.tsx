import { auth, db } from '../../queries/api/firebase';
import { collection, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import formatCurrency from '../currency';

import './style.scss';
import { addToInvoice } from 'store/reducer/invoice';
import { toast } from 'react-toastify';
export default function Invoice(props: any) {
  const userInfo = useAppSelector((state: RootState) => state.userInfo).userInfo;
  const cartFromRedux = useAppSelector((state: RootState) => state.cart).cart;
  const dispatch = useAppDispatch();
  const [amountRedux, setAmount] = useState<number>(0);
  const [totalRedux, setTotal] = useState<number>(0);
  const [shippingRedux, setShipping] = useState<number>(0);
  const [totalCostRedux, setTotalCost] = useState<number>(0);
  const [promo, setPromo] = useState('LOANNG');
  // const [isCheckInfo, setCheckInfo] = useState(false);

  const currentUser = auth.currentUser;
  useEffect(() => {
    total();
  }, [cartFromRedux]);

  // const checkUserInfo = async () => {
  //   const docRef = doc(db, 'users', userInfo.userID);
  //   const getData = await getDoc(docRef);
  //   if (getData.exists()) {
  //     let { photoURL, isActive, ...rest } = getData.data();
  //     if (Object.values(rest).includes('')) {
  //       toast.warn('Hoàn tất thông tin cá nhân trước khi đặt hàng !', {
  //         position: toast.POSITION.BOTTOM_RIGHT,
  //       });
  //       setCheckInfo(false);
  //     } else {
  //       setCheckInfo(true);
  //     }
  //   }
  // };
  const total = () => {
    let total = 0;
    let shipping = 0;
    for (let i = 0; i < cartFromRedux.length; i++) {
      total += Number(cartFromRedux[i].price * cartFromRedux[i].quantity);
    }

    if (total >= 20000000) {
      shipping = 150000;
    } else if (total >= 10000000 && total < 20000000) {
      shipping = 100000;
    } else if (total > 0 && total < 10000000) {
      shipping = 50000;
    }

    setAmount(cartFromRedux.length);
    setShipping(shipping);
    setTotal(total);

    let totalBill = shipping + total;
    setTotalCost(totalBill);
    let invoice = {
      amount: Number(cartFromRedux.length),
      ship: shipping,
      total: total,
      totalBill: totalBill,
    };
    dispatch(addToInvoice(invoice));
  };
  const promoShip = (value: string) => {
    if (value == promo) {
      setShipping(0);
      let total = 0;
      for (let i = 0; i < cartFromRedux.length; i++) {
        total += Number(cartFromRedux[i].price * cartFromRedux[i].quantity);
      }
      setTotal(total);
      setTotalCost(total);
      let invoice = {
        amount: cartFromRedux.length,
        total: total,
        totalBill: total,
        ship: 0,
      };
      dispatch(addToInvoice(invoice));
    } else {
      total();
    }
  };
  return (
    <div className="payment bg-gray-200 p-4 rounded-lg">
      <div className="title uppercase font-bold py-4">
        <h2>Giỏ hàng của bạn</h2>
      </div>
      <div className="check pb-4">
        <div className="flex justify-between py-1">
          <p>Số lượng sản phẩm</p>
          <p>{amountRedux}</p>
        </div>
        <div className="flex justify-between py-1">
          <p>Giá thành tiền</p>
          <p>{formatCurrency.format(totalRedux)}</p>
        </div>
        <div className="flex justify-between py-1">
          <p>Phí vận chuyển</p>
          <p>{formatCurrency.format(shippingRedux)}</p>
        </div>
        <div className="flex justify-between py-1">
          <p className="uppercase">Tổng</p>
          <p>{formatCurrency.format(totalCostRedux)}</p>
        </div>
      </div>

      <div className="promo pb-4">
        <div className="flex justify-between pt-3 items-center  pb-0">
          <p>Mã khuyến mãi</p>
          <input
            onChange={(e) => promoShip(e.target.value)}
            placeholder={promo}
            className="p-1 w-1/2 focus:outline-none rounded border border-slate-400"
            type="text"
            name=""
            id=""
          />
        </div>
      </div>
      <div className="method-info">
        <div className="flex items-center py-1 ">
          <i className="fa fa-truck "></i>
          <p>Bao gồm phí vận chuyển</p>
        </div>
        <div className="flex items-center py-1 ">
          <i className="fa fa-exchange "></i>
          <p>Không trả đổi hàng</p>
        </div>
      </div>
      <div  className="flex flex-col w-full">
        <Link to={currentUser ? '/payment/address' : ''}>
          <button
            onClick={() => {  
              if (!currentUser) {
                toast.warn('Vui lòng đăng nhập để mua sản phẩm', {
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
              }
              
            }}
            disabled={amountRedux == 0 }
            className="btn-member active:shadow-lg bg-orange-400 border p-2 text-lg rounded-lg font-semibold w-full"
          >
            Thanh toán
          </button>
        </Link>

        {/* <button className="btn-guest active:shadow-lg border-2 border-orange-400 p-2 mt-4 text-lg rounded-lg font-semibold">
            Thanh toán PT khách
          </button> */}
      </div>
    </div>
  );
}
