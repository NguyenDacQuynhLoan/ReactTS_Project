// import formatCurrency from '/components/currency';

import formatCurrency from '../../currency';
import { useEffect, useRef, useState } from 'react';
import DetailModal from '../../modal/modal-detail';
import { db } from '../../../queries/api/firebase';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
// import moment from 'moment';
// import * as moment from 'moment';

export default function AdminOrderState(props: any) {
  const [listOrders, setListOrders] = useState<any>();
  const [detailProductId, setDetailProductId] = useState<any>();
  const [userInfo, setUserInfo] = useState<any>();
  const [isDetail, setDetail] = useState(false);
  useEffect(() => {
    getOrders();
    if (props.listOrders !== undefined) {
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
  const changeStateToDeleted = async (e: any, id: string) => {
    const deleted = doc(db, 'orders', id);
    const newChange = { orderState: e };
    updateDoc(deleted, newChange);
    getOrders();
  };
  return (
    <div className="">
      <div className="hidden md:lg:block">
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
                <th scope="col" className="px-6 py-3 w-1/6 text-center">
                  Đơn giá
                </th>
                <th scope="col" className="  px-6 py-3 w-1/6 text-center">
                  Tài khoản
                </th>
                <th scope="col" className="  px-6 py-3 w-1/6 text-center">
                  Ngày đặt hàng
                </th>
                <th scope="col" className="  px-6 py-3 w-1/6 text-center">
                  Ngày giao (dk)
                </th>
                <th scope="col " className="  px-6 py-3 w-1/6 text-center">
                  Tình trạng
                  {/* <i className="fa fa-sort-up"></i> */}
                </th>
                <th scope="col" className="px-6 py-3 w-1/6 text-center ">
                  Thông tin
                </th>
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
                    <td className="w-1/6 px-6 py-4 text-center text-red-500 font-semibold text-lg">
                      {formatCurrency.format(item.totalbill)}
                    </td>
                    <td className="w-1/6 px-6 py-4 text-center">{item.email}</td>

                    <td className=" px-6 py-4">{item.dateInvoice}</td>
                    <td className="w-1/6 px-6 py-4">{item.expectDateInvoice}</td>
                    <td className="w-1/6 px-6 py-4 text-center">
                      {item.orderState ? (
                        <select
                          onChange={(e) => changeStateToDeleted(e.target.value, item.id)}
                          className={
                            item.orderState == 'confirm'
                              ? 'focus:outline-none p-2 text-white bg-yellow-500 rounded'
                              : item.orderState == 'deleted'
                              ? 'focus:outline-none p-2 text-white bg-red-500 rounded'
                              : item.orderState == 'shipping'
                              ? 'focus:outline-none p-2 text-white bg-blue-500 rounded'
                              : ''
                          }
                        >
                          <option
                            hidden
                            className="bg-gray-300 text-gray-700 outline-none"
                            value={item.orderState}
                          >
                            {item.orderState}
                          </option>
                          <option
                            className="bg-gray-300 text-gray-700 outline-none"
                            value="confirm"
                          >
                            confirm
                          </option>
                          <option
                            className="bg-gray-300 text-gray-700 outline-none"
                            value="deleted"
                          >
                            deleted
                          </option>
                          <option
                            className="bg-gray-300 text-gray-700 outline-none"
                            value="shipping"
                          >
                            shipping
                          </option>
                        </select>
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
                        <i className=" fa fa-money-check-alt  hover:text-orange-500 text-2xl"></i>
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

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
      <div className="block md:lg:hidden">
        <div className="relative overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className=" text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
              <tr>
                <th scope="col" className="px-1 md:lg:px-6 md:lg:py-4">
                  #
                </th>
                <th scope="col" className="px-2 py-3 w-1/6 px-2 md:lg:w-1/6 md:lg:px-6 md:lg:py-3">
                  ID hóa đơn
                </th>
                <th scope="col " className="  px-6 py-3 w-1/6 text-center">
                  Tình trạng
                </th>
              </tr>
            </thead>
            <tbody>
              {listOrders !== undefined &&
                listOrders.map((item: any, index: number) => (
                  <tr
                    key={item.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-1 md:lg:px-6 md:lg:py-4">{index + 1}</td>
                    <td className="w-1/6 px-2 md:lg:w-1/6 md:lg:px-6 md:lg:py-4">
                      <span>{item.id}</span>
                      <span
                        onClick={() => {
                          sendProductId(item.id);
                          setDetail(true);
                          setUserInfo(item);
                        }}
                        className="block mt-3 active:underline text-blue-500  md:lg:hidden"
                      >
                        <i>Xem chi tiết hóa đơn</i>
                      </span>
                    </td>
                    <td className="w-1/6 px-6 py-4 text-center">
                      {item.orderState ? (
                        <select
                          onChange={(e) => changeStateToDeleted(e.target.value, item.id)}
                          className={
                            item.orderState == 'confirm'
                              ? 'focus:outline-none p-2 text-white bg-yellow-500 rounded'
                              : item.orderState == 'deleted'
                              ? 'focus:outline-none p-2 text-white bg-red-500 rounded'
                              : item.orderState == 'shipping'
                              ? 'focus:outline-none p-2 text-white bg-blue-500 rounded'
                              : ''
                          }
                        >
                          <option
                            hidden
                            className="bg-gray-300 text-gray-700 outline-none"
                            value={item.orderState}
                          >
                            {item.orderState}
                          </option>
                          <option
                            className="bg-gray-300 text-gray-700 outline-none"
                            value="confirm"
                          >
                            confirm
                          </option>
                          <option
                            className="bg-gray-300 text-gray-700 outline-none"
                            value="deleted"
                          >
                            deleted
                          </option>
                          <option
                            className="bg-gray-300 text-gray-700 outline-none"
                            value="shipping"
                          >
                            shipping
                          </option>
                        </select>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="hidden md:lg:block md:lg:w-1/6 md:lg:px-6 md:lg:py-4 md:lg:text-center">
                      <a
                        onClick={() => {
                          sendProductId(item.id);
                          setDetail(true);
                          setUserInfo(item);
                        }}
                        className="font-medium text-gray-600 dark:text-blue-500 hover:underline cursor-pointer"
                      >
                        <i className=" fa fa-money-check-alt  hover:text-orange-500 text-2xl"></i>
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
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
