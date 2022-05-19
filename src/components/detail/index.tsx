import { useAppDispatch, useAppSelector } from 'store/hooks';
import { addToCart, quantityCart, quantityPlusCart } from 'store/reducer/cart';
import { RootState } from 'store/store';
import { useParams } from 'react-router-dom';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import formatCurrency from '../currency';
import 'react-toastify/dist/ReactToastify.css';
import './style.scss';

export default function Detail() {
  const cartFromRedux = useAppSelector((state: RootState) => state.cart).cart;
  const inventoryFromRedux = useAppSelector((state: RootState) => state.inventory).inventory;
  const dispatch = useAppDispatch();

  const [detail, setDetail] = useState<any>();
  const [img, setImg] = useState();
  const [qty, setQty] = useState<number>(1);

  const { id } = useParams();

  useEffect(() => {
    detailItem();
  }, [inventoryFromRedux]);

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
          dispatch(
            quantityCart({
              id: index,
              quantity: qty,
            })
          );
          toast.success(`Đã thêm ${qty}`, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          flagUpdate = true;
          return;
        }
      });

      if (!flagUpdate) {
        dispatch(addToCart(item));
        toast.success('Bạn đã thêm vào giỏ hàng !', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    }
  };
  const quantityController = (value: ChangeEvent<HTMLInputElement>) => {
    setQty(Number(value.target.value));
  };
  const quantityPlus = () => {
    setQty(qty + 1);
  };
  const quantityMinus = () => {
    if (qty <= 1) {
      setQty(1);
    } else {
      setQty(qty - 1);
    }
  };

  const detailItem = () => {
    let detailproduct: any = [];
    let arr = inventoryFromRedux.find((element: any) => element.id === id);
    detailproduct.push(arr);
    setDetail(detailproduct);
  };
  const selectImg = (img: any) => {
    setImg(img);
  };
  return (
    <div>
      {detail === undefined
        ? 'this product is out'
        : detail.map((prod: any, index: number) => (
            <div
              key={prod.id}
              className=" w-full flex flex-col md:lg:w-full md:lg:flex-row md:lg:flex md:lg:justify-evenly md:lg:pt-5 "
            >
              <div className=" w-full md:lg:w-2/5 md:lg:mx-5">
                <div className="border-2 boreder-gray-300 py-2 relative">
                  <img
                    // ref={zoomImg}
                    className="priority-img h-80 object-contain mx-auto  bg-white"
                    src={img || prod.imgArray[0]}
                    alt=""
                  />
                </div>
                <div className=" flex w-full justify-center my-4">
                  {prod.imgArray.map((img: any, index2: number) => (
                    <img
                      key={index2}
                      onClick={() => selectImg(img)}
                      className="secondary-img p-1 border-2 boreder-gray-300  mx-3 rounded hover:border-red-500 bg-white"
                      src={img}
                    />
                  ))}
                </div>
              </div>
              <div className=" w-full md:lg:w-2/5 md:lg:mx-5">
                <div className="info flex flex-col">
                  <span className="text-3xl">{prod.name}</span>
                  <span className="text-gray-500">Giá chính thức</span>
                  <span className="text-red-500 text-4xl md:lg:text-2xl md:lg:text-red-500">
                    {formatCurrency.format(prod.price)}
                  </span>
                  <span>Màu sắc : Bạc</span>
                </div>
                <div className="inputQty">
                  <button onClick={quantityPlus} className="bg-gray-300 rounded-2xl px-1">
                    <i className="fa fa-plus"></i>
                  </button>
                  <input
                    onChange={(e) => quantityController(e)}
                    value={qty}
                    className=" focus:outline-none rounded-lg  p-1 text-center"
                    type="number"
                    min={1}
                  />
                  <button onClick={quantityMinus} className="bg-gray-300 rounded-2xl px-1">
                    <i className="fa fa-minus"></i>
                  </button>
                </div>
                <div className="discount border border-gray-300 rounded-xl mt-4">
                  <div className="discount-title py-2 px-3 rounded-t-xl bg-orange-400">
                    <span className="text-white">Khuyến mãi</span>
                  </div>
                  <div className="discount-content  p-3">
                    <div className="flex">
                      <span>
                        1.Mua Office Home &amp; Student 2021 kèm Macbook chỉ còn 2,090,000đ
                        <a className="text-blue-500 mx-1">Xem chi tiết</a>
                      </span>
                    </div>
                    <div className="flex">
                      <span>
                        2.Phần mềm Diệt Virus, Office chính hãng chỉ từ 150k
                        <a className="text-blue-500 mx-1">Xem chi tiết</a>
                      </span>
                    </div>
                    <div className="flex">
                      <span>
                        3.Thu cũ lên đời - Trợ giá 1 triệu
                        <a className="text-blue-500 mx-1">Xem chi tiết</a>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="buy ">
                  <button
                    onClick={() => addCart(prod, prod.id)}
                    className=" w-full flex flex-col p-2 my-5 text-center rounded-lg bg-orange-500 border-2 border-orange-700"
                  >
                    <span className=" font-semibold mx-auto text-xl text-white">Thêm giỏ hàng</span>
                    <span className="mx-auto text-white ">
                      (Giao tận nơi hoặc lấy tại cửa hàng)
                    </span>
                  </button>
                </div>
                <div className="promo text-sm border border-gray-300 rounded-lg ">
                  <div className="promo-title bg-gray-400 rounded-t-lg py-1">
                    <span className="uppercase mx-2 font-semibold text-black">ưu đãi thêm</span>
                  </div>
                  <div className="promo-content">
                    <div className="flex">
                      <div className="my-1 w-1/6 ">
                        <img
                          className="w-4 h-4 mx-auto"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuKlhdWQZRavLajdeVACATuUh0E6-LGVDbK5dCXYpEMZG0SyI7fqffRY6nIwid9a4oPRA&amp;usqp=CAU"
                          alt=""
                        />
                      </div>
                      <div className="w-5/6">
                        <span>Giảm thêm tới 1% cho thành viên Smember</span>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="my-1 w-1/6">
                        <img
                          className="w-4 h-4 mx-auto"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuKlhdWQZRavLajdeVACATuUh0E6-LGVDbK5dCXYpEMZG0SyI7fqffRY6nIwid9a4oPRA&amp;usqp=CAU"
                          alt=""
                        />
                      </div>
                      <div className="w-5/6">
                        <span>Thu cũ đổi đời mới - Trợ giá 500.000đ</span>
                      </div>
                    </div>
                    <div className="flex ">
                      <div className="my-1 w-1/6">
                        <img
                          className="w-4 h-4 mx-auto"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuKlhdWQZRavLajdeVACATuUh0E6-LGVDbK5dCXYpEMZG0SyI7fqffRY6nIwid9a4oPRA&amp;usqp=CAU"
                          alt=""
                        />
                      </div>
                      <div className="w-5/6">
                        <span>Mở thẻ tín dụng Shinhanbank, nhận voucher đến 2.000.000đ</span>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="my-1 w-1/6 ">
                        <img
                          className="w-4 h-4 mx-auto"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuKlhdWQZRavLajdeVACATuUh0E6-LGVDbK5dCXYpEMZG0SyI7fqffRY6nIwid9a4oPRA&amp;usqp=CAU"
                          alt=""
                        />
                      </div>
                      <div className="w-5/6">
                        <span>Giảm thêm 5% khi thanh toán qua ví Moca trên ứng dụng Grab</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:lg:w-2/5 md:lg:mx-5 my-2 ">
                <div className="flex flex-col border border-gray-300 rounded-lg">
                  <ul className="p-2">
                    <li className="text-lg my-2">Thông tin máy</li>
                    <li className="flex">
                      <i className="fa fa-mobile-alt w-6"></i>
                      <span>Mới, đầy đủ phụ kiện từ nhà sản xuất</span>
                    </li>
                    <li className="flex">
                      <i className="fas fa-user-shield w-6"></i>
                      <span>
                        Bảo hành 12 tháng tại trung tâm bảo hành Chính hãng. 1 đổi 1 trong 30 ngày
                        nếu có lỗi phần phân cứng từ nhà sản xuất
                        <a className="text-red-500" href="">
                          (Xem thêm chi tiết)
                        </a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}
