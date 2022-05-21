import { useAppDispatch, useAppSelector } from 'store/hooks';
import { db, useAuth } from '../../queries/api/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RootState } from 'store/store';
import { addToDelivery } from 'store/reducer/invoice-address';
import { toast } from 'react-toastify';
export default function Form() {
  const userInfo = useAppSelector((state: RootState) => state.userInfo).userInfo;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log(userInfo);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formValue = new FormData(e.target);
    let deliveryInfo = Object.fromEntries(formValue.entries());
    if (!Object.values(deliveryInfo).includes('')) {
      dispatch(addToDelivery(deliveryInfo));
      navigate('/payment/check');
    } else {
      toast.warning('Vui lòng kiểm tra lại thông tin', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit} className="mx-5 md:lg:mx-0 form">
      <div className="form-container">
        <div className="contact flex flex-col my-3">
          <div className="contact-head  ing">
            <p className="font-semibold text-lg py-3">Thông tin liên lạc</p>
          </div>
          {/* {info.map((item: any) => ( */}
          <div className="contact-content flex">
            <div className="w-1/2 flex flex-col mr-2 ">
              <p className="pb-2">Email :</p>
              <input
                readOnly
                name="email"
                defaultValue={userInfo.email}
                className="focus:outline-none border-none font-bold px-2 py-1  rounded"
              />
            </div>
            <div className="w-1/2 flex flex-col ">
              <p className="pb-2">Tài khoản:</p>
              <input
                readOnly
                name="account"
                defaultValue={userInfo.name}
                className="focus:outline-none border-none font-bold  px-2 py-1  rounded"
              />
            </div>
          </div>
          {/* ))} */}
        </div>
        <div className="shipping my-3">
          <div className="shipping-heading">
            <p className="font-semibold text-lg pb-3 pt-2">Địa chỉ giao hàng</p>
          </div>
          <div className="shipping-content">
            <div className="flex">
              <div className="w-1/2 flex flex-col mr-2">
                <p className="pb-2">Tên người nhận :</p>
                <input
                  name="userDelivery"
                  defaultValue={userInfo.name}
                  className="focus:outline-none border border-gray-300 font-bold  px-2 py-1  rounded"
                />
              </div>
              <div className="w-1/2 flex flex-col">
                <p className="pb-2">Số điện thoại :</p>
                <input
                  placeholder="Nhập số điện thoại (10 số)"
                  name="numberDelivery"
                  pattern="[0-9]{10}"
                  defaultValue={userInfo.phoneNumber}
                  className="focus:outline-none border border-gray-300 font-bold  px-2 py-1  rounded"
                />
              </div>
            </div>

            <div className="w-full flex flex-col ">
              <p className="pb-2">Địa chỉ:</p>
              <input
                pattern="(?=.*\d)(?=.*[a-z]).{8,}"
                placeholder="Nhập số địa chỉ (8 kí tự)"
                name="addressDelivery"
                defaultValue={userInfo.address}
                className="focus:outline-none border border-gray-300 font-bold  px-2 py-1  rounded"
              />
            </div>
            {/* <div className="">
              <p className="pb-2">Ghi chú :</p>
              <textarea
                rows={4}
                placeholder="Điền ghi chú ( nếu có )"
                name="note"
                className="focus:outline-none w-full border border-gray-300 px-2 py-1  rounded"
              />{' '}
            </div> */}
          </div>
        </div>
        <div className="btn w-full rounded p-2 justify-center flex hover:bg-orange-500 duration-300">
          <button type="submit" className="font-semibold hover:text-white">
            Tiếp tục
          </button>
        </div>
      </div>
    </form>
  );
}
