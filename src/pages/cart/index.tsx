import Order from '../../components/order';
import Invoice from '../../components/invoice';
import './style.scss';
export default function Cart() {
  return (
    <div className="flex flex-col md:lg:flex-row md:lg:flex md:lg:mb-10 md:lg:w-4/5 md:lg:mx-auto ">
      <div className="w-full md:lg:w-2/3 md:lg:mr-2 md:lg:my-3">
        <div className="hidden md:lg:flex md:lg:block ">
          <p className="title-img text-center my-1">#</p>
          <p className="title-name   my-1">Tên sản phẩm</p>
          <p className="title-price  my-1">Giá</p>
          <p className="title-qty  my-1">Số lượng</p>
          <p className="title-delete  my-1">Xóa</p>
        </div>
        <div className="flex block text-center md:lg:hidden text-lg ">
          <p className="w-2/5 ">Tên sản phẩm</p>
          <p className="w-2/5 text-right">Số lượng</p>
          <p className="w-1/5 text-right mr-2">Xóa</p>
        </div>
        <Order />
      </div>
      <div className="w-full my-3 md:lg:w-1/3 md:lg:my-3">
        <Invoice />
      </div>
    </div>
  );
}
