import { useState } from 'react';

export default function CategorySidebarMobile() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  // const listPhone = ['Iphone', 'Samsung', 'Xiaomi'];
  // const listLaptop = ['Macbook', 'ASUS', 'Dell'];
  const options = [
    {id:1,name:'Điện thoại'},
    {id:2,name:'Laptop'},
    {id:3,name:'Tai nghe'},
    {id:4,name:'Phụ kiện'},
  ];

  return (
    <div className="flex h-full">
      <div className=" py-3 w-full flex flex-col  ">
        <span className='text-xl mx-2'>Danh sách sản phẩm</span>
          <div className="my-4 flex mx-2 gap-2">
            <div className="inline-block relative w-2/5">
              <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                {options.map((item) => (
                  <option className='' value={item.id}>{item.name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div className="inline-block relative w-1/2">
              <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                {options.map((item) => (
                  <option className='' value={item.id}>{item.name}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            {/* <p className="ml-2 text-xl text-yellow-300 font-semibold">Sản phẩm</p>
            <ul className="mx-5 flex">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
