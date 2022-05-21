import { auth, db, useAuth } from '../../queries/api/firebase';
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import { useEffect, useState } from 'react';

export default function Method() {
  // const userInfoFromRedux = useAppSelector((state: RootState) => state.userInfo).userInfo;
  const cartFromRedux = useAppSelector((state: RootState) => state.cart).cart;
  const invoiceFromRedux = useAppSelector((state: RootState) => state.invoice).invoice;
  const userInfo = useAppSelector((state: RootState) => state.userInfo).userInfo;
  const deliveryFromRedux = useAppSelector((state: RootState) => state.delivery).delivery;
  const navigate = useNavigate();
  const [method, setMethod] = useState(false);
  useEffect(() => {
    console.log(invoiceFromRedux);
  }, []);
  const addOrder = async () => {
    await addDoc(collection(db, 'orders'), {
      amount: invoiceFromRedux.amount,
      ship: invoiceFromRedux.ship,
      totalbill: invoiceFromRedux.totalBill,
      dateInvoice: invoiceFromRedux.dateInvoice,
      expectDateInvoice: invoiceFromRedux.expectDateInvoice,
      name: deliveryFromRedux.userDelivery,
      address: deliveryFromRedux.addressDelivery,
      phoneNumber: deliveryFromRedux.numberDelivery,
      userID: userInfo.userID,
      email: userInfo.email,
      orderState: 'confirm',
    }).then((data) => {
      cartFromRedux.forEach((item: any) => {
        console.log(item);
        setDoc(doc(db, `orders/${data.id}/product`, item.id), {
          id: data.id,
          nameProd: item.name,
          brand: item.brand,
          price: item.price,
          quantity: item.quantity,
          idProd: item.id,
          image: item.imgArray,
        });
      });
      navigate('/payment/done');
    });
  };
  return (
    <div className="method p-4 md:lg:p-0">
      <div className="method-select">
        <div>
          <div className="method py-4">
            {/* <div className="method-card flex flex-col pb-3 gap-2">
              <p>Phương thức thanh toán:</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setMethod(false)}
                  className="focus:border-red-500 border-2 rounded"
                >
                  <img
                    className="w-12 h-12 object-contain"
                    src="https://thumbs.dreamstime.com/b/dollar-money-icon-cash-sign-bill-symbol-flat-payment-dollar-currency-icon-dollar-money-icon-cash-sign-bill-symbol-flat-payment-147323372.jpg"
                    alt=""
                  />
                </button>
                <button
                  onClick={() => setMethod(true)}
                  className="focus:border-red-500 border-2 rounded "
                >
                  <img
                    className="w-12 h-12 object-contain "
                    src="https://image.similarpng.com/very-thumbnail/2020/06/Logo-visa-icon-PNG.png"
                    alt=""
                  />
                </button>
                <button
                  onClick={() => setMethod(true)}
                  className="focus:border-red-500 border-2 rounded "
                >
                  <img
                    className="w-12 h-12 object-contain "
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png"
                    alt=""
                  />
                </button>
                <button
                  onClick={() => setMethod(true)}
                  className="focus:border-red-500 border-2 rounded "
                >
                  <img
                    className="w-12 h-12 object-contain "
                    src="https://logowik.com/content/uploads/images/897_paypal.jpg"
                    alt=""
                  />
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {method ? (
        <div className="method-form">
          <div className="method-container">
            <div className=" flex  my-3">
              <div className="w-1/2 flex flex-col mr-2">
                <p className="pb-2">Tên tài khoản :</p>
                <input
                  type="text"
                  className="focus:outline-none border border-gray-300 px-2 py-1  rounded"
                />
              </div>
              <div className="w-1/2 flex flex-col">
                <p className="pb-2">Số tài khoản:</p>
                <input
                  type="text"
                  className="focus:outline-none border border-gray-300 px-2 py-1  rounded"
                />{' '}
              </div>
            </div>
            <div className=" flex my-3">
              <div className="w-1/2 flex flex-col mr-2">
                <p className="pb-2">Ngày hẹn lấy :</p>
                <input
                  type="text"
                  className="focus:outline-none border border-gray-300 px-2 py-1  rounded"
                />
              </div>
              <div className="w-1/2 flex flex-col">
                <p className="pb-2">Nhập mã:</p>
                <input
                  type="text"
                  className="focus:outline-none border border-gray-300 px-2 py-1  rounded"
                />{' '}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      <div className="method-contact">
        <div className="flex flex-col">
          <span className="text-2xl">Thông tin liên lạc</span>
          <div className="flex justify-between">
            <span>Email:</span>
            <span>{userInfo.email}</span>
          </div>
          <div className="flex justify-between">
            <span>SĐT:</span>
            <span>{deliveryFromRedux.numberDelivery}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl">Thông tin cá nhân</span>
          <div className="flex justify-between">
            <span>Họ tên:</span>
            <span>{deliveryFromRedux.userDelivery}</span>
          </div>
          <div className="flex justify-between">
            <span>Địa chỉ:</span>
            <span>{deliveryFromRedux.addressDelivery}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          addOrder();
          // navigate('/payment/done');
        }}
        className=" font-semibold border-4 border-orange-500 w-full py-2 my-2 rounded-lg text-orange-500 bg-white hover:bg-gray-50"
      >
        Đặt hàng
      </button>
    </div>
  );
}
