import { useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import './paySummary.tsx';
import formatCurrency from '../currency';
import { useEffect } from 'react';
export default function Summary() {
  const cartFromRedux = useAppSelector((state: RootState) => state.cart).cart;
  const invoiceFromRedux = useAppSelector((state: RootState) => state.invoice).invoice;
  useEffect(() => {
    getDateNow();
  }, []);
  const getDateNow = () => {};
  // const cartInvoice = cartFromRedux.slice(0, 4);
  return (
    <div className="bg-gray-300 m-2 py-1 mt-3 rounded md:lg:bg-gray-300 md:lg:ml-4 md:lg:py-1 md:lg:mt-3 md:lg:rounded">
      <div className="mx-11 my-6">
        <div className="summary-heading my-2">
          <span className="uppercase font-semibold text-2xl">Hóa đơn mua hàng</span>
        </div>
        <div className="h-48  overflow-y-scroll">
          {cartFromRedux.map((element: any) => (
            <div key={element.id} className="summary-product flex items-center my-2">
              <div className="product-img mx-5">
                <img className="rounded w-10 h-10" src={element.imgArray[0]} alt="" />
              </div>
              <details className="product-info flex flex-col">
                <summary>
                  <span className="font-semibold">{element.name}</span>
                </summary>
                <span className="text-sm">Màu : Đen </span>
                <span className="text-sm">Giá : {formatCurrency.format(element.price)}</span>
                <span className="text-sm">Số lượng : 1</span>
                <span className="text-sm">Loại : Mới 100%</span>
              </details>
            </div>
          ))}
        </div>
        <hr />
        {/* <button className='text-blue-500 font-semibold py-2 text-lg text-center w-full '>
            <span>Xem chi tiết </span>
            <i className="fa fa-plus "></i>
          </button> */}
        <hr />
        <div>
          <div className="summary-price my-2">
            <div className="flex justify-between my-1">
              <span>Tổng số lượng sản phẩm :</span>
              <span>{invoiceFromRedux.amount}</span>
            </div>
            <div className="flex justify-between my-1">
              <span>Tổng giá tiền :</span>
              <span>{formatCurrency.format(invoiceFromRedux.total)}</span>
            </div>
            <div className="flex justify-between my-1">
              <span>Phí vận chuyển :</span>
              <span>
                {invoiceFromRedux.ship == 0 ? 'Free' : formatCurrency.format(invoiceFromRedux.ship)}
              </span>
            </div>
            <div className="flex justify-between my-1">
              <span>Thanh toán:</span>
              <span className="font-bold">{formatCurrency.format(invoiceFromRedux.totalBill)}</span>
            </div>
          </div>
          <hr />
          <div className="summary-date flex flex-col my-2">
            <span>Ngày mua : 14/03/2022</span>
            <span>Ngày giao ( dự kiến ): 14/03/2022</span>
          </div>
        </div>
      </div>
    </div>
  );
}
