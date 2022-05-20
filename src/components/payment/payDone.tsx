import { Link } from 'react-router-dom';
import './payDone.scss';

export default function Announcement() {
  return (
    <div className="announcement">
      <div className="announcement-container text-center">
        <div className="img">
          <img
            src="https://previews.123rf.com/images/zo3listic/zo3listic1906/zo3listic190600011/125377412-check-icon-vector-check-mark-icon-check-list-button-icon-tick.jpg"
            alt=""
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
