import { Link } from 'react-router-dom';
import './style.scss';

export default function Nav() {
  return (
    <div className="hidden md:flex md:wrapped md:justify-evenly md:py-8 lg:flex lg:wrapped lg:justify-evenly lg:py-8">
      <div className="bg-grey-300 flex flex-col gap-4 items-center">
        <Link to={'/category'}>
          <i className="fa fa-mobile bg-orange-500 hover:bg-orange-700 p-3 w-40 h-40 text-white text-5xl rounded-full flex items-center justify-center transform transition duration-500 hover:scale-125"></i>
        </Link>
        <span className="font-bold text-2xl">Điện thoại</span>
      </div>
      <div className="bg-grey-300 flex flex-col gap-4 items-center">
        <Link to={'/category'}>
          <i className="fa fa-laptop-code bg-orange-500 hover:bg-orange-700 p-3 w-40 h-40 text-white text-5xl rounded-full flex items-center justify-center transform transition duration-500 hover:scale-125"></i>
        </Link>
        <span className="font-bold text-2xl">Laptop</span>
      </div>
      <div className="bg-grey-300 flex flex-col gap-4 items-center">
        <Link to={'/category'}>
          <i className="fa fa-headphones bg-orange-500 hover:bg-orange-700 p-3 w-40 h-40 text-white text-5xl rounded-full flex items-center justify-center transform transition duration-500 hover:scale-125"></i>
        </Link>
        <span className="font-bold text-2xl">Màn hình/Tai nghe</span>
      </div>
      <div className="bg-grey-300 flex flex-col gap-4 items-center">
        <Link to={'/category'}>
          <i className="fa fa-keyboard bg-orange-500 hover:bg-orange-700 p-3 w-40 h-40 text-white text-5xl rounded-full flex items-center justify-center transform transition duration-500 hover:scale-125"></i>
        </Link>
        <span className="font-bold text-2xl">Phụ kiện</span>
      </div>
    </div>
  );
}
{
  /* <ul className="list-menu relative cursor-pointer h-full">
  <li>
    <a className="flex items-center justify-between">
      <div className="items-center">
        <i className="fa fa-mobile-alt pr-3"></i>
        <span>Điện thoại</span>
      </div>
      <i className="fas fa-angle-right pr-2"></i>
    </a>
    <div className="list-menu-detail  text-left bg-white hidden absolute">
      <ul className="list-menu">
        <li>
          <a className="flex items-center justify-between">
            <span>Apple</span>
            <i className="fas fa-angle-right pr-2"></i>
          </a>
          <div className="list-menu-detail2 absolute top-0  text-left hidden bg-white">
            <ul>
              <li>iPhone 13 Series</li>
              <li>iPhone 12 Series</li>
              <li>iPhone 11 Series</li>
              <li>iPhone SE</li>
            </ul>
          </div>
        </li>
        <li>Samsung</li>
        <li>Xiaomi</li>
        <li>OPPO</li>
        <li>Nokia</li>
        <li>Realme</li>
        <li>ASUS</li>
        <li>Vivo</li>
        <li>OnePlus</li>
        <li>Các hãng khác</li>
      </ul>
    </div>
  </li>
  <li>
    <a className="flex items-center justify-between">
      <div className="items-center">
        <i className="fa fa-laptop"></i>
        <span>Laptop, Pc, Màn hình</span>
      </div>
      <i className="fas fa-angle-right pr-2"></i>
    </a>
    <div className="list-menu-detail  text-left bg-white hidden absolute">
      <ul className="list-menu">
        <li>
          <a className="flex items-center justify-between">
            <span>Mac</span>
            <i className="fas fa-angle-right pr-2"></i>
          </a>
          <div className="list-menu-detail2 absolute top-0  text-left hidden bg-white">
            <ul>
              <li>Macbook Air</li>
              <li>Macbook Pro</li>
              <li>Mac Mini</li>
              <li>iMac</li>
              <li>Mac Studio</li>
            </ul>
          </div>
        </li>
        <li>HP</li>
        <li>Dell</li>
        <li>Lenovo</li>
        <li>Microsoft Surface</li>
        <li>ASUS</li>
        <li>Acer</li>
        <li>LG</li>
        <li>Fujitsu</li>
        <li>Máy tính để bàn</li>
        <li>Mà hình</li>
        <li>Máy in</li>
        <li>Linh kiện máy tính</li>
      </ul>
    </div>
  </li>
  <li>
  <a className="flex items-center justify-between">
      <div className="items-center">
        <i className="fa fa-tablet-alt"></i>
        <span>Tablet</span>
      </div>
      <i className="fas fa-angle-right pr-2"></i>
    </a>
    <div className="list-menu-detail  text-left bg-white hidden absolute">
      <ul className="list-menu">
        <li>iPad Pro</li>
        <li>iPad 10.2</li>
        <li>iPad Air</li>
        <li>iPad mini</li>
        <li>Samsung</li>
        <li>Lenovo</li>
        <li>Xiaomi</li>
        <li>Máy đọc sách</li>
        <li>Alcatel</li>
      </ul>
    </div>
  </li>
  <li>
  <a className="flex items-center justify-between">
      <div className="items-center">
        <i className="fa fa-headphones-alt"></i>
        <span>Âm thanh</span>
      </div>
      <i className="fas fa-angle-right pr-2"></i>
    </a>
    <div className="list-menu-detail  text-left bg-white hidden absolute">
      <ul className="list-menu">
        <li>
        <a className="flex items-center justify-between">
            <span>Loa</span>
            <i className="fas fa-angle-right pr-2"></i>

          </a>
            <div className="list-menu-detail2 absolute top-0  text-left hidden bg-white">
              <ul>
                <li>Loa Bluetooth</li>
                <li>Loa Karaoke</li>
                <li>Loa Tivi | Soundbar</li>
              </ul>
            </div>
        </li>
        <li>
        <a className="flex items-center justify-between"> 
            <span>Tai nghe</span>
            <i className="fas fa-angle-right pr-2"></i>
          </a>
            <div className="list-menu-detail2 absolute top-0  text-left hidden bg-white">
              <ul>
                <li>Tai nghe Bluetooth</li>
                <li>Tai nghe nhét tai</li>
                <li>Tai nghe chụp tai</li>
              </ul>
            </div>
        </li>
        <li>Phụ kiện</li>
        <li>Phòng thu âm</li>
      </ul>
    </div>
  </li>
  <li>
  <a className="flex items-center justify-between"> 
      <div className="items-center">
        <i className="far fa-clock"></i>
        <span>Đồng hồ</span>
      </div>
      <i className="fas fa-angle-right pr-2"></i>
    </a>
    <div className="list-menu-detail  text-left bg-white hidden absolute ">
      <ul className="list-menu ">
        <li>
          <a className="flex items-center justify-between">
            <span>Apple Watch</span>
            <i className="fas fa-angle-right pr-2"></i>
          </a>
            <div className="list-menu-detail2 absolute top-0  text-left hidden bg-white">
              <ul>
                <li>Series 6</li>
                <li>SE</li>
                <li>Series 7</li>
              </ul>
            </div>
        </li>
        <li>Samsung</li>
        <li>Xiaomi</li>
        <li>Amazfit</li>
        <li>Huawei</li>
        <li>OPPO</li>
        <li>Hãng khác</li>
        <li>Vòng tay thông minh</li>
        <li>Đồng hồ định vị trẻ em</li>
        <li>Coros</li>
      </ul>
    </div>
  </li>
  <li>
  <a className="flex items-center justify-between">
      <div className="items-center">
        <i className="far fa-keyboard"></i>
        <span>Phụ kiện</span>
      </div>
      <i className="fas fa-angle-right pr-2"></i>
    </a>
    <div className="list-menu-detail  text-left bg-white hidden absolute">
      <ul className="list-menu">
        <li>Phụ kiện Apple</li>
        <li>Dán điện thoại | Laptop</li>
        <li>Ốp lưng | Bao da | Ốp AirPods</li>
        <li>Dây đeo đồng hồ</li>
        <li>Balo | Túi xách</li>
        <li>Sạc - Cáp</li>
        <li>Pin dự phòng</li>
        <li>Thiết bị mạng</li>
        <li>
          <a className="flex items-center justify-between">
            <span>Camera</span>
            <i className="fas fa-angle-right pr-2"></i>

          </a>
            <div className="list-menu-detail2 absolute top-0  text-left hidden bg-white">
              <ul>
                <li>Camera hành trình</li>
                <li>Camera an ninh</li>
                <li>Gimbal</li>
                <li>Phụ kiện quay phim</li>
              </ul>
            </div>
        </li>
        <li>Chuột | Bàn phím</li>
        <li>Phụ kiện tiện ích</li>
        <li>Thẻ nhớ, USB</li>
        <li>Phụ kiện máy tính - laptop</li>
        <li>Phụ kiện cho bé</li>
      </ul>
    </div>
  </li>
  <li>
  <a className="flex items-center justify-between">
      <div className="items-center">
        <i className="fa fa-shopping-basket"></i>
        <span>Thu mua</span>
      </div>
      <i className="fas fa-angle-right pr-2"></i>
    </a>
    <div className="list-menu-detail  text-left bg-white hidden absolute">
      <ul className="list-menu">
        <li>ĐỐI TÁC THU MUA:</li>
        <li>CellphoneS</li>
        <li>SKTel</li>
        <li>Compasia</li>
      </ul>
    </div>
  </li>
  <li>
    <a className="flex">
      <i className="fa fa-store"></i>
      <span>Hàng cũ</span>
      <span></span>
    </a>
    <div className="list-menu-detail  text-left bg-white hidden absolute">
      <ul className="list-menu">
        <li>Điện thoại</li>
        <li>Máy tính bảng</li>
        <li>Mac</li>
        <li>Laptop</li>
        <li>Loa - Tai nghe</li>
        <li>Đồng hồ thông minh</li>
        <li>Nhà thông minh</li>
        <li>Phụ kiện</li>
      </ul>
    </div>
  </li>
  <li>
    <a className="flex">
      <i className="fa fa-sim-card"></i>
      <span>Sim Thẻ</span>
      <span></span>
    </a>
  </li>
  <li>
    <a className="flex">
      <i className="fas fa-newspaper"></i>
      <span>Tin công nghệ</span>
      <span></span>
    </a>
  </li>
  <li>
    <a className="flex">
      <i className="fas fa-ad"></i>
      <span>Khuyến mãi</span>
      <span></span>
    </a>
  </li>
</ul> */
}
/*     <div className="flex flex-col h-full">
      <div className=" h-1/3 flex">
        <div className="box">
          <Link to={'/category'}>
            <div className="w-1/2 box-wrapped flex flex-col bg-gray-50  ">
              <p className="text-2xl">Điện thoại</p>
              <span className="text-gray-500">IPhone</span>
              <span className="text-gray-500">Samsung</span>
              <span className="text-gray-500">Oppo</span>
            </div>
          </Link>
        </div>
        <div className="box">
          <div className="w-1/2 box-wrapped flex flex-col  bg-gray-50  ">
            <p className="text-2xl">Phụ kiện</p>
            <span className="text-gray-500">Tai nghe</span>
            <span className="text-gray-500">Bàn phím</span>
          </div>
        </div>
      </div>
      <div className=" h-1/3 flex">
        <div className="box">
          <div className="w-1/2 box-wrapped flex flex-col  bg-gray-50  ">
            <p className="text-2xl">Laptop</p>
            <span className="text-gray-500">Macbook</span>
            <span className="text-gray-500">ASUS</span>
          </div>
        </div>
        <div className="box">
          <div className="w-1/2 box-wrapped flex flex-col  bg-gray-50  ">
            <p className="text-2xl">Sale đến 20%</p>
          </div>
        </div>
      </div>
      <div className=" h-1/3 flex">
        <div className="box">
          <div className="w-1/2 box-wrapped  flex flex-col  bg-gray-50  ">
            <p className="text-2xl">Sản phẩm mới</p>
          </div>
        </div>
        <div className="box">
          <div className="w-1/2 box-wrapped flex flex-col  bg-gray-50 ">
            <p className="text-2xl">Sản phẩm tốt nhất</p>
          </div>
        </div>
      </div>
    </div> */
