import { useAppDispatch } from 'store/hooks';
import { cleanCart } from 'store/reducer/cart';
import { cleanInvoice } from 'store/reducer/invoice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function Announcement() {
  const dispatch = useAppDispatch();

  useEffect(()=>{
    setTimeout(()=>{

      dispatch(cleanInvoice(true));
      dispatch(cleanCart(true));
    },6000)
  },[])
  return (
    <div className="announcement ">
      <div className="announcement-container text-center">
        <div className="img">
          <img
            // src="https://firebasestorage.googleapis.com/v0/b/shopping-online-16b07.appspot.com/o/Remove%20background.png?alt=media&token=ad82cb39-4a2b-4a49-b7c9-be738d26356b"
            // alt=""
            className='rounded-full h-1/5 w-2/5 mx-auto object-cover'
            src="https://cliply.co/wp-content/uploads/2021/03/372103860_CHECK_MARK_400px.gif"
          />
        </div>
        <div className="heading">
          <p className="text-xl pb-3">Cảm ơn bạn đã mua hàng</p>
        </div>
        <div className="w-full mx-4  md:lg:w-1/2 md:lg:mx-auto">
          Cellphone xin cảm ơn quý khách đã mua sản phẩm tại hệ thống của chúng tôi . Trong trường
          hợp bạn muốn thắc mắc về chính sách hoặc quy trình đổi trả vui lòng gửi đến{' '}
          <a className="text-blue-500" href="mailto:@cellphone">
            loannguyen1456@gmail.com
          </a>
        </div>
        <div className="btn my-4 rounded-lg flex justify-center items-center w-full mx-auto active:shadow-lg md:lg:py-2 md:lg:mt-2 md:lg:mb-5 md:lg:rounded-lg md:lg:flex md:lg:justify-center md:lg:items-center md:lg:w-1/6 md:lg:mx-auto md:lg:active:shadow-lg">
          <Link to="/">
            <button>
              Tiếp tục mua sắm
              <i className="fa fa-arrow-right"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
