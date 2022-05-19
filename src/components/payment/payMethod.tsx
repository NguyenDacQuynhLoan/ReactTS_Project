import { auth, db, useAuth } from '../../queries/api/firebase';
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import { useState } from 'react';
import { cleanCart } from 'store/reducer/cart';
import { cleanInvoice } from 'store/reducer/invoice';
export default function Method() {
  // const userInfoFromRedux = useAppSelector((state: RootState) => state.userInfo).userInfo;
  const cartFromRedux = useAppSelector((state: RootState) => state.cart).cart;
  const invoiceFromRedux = useAppSelector((state: RootState) => state.invoice).invoice;
  const userInfo = useAppSelector((state: RootState) => state.userInfo).userInfo;
  const deliveryFromRedux = useAppSelector((state:RootState)=> state.delivery).delivery
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [method, setMethod] = useState(false);

  const addOrder =  async() => {
     await addDoc(collection(db, 'orders'), {
      amount: invoiceFromRedux.amount,
      ship: invoiceFromRedux.ship,
      totalbill: invoiceFromRedux.totalBill,
      name: deliveryFromRedux.userDelivery,
      address: deliveryFromRedux.addressDelivery,
      phoneNumber: deliveryFromRedux.numberDelivery,
      userID: userInfo.userID,
      orderState: 'confirm',
    }).then((data) => {
      cartFromRedux.forEach( (item: any) => {
        console.log(item);
         setDoc(doc(db, `orders/${data.id}/product`,item.id), {
          id: data.id,
          nameProd: item.name,
          brand: item.brand,
          price: item.price,
          quantity: item.quantity,
          idProd: item.id,
          image: item.imgArray,
        });
      });

      dispatch(cleanCart(true));
      dispatch(cleanInvoice(true));
      navigate('/payment/done')
    });
  };
  return (
    <div className="method">
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
            <span>{userInfo.phone}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl">Thông tin cá nhân</span>
          <div className="flex justify-between">
            <span>Họ tên:</span>
            <span>{userInfo.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Địa chỉ:</span>
            <span>{userInfo.address}</span>
          </div>
        </div>
      </div>
      <input type="checkbox" name="" id="" />
      Đồng ý với điều khoản mua hàng và xác nhận đặt hàng
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
