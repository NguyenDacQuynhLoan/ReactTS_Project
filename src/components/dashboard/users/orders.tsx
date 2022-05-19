import { collection, getDoc, getDocs, doc, where, query, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../../../queries/api/firebase';
import DetailModal from '../../modal/modal-detail';
import shipping from '../../../assets/img/shipping.png';
import './orders.scss';
import formatCurrency from '../../../components/currency';
import { useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import DeleteModal from '../../../components/modal/modal-delete';
export default function UserOrders() {
  const userInfoRedux = useAppSelector((state: RootState) => state.userInfo).userInfo;
  const [order, setOrder] = useState<any>([]);
  const [order2, setOrder2] = useState<any>([]);
  const [isDetail, setDetail] = useState(false);
  const [userInfo, setUserInfo] = useState<any>();
  const [detailProductId, setDetailProductId] = useState<any>();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleted, setDeleted] = useState('');

  useEffect(() => {
    getOrder();
  }, []);
  const getOrder = () => {
    const prod: any[] = [];

    getDocs(collection(db, `orders/`)).then((data) => {
      let newProd: any[] = [];
      data.docs.forEach((doc) => {        
        prod.push({ ...doc.data(), id: doc.id });
        newProd = prod.filter(
          (item) => item.orderState !== 'deleted' && item.userID == userInfoRedux.userID
        );
        setOrder(newProd);
      });
    });
  };
  // const getOrderDetail = (id: string) => {
  //   const prod2: any[] = [];

  //   getDocs(collection(db, `orders/${id}/product`)).then((data2) => {
  //     data2.docs.forEach((item) => prod2.push(item.data()));
  //     setOrder2(prod2);
  //   });
  // };
  const sendProductId = (id: string) => {
    setDetailProductId(id);
  };
  const deleteHandler = () => {
    setDeleteModal(true);
  };
  const modalHandler = (confirm: boolean) => {
    setDeleteModal(confirm);
  };
  const deleteReceipt = (accept: boolean,id:string) => {
    if (accept) {            
      const deleted = doc(db, 'orders', id);
      const newChange = { orderState: 'deleted' };
      updateDoc(deleted, newChange);
      getOrder();
      setDeleteModal(false);
    }
  };
  return (
    <div className="w-full">
      <div>
        <div></div>
      </div>

      <div className=" flex w-full	">
        <div className="w-full  mx-4">
          {order.length > 0? 
          <div>
            {order.map((item: any) => (
              <div>
                <div
                  key={item.id}
                  className=" flex w-full  items-center justify-between my-3 border border-gray-600	"
                >
                  <div className="btn-order cursor-pointer flex  h-full ">
                    <div className=" cursor-pointer  h-full">
                      <img className="w-20 h-20 opacity-30" src={shipping} alt="" />
                    </div>
                    <div className="flex flex-col">
                      <span className="my-3 text-gray-700">{item.id},</span>
                      <span
                        onClick={() => {
                          sendProductId(item.id);
                          setUserInfo(item);
                          setDetail(true);
                        }}
                        className="text-blue-500 hover:underline hover:decoration-green"
                      >
                        Xem chi tiết
                      </span>
                    </div>
                  </div>
                  <div className="btn-order cursor-pointer flex gap-5 h-full ">
                    {item.orderState === 'confirm' ? (
                      <button className="border-2 font-semibold rounded-full border-yellow-500 p-2">
                        <span className="text-yellow-500">Chờ xác nhận</span>
                      </button>
                    ) : (
                      <button className="border-2 font-semibold rounded-full border-blue-500 p-2">
                        <span className="text-blue-500">Đang giao</span>
                      </button>
                    )}
                    {item.orderState != 'shipping' ? (
                      <button
                        onClick={() => deleteHandler()}
                        className="border-2 font-semibold rounded-full bg-red-500 p-2"
                      >
                        <span className="text-white">
                          <i className="fa fa-trash"></i> Hủy Đơn{' '}
                        </span>
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                {deleteModal ? (
                  <DeleteModal
                    isModalOpen={modalHandler}
                    deleteData={deleted}
                    isDelete={(check: boolean) => {
                      deleteReceipt(check,item.id);
                    }}
                  />
                ) : (
                  ''
                )}
                <div className="flex w-full justify-end">
                  <div className="w-1/4">
                    Tổng giá tiền :{' '}
                    <span className="text-red-500 font-semibold">
                      {formatCurrency.format(item.totalbill)}
                    </span>{' '}
                  </div>
                </div>
              </div>
            
            ))}
          </div>
          :
          <div className='text-2xl m-5'>
            Không có đơn hàng...
          </div>
          }
          
        </div>
      </div>
 
      {isDetail ? (
        <DetailModal
          detailProduct={detailProductId}
          userInfo={userInfo}
          isModalOpen={() => setDetail(false)}
          EditData={order2}
        />
      ) : (
        ''
      )}
      {/* <div className=" flex w-full justify-evenly 	">
        <button className="btn-order cursor-pointer w-1/6 h-full">
          <span className="font-semibold">Chờ xác nhận</span>
        </button>
        <button className="btn-order cursor-pointer  w-1/6 h-full ">
          <span className="font-semibold">Chờ lấy hàng</span>
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
      </div> */}
    </div>
  );
}
