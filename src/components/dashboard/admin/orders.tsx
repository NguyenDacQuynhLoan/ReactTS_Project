// import formatCurrency from '/components/currency';

import formatCurrency from '../../currency';
import { useEffect, useRef, useState } from 'react';
import DetailModal from '../../modal/modal-detail';
import { db } from '../../../queries/api/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function AdminOrderState(props: any) {
  const [listOrders, setListOrders] = useState<any>();
  const [detailProductId, setDetailProductId] = useState<any>();
  const [userInfo, setUserInfo] = useState<any>();

  const [isDetail, setDetail] = useState(false);

  // const addClass = useRef<any>();
  useEffect(() => {
    getOrders();

    if (props.listOrders !== undefined) {
      console.log(props.listOrders);
      setListOrders(props.listOrders);
    }
  }, []);
  const getOrders = () => {
    let listOrders: any = [];
    getDocs(collection(db, 'orders')).then((data) => {
      data.forEach((doc) => {
        listOrders.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      console.log(listOrders);
      
      if (listOrders !== undefined) {
        setListOrders(listOrders);
      }
    });
  };
  const openModal = (confirm: boolean) => {
    setDetail(confirm);
  };
  const sendProductId = (id: string) => {
    setDetailProductId(id);
  };

  return (
    <div className="">
      {/* <div className="pt-4">
        <div className=" flex w-full justify-evenly 	">
          <button className="btn-order cursor-pointer w-1/6 h-full">
            <span className="font-semibold">Tất cả </span>
          </button>
          <button className="btn-order cursor-pointer  w-1/6 h-full ">
            <span className="font-semibold">Chờ xác nhận</span>
          </button>
          <button className="btn-order cursor-pointer  w-1/6 h-full ">
            <span className="font-semibold">Đang giao</span>
          </button>
          <button className="btn-order cursor-pointer  w-1/6 h-full ">
            <span className="font-semibold">Đã giao</span>
          </button>
          <button className="btn-order cursor-pointer  w-1/6 h-full ">
            <span className="font-semibold">Đã hủy</span>
          </button>
        </div>
      </div> */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th scope="col" className="px-6 py-3 ">
                #
              </th>
              <th scope="col" className="px-6 py-3 w-1/6">
                ID hóa đơn
              </th>
              <th scope="col" className="hidden md:lg:block md:lg:px-6 md:lg:py-3 md:lg:w-1/6 md:lg:text-center">
                Đơn giá
              </th>
              <th scope="col" className="hidden md:lg:block md:lg:px-6 md:lg:py-3 md:lg:w-1/6 md:lg:text-center">
                Tài khoản
              </th>
              <th scope="col" className="hidden md:lg:block md:lg:px-6 md:lg:py-3 md:lg:w-1/6 md:lg:text-center">
                Ngày đặt hàng
              </th>
              <th scope="col" className="hidden md:lg:block md:lg:px-6 md:lg:py-3 md:lg:w-1/6 md:lg:text-center">
                Ngày giao (dk)
              </th>
              <th scope="col " className="hidden md:lg:block md:lg:px-6 md:lg:py-3 md:lg:w-1/6 md:lg:text-center">
                Tình trạng
                {/* <i className="fa fa-sort-up"></i> */}
              </th>
              <th scope="col" className="px-6 py-3 w-1/6 text-center ">
                Thông tin
              </th>
              {/* <th scope="col" className="px-6 py-3 w-1/6">
                <span className="sr-only">Edit</span>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {listOrders !== undefined &&
              listOrders.map((item: any, index: number) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  {/* <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  Loan
                </th> */}
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="w-1/6 px-6 py-4">{item.id}</td>
                  <td className="hidden md:lg:block  md:lg:w-1/6 md:lg:px-6 md:lg:py-4 md:lg:text-center md:lg:text-red-500 md:lg:font-semibold md:lg:text-lg">
                    {formatCurrency.format(item.totalbill)}
                  </td>
                  <td className="w-1/6 px-6 py-4 text-center">TK</td>

                  <td className=" px-6 py-4">1/5/2022</td>
                  <td className="w-1/6 px-6 py-4">6/7/2022</td>
                  <td className="w-1/6 px-6 py-4 text-center">
                    {item.orderState == 'confirm' ? (
                      <button className="focus:outline-none p-2 text-white bg-yellow-500 rounded-full">
                        {item.orderState}
                      </button>
                    ) : (
                      ''
                    )}
                    {item.orderState == 'shipping' ? (
                      <button className="focus:outline-none p-2 text-white bg-blue-500 rounded-full">
                        {item.orderState}
                      </button>
                    ) : (
                      ''
                    )}
                    {item.orderState == 'deleted' ? (
                      <button className="focus:outline-none p-2 text-white bg-red-500 rounded-full">
                        {item.orderState}
                      </button>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="w-1/6 px-6 py-4 text-center">
                    <a
                      onClick={() => {
                        sendProductId(item.id);
                        setDetail(true);
                        setUserInfo(item);
                      }}
                      className="font-medium text-gray-600 dark:text-blue-500 hover:underline cursor-pointer"
                    >
                      <i className="fas fa-bars hover:text-orange-500 text-2xl"></i>
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>
        {isDetail ? (
          <DetailModal
            userInfo={userInfo}
            detailProduct={detailProductId}
            isModalOpen={openModal}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
