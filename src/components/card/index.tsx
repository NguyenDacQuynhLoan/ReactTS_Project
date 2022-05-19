import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import { addToCart, quantityPlusCart } from 'store/reducer/cart';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import formatCurrency from '../currency';

import 'react-toastify/dist/ReactToastify.css';
import './style.scss';
// import Modal from '../modal';

export default function Card(props: any) {
  const [data, setData] = useState<any>();

  const dispatch = useAppDispatch();
  const cartFromRedux = useAppSelector((state: RootState) => state.cart).cart;
  // const navigate = useNavigate();
  // let prod: any = [];
  // let prod = JSON.parse(localStorage.getItem('user')!) || [];

  useEffect(() => {
    setData(props.data);
  }, [props.data]);
  const addCart = (item: any, id: string) => {
    if (cartFromRedux.length === 0) {
      dispatch(addToCart(item));
      toast.success('Bạn đã thêm vào giỏ hàng !', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      let flagUpdate: boolean = false;
      cartFromRedux.forEach((element: any, index: number) => {
        if (element.id === id) {
          dispatch(quantityPlusCart(index));
          toast.success('Bạn đã thêm vào giỏ hàng !', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          flagUpdate = true;
          return;
        }
      });
      if (!flagUpdate) {
        // cartFromRedux.push(item);
        dispatch(addToCart(item));
        toast.success('Bạn đã thêm vào giỏ hàng !', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }

    // dispatch(addToCart(prod));

    // localStorage.setItem('user', JSON.stringify(prod));
  };
  // const convertStar = () => {
  //   data.forEach((element: any) => {
  //     console.log(element.numSales / 5 / 100);
  //   });
  // };
  return (
    <>
      {data === undefined
        ? 'is loading...'
        : data.map((prod: any) => (
            <div
              key={prod.id}
              className="w-40 mx-auto rounded md:lg:rounded border border-grey-200 md:lg:border-none md:lg:hover:drop-shadow-xl md:lg:w-52 md:lg:mx-auto md:lg:flex md:lg:flex-col md:lg:justify-between  md:lg:text-base md:lg:text-black md:lg:bg-white md:lg:relative  md:lg:transform md:lg:transition md:lg:duration-500 "
            >
              <div className="m-0 p-3 md:lg:m-1 md:lg:p-3 ">
                <Link to={`/detail/${prod.id}`}>
                  <div className="card-img">
                    {/* <p className='right-0 translate-y-2 translate-x-3 bg-red'>{prod.numViews}</p> */}
                    <img className="h-48 w-40 object-contain" src={prod.imgArray[0]} alt="" />
                  </div>
                </Link>
                <div className="card-info  flex flex-col justify-between">
                  <div className="info">
                    <div className=" font-medium  ">
                      <h5 className="truncate font-semibold">{prod.name}</h5>
                    </div>
                    <div className="price py-2 font-semibold text-red-600">
                      <p>{formatCurrency.format(prod.price)}</p>
                    </div>
                  </div>

                  <div className="addCart flex">
                    <button
                      onClick={() => addCart(prod, prod.id)}
                      className=" btn w-2/5 font-bold py-2  bg-blue-800 rounded text-white"
                    >
                      <i className="fa fa-cart-plus"></i>{' '}
                    </button>
                    <div className="flex flex-col w-full justify-center text-center">
                      <p className="text-gray-500">Đã bán {prod.numSales}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
    </>
  );
}
// currency => number => send/add
// prod.forEach((element: any) => {
//   let group = new Intl.NumberFormat('vi').format(1111).replace(/1/g, ''); // "."
//   let decimal = new Intl.NumberFormat('vi').format(1.1).replace(/1/g, ''); // ","
//   let reversedVal = element.price.replace(new RegExp('\\' + group, 'g'), '');

//   reversedVal = reversedVal
//     .replace(new RegExp('\\' + decimal, 'g'), '.')
//     .replace(/[^0-9\.-]+/g, '');
//   element.price = Number.isNaN(reversedVal) ? 0 : reversedVal;
// });
