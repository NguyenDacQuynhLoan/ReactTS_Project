import { useState } from 'react';

export default function CategorySidebarMobile(props:any) {
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
  const filterByCategory =(optionId:any)=>{
    props.filterCategory(optionId)
  }
  return (
    <div className="flex h-full">
      <div className=" w-full flex flex-col  ">
          <div className="my-4 flex mx-2 gap-2">
            <div className="inline-block relative w-5/6 mx-auto">
              <select 
              onChange={(e)=>filterByCategory(e.target.value)} 
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                {options.map((item) => (
                  <option  key={item.id} className='' value={item.id}>{item.name}</option>
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
            {/* <div className="inline-block relative w-1/2">
              <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                {options.map((item) => (
                  
                  <option key={item.id} className='' value={item.id}>{item.name}</option>
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
          
          </div> */}
        </div>
      </div>
    </div>
  );
}
