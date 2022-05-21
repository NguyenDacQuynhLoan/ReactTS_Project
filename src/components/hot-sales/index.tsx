import { db } from '../../queries/api/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import formatCurrency from '../currency';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.scss';
import { addToCart } from 'store/reducer/cart';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import { getAllProducts } from 'store/reducer/inventory';
// import { getDocsProduct } from 'shared/products';
export default function HotSale() {
  const [sale, setSale] = useState<any>();
  const cartFromRedux = useAppSelector((state: RootState) => state.cart).cart;

  // let prod = JSON.parse(localStorage.getItem('user')!) || [];
  const dispatch = useAppDispatch();
  useEffect(() => {
    loadSales();

  }, []);
  const slickSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };
  const slickSettingsMobile: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const loadSales = () => {
    let salesFirebase: any = [];

    getDocs(collection(db, 'products'))
      .then((data) => {
        data.docs.forEach((doc) => {
          salesFirebase.push({
            ...doc.data(),
            id: doc.id,
          });
        });        
        let salesProduct = salesFirebase.filter(
          (element: any) => element.isDeleted == false && element.isSale == true);          
          // dispatch(getAllProducts(salesProduct));
          
          
          setSale(salesProduct)
        })
        
      .catch((err) => {
        console.log(err.message);
      });
  };
  // const addCart = (item: any, id: string) => {
  //   if (cartFromRedux.length === 0) {
  //     dispatch(addToCart(item));
  //     toast.success('Bạn đã thêm vào giỏ hàng !', {
  //       position: toast.POSITION.BOTTOM_RIGHT,
  //     });
  //   } else {
  //     let flagUpdate: boolean = false;
  //     cartFromRedux.forEach((element: any, index: number) => {
  //       if (element.id === id) {
  //         toast.warning('Điều chỉnh số lượng tại trang Giỏ hàng !', {
  //           position: toast.POSITION.BOTTOM_RIGHT,
  //         });
  //         // element.quantity = element.quantity + 1;
  //         // console.log(element.quantity);
  //         flagUpdate = true;
  //         return;
  //       }
  //     });
  //     if (!flagUpdate) {
  //       // cartFromRedux.push(item);
  //       dispatch(addToCart(item));
  //       toast.success('Bạn đã thêm vào giỏ hàng !', {
  //         position: toast.POSITION.BOTTOM_RIGHT,
  //       });
  //     }
  //   }

  //   // dispatch(addToCart(prod));

  //   // localStorage.setItem('user', JSON.stringify(prod));
  // };
  const addCart = (item: any) => {
    dispatch(addToCart(item));
    toast.success('Bạn đã thêm vào giỏ hàng !', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  return (
    <div className='sale my-5'>
      <div className="font-semibold text-xl  mx-6 my-3">Hot Deal</div>
      {sale === undefined ? (
        'is loading...'
      ) : (
        <div className="slide-wrapped ">
          <div className="hidden md:block lg:block">
          <Slider {...slickSettings}>
            {sale.map((prod: any) => (
              // return (
              <div
                key={prod.id}
                className="slide rounded-xl border border-gray-300 bg-white flex flex-col m-5 p-4 text-base relative"
              >
                <div className="bg-red-500 absolute top-2 right-0 rounded-l-lg">
                  <p className="px-2 text-yellow-300">
                    {prod.discPercent}%
                  </p>
                </div>
                <Link to={`detail/${prod.id}`}>
                  <div className="card-img w-full">
                    <img className='w-48 h-48 mx-auto object-contain' src={prod.imgArray[0]} alt="" />
                  </div>
                </Link>
                <div className="card-info  flex flex-col justify-between">
                  <div className="info">
                    <div className=" font-medium  text-black">
                      <h5 className="truncate font-semibold">{prod.name}</h5>
                    </div>
                    <div className="price py-2 font-semibold text-red-600">
                      <p>{formatCurrency.format(prod.price)}</p>
                    </div>
                  </div>

                  <div className="addCart">
                    <button
                      onClick={() => addCart(prod)}
                      className=" btn w-full font-bold py-2 px-4 rounded text-white "
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          </div>
          <div className="block md:hidden lg:hidden">
          <Slider {...slickSettingsMobile}>
            {sale.map((prod: any) => (
              // return (
              <div
                key={prod.id}
                className="slide rounded-xl border border-gray-300 bg-white flex flex-col my-5 p-4 text-base relative"
              >
                <div className="bg-red-500 absolute top-2 right-0 rounded-l-lg">
                  <p className="px-2 text-yellow-300">
                    {prod.discPercent}%
                  </p>
                </div>
                <Link to={`detail/${prod.id}`}>
                  <div className="card-img w-full">
                    <img className='w-48 h-48 mx-auto object-contain' src={prod.imgArray[0]} alt="" />
                  </div>
                </Link>
                <div className="card-info  flex flex-col justify-between">
                  <div className="info">
                    <div className=" font-medium  text-black">
                      <h5 className="truncate font-semibold">{prod.name}</h5>
                    </div>
                    <div className="price py-2 font-semibold text-red-600">
                      <p>{formatCurrency.format(prod.price)}</p>
                    </div>
                  </div>

                  <div className="addCart">
                    <button
                      onClick={() => addCart(prod)}
                      className=" btn w-full font-bold py-2 px-4 rounded text-white "
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          </div>
          {/* <Slider {...slickSettings}>
            {sale.map((prod: any) => (
              // return (
              <div
                key={prod.id}
                className="slide rounded-xl border border-gray-300 bg-white flex flex-col m-5 p-4 text-base relative"
              >
                <div className="bg-red-500 absolute top-2 right-0 rounded-l-lg">
                  <p className="px-2 text-yellow-300">
                    {prod.discPercent}%
                  </p>
                </div>
                <Link to={`detail/${prod.id}`}>
                  <div className="card-img w-full">
                    <img className='w-48 h-48 mx-auto object-contain' src={prod.imgArray[0]} alt="" />
                  </div>
                </Link>
                <div className="card-info  flex flex-col justify-between">
                  <div className="info">
                    <div className=" font-medium  text-black">
                      <h5 className="truncate font-semibold">{prod.name}</h5>
                    </div>
                    <div className="price py-2 font-semibold text-red-600">
                      <p>{formatCurrency.format(prod.price)}</p>
                    </div>
                  </div>

                  <div className="addCart">
                    <button
                      onClick={() => addCart(prod, prod.id)}
                      className=" btn w-full font-bold py-2 px-4 rounded text-white "
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider> */}
        </div>
      )}
    </div>
  );
}
