import { auth, db } from '../../queries/api/firebase';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { IImage, IOrderDetail } from '../../types/order-detail';
import formatCurrency from '../currency';
export default function DetailModal(props: any) {
  const options = ['laptop', 'phone', 'headphone', 'accessory'];
  const currentUser2 = auth.currentUser;
  const [order, setOrder] = useState<any>([]);
  const [user, setUser] = useState<any>([]);

  useEffect(() => {
    setUser(props.userInfo);
    const prod: any[] = [];
    getDocs(collection(db, `orders/${props.detailProduct}/product`)).then((data2) => {
      data2.forEach((doc2) => {
        prod.push(doc2.data());
      });

      setOrder(prod);
    });
  }, [props]);

  return (
    <div className=" fixed inset-0 flex items-end justify-center bg-gray-800 bg-opacity-40 md:lg:fixed md:lg:inset-0 md:lg:flex  md:lg:items-center md:lg:justify-center md:lg:bg-gray-800 md:lg:bg-opacity-30">
      <div className="w-full  p-6 bg-white divide-y divide-gray-500 md:lg:w-2/5 md:lg:p-6 md:lg:bg-white md:lg:divide-y md:lg:divide-gray-500">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl">Thông tin chi tiết</h3>
          <svg
            onClick={() => props.isModalOpen(false)}
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="mt-4 ">
          <div className="h-48 overflow-y-scroll ">
            {order.length > 0 &&
              order.map((item: any) => (
                <div
                  key={item.id}
                  className=" flex my-1 py-1 bg-gray-50 hover:bg-gray-100 duration-500"
                >
                  <img className="h-20 w-20" src={item.image[0]} alt="" />
                  <div className="flex flex-col">
                    <span>{item.nameProd}</span>
                    <span>{formatCurrency.format(item.price)}</span>
                  </div>
                </div>
              ))}
          </div>

          <div className="border border-gray-100 p-3">
            <span className='py-2 uppercase'>Thông tin giao hàng</span>
            <div className="flex flex-col">
              <span>Tên : {props.userInfo.name}</span>
              <span>SĐT : {props.userInfo.phoneNumber}</span>
              <span>Địa chỉ giao hàng : {props.userInfo.address}</span>
              <span>Ngày mua hàng : {props.userInfo.dateInvoice}</span>
              <span>Ngày giao (Dự kiến) : {props.userInfo.expectDateInvoice}</span>

            </div>
          </div>
          <div className=" flex flex-col p-3">
            <span>
              Tổng :{' '}
              <b className="text-red-500">
                {' '}
                {formatCurrency.format(Number(props.userInfo.totalbill))}
              </b>
            </span>
            <span>SL:{props.userInfo.amount}</span>
            <span>Ship:{formatCurrency.format(props.userInfo.ship)}</span>
          </div>
        </div>

        {/* <div className="mb-4 text-sm my-2 flex gap-2 justify-between">
            <input name="name" type="text" className="w-2/5 border border-gray-500" />
          </div> */}
        {/* <button
          type="submit"
          className="bg-gray-400 p-2 w-full "
  
        >
          Cập nhật
        </button> */}
      </div>
    </div>
  );
}
