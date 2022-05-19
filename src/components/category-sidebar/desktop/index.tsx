import { useState } from 'react';

export default function CategorySidebar() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const listPhone = ['Iphone', 'Samsung', 'Xiaomi'];
  const listLaptop = ['Macbook', 'ASUS', 'Dell'];

  return (
    <div className="flex h-full">
      <div className=" py-3 w-full flex flex-col bg-gray-700 text-white">
        <div className=" ml-5">
          <div className="my-4">
            <p className="ml-2 text-xl text-yellow-300 font-semibold">Sản phẩm</p>
            <ul className="mx-5 ">
              <li className="">
                <div className="hover:text-orange-500  flex items-center justify-between">
                  <p>Điện thoại</p>
                  <button onClick={() => setOpen1(true)}>
                    <i className={open1 ? 'hidden' : 'fa-solid fa-caret-left'}></i>
                  </button>
                  <i
                    onClick={() => setOpen1(false)}
                    className={open1 ? 'fa-solid fa-sort-down mb-2' : 'hidden'}
                  ></i>
                </div>
                {open1 ? (
                  <div className=" ml-5">
                    {listPhone.map((item) => (
                      <p className="hover:text-orange-500 ">{item}</p>
                    ))}
                  </div>
                ) : (
                  ''
                )}
              </li>
              <li className="">
                <div className="hover:text-orange-500  flex items-center justify-between">
                  <p>Laptop</p>
                  <button onClick={() => setOpen2(true)}>
                    <i className={open2 ? 'hidden' : 'fa-solid fa-caret-left'}></i>
                  </button>
                  <i
                    onClick={() => setOpen2(false)}
                    className={open2 ? 'fa-solid fa-sort-down mb-2' : 'hidden'}
                  ></i>
                </div>
                {open2 ? (
                  <div className=" ml-5">
                    {listLaptop.map((item) => (
                      <p className="hover:text-orange-500 ">{item}</p>
                    ))}
                  </div>
                ) : (
                  ''
                )}
              </li>
            </ul>
            <div className="my-4">
              <p className="ml-2 text-xl text-yellow-300 font-semibold">Giá</p>
              <div className="flex items-baseline mb-1 gap-2">
                <input type="radio" name="price" id="" /> Dưới 500K
              </div>
              <div className="flex items-baseline mb-1 gap-2 ">
                <input type="radio" name="price" id="" /> Từ 500K đến 1.000K
              </div>
              <div className="flex items-baseline mb-1 gap-2">
                <input type="radio" name="price" id="" /> Từ 1.000K đến 5.000K
              </div>
              <div className="flex items-baseline mb-1 gap-2 ">
                <input type="radio" name="price" id="" /> Từ 5.000K đến 10.000K
              </div>
              <div className="flex items-baseline mb-1 gap-2 ">
                <input type="radio" name="price" id="" /> Trên 1.000K
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
