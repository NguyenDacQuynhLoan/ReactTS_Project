import './style.scss';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import { useEffect, useState } from 'react';

export default function Payment() {
  // const userInfo = useAppSelector((state: RootState) => state.userInfo).userInfo;
  const [isDisable, setDisable] = useState(true);
  useEffect(() => {
    // if (
    //   userInfoFromRedux.name != '' &&
    //   userInfoFromRedux.phone != '' &&
    //   userInfoFromRedux.address != ''
    // ) {
    //   setDisable(false);
    // } else setDisable(true);
  }, []);

  return (
    <div className="payment">
      <div className="flex w-full justify-evenly mt-3">
        <Link to="/payment/address">
          <button className="bg-orange-400 font-bold rounded p-2  mb-2">1. Vận chuyển</button>
        </Link>
        <Link to="/payment/check">
          <button
            disabled={true}
            className="bg-orange-400 font-bold rounded p-2  mb-2  cursor-pointer"
          >
            2. Thanh toán
          </button>
        </Link>
        <Link to="/payment/done">
          <button className="bg-orange-400 font-bold rounded p-2  mb-2">3. Đặt hàng</button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
