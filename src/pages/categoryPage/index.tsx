import Card from '../../components/card';
import { useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import CategorySidebar from '../../components/category-sidebar/desktop';
import CategorySidebarMobile from '../../components/category-sidebar/mobile';

export default function Category() {
  const inventoryFromRedux = useAppSelector((state: RootState) => state.inventory).inventory;
  const [isSort, setIsSort] = useState(false);
  const [sort, setSort] = useState<any>();
  const sortMethod = [
    { id: 1, name: 'Tất cả' },
    { id: 2, name: 'A - Z' },
    { id: 3, name: 'Z - A' },
    { id: 4, name: 'Giá cao - thấp' },
    { id: 5, name: 'Giá thấp - cao' },
  ];

  const handleSort = (e: any) => {
    let key = Number(e.target.value);
    setIsSort(true);
    if (key === 1) {
      setSort(inventoryFromRedux);
    }
    setTimeout(() => {
      if (key === 2) {
        let sort = inventoryFromRedux
          .slice()
          .sort((a: any, b: any) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
        setSort(sort);
      }
      if (key === 3) {
        let sort = inventoryFromRedux
          .slice()
          .sort((a: any, b: any) => (a.name < b.name ? 1 : b.name < a.name ? -1 : 0));
        setSort(sort);
      }
      if (key === 5) {
        let sort = inventoryFromRedux.slice().sort((a: any, b: any) => a.price - b.price);
        setSort(sort);
      }
      if (key === 4) {
        let sort = inventoryFromRedux.slice().sort((a: any, b: any) => b.price - a.price);
        setSort(sort);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col md:lg:flex-row md:lg:flex ">
      <div className="block w-full md:lg:hidden">
        <CategorySidebarMobile/>
      </div>
      <div className="hidden md:lg:block md:lg:w-1/6">
        <CategorySidebar />
      </div>

      <div className="w-full mx-auto">
        <div className="flex  justify-between">
          <span className="hidden md:lg:w-1/2 md:lg:block md:lg:text-xl md:lg:my-2">Danh sách các sản phẩm</span>
          <div className="flex mx-3 justify-end w-full gap-2 items-center">
            <span className="w-1/4 md:lg:text-right">  
              Lọc theo <i className="fa fa-filter text-gray-700"></i>
            </span>
           
            <select onClick={handleSort}  className="w-2/5 mr-7 md:lg:mr-0 mb-3 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline 
            md:lg:block md:lg:appearance-none md:lg:w-1/5 md:lg:bg-white md:lg:border md:lg:border-gray-400 md:lg:hover:border-gray-500 md:lg:px-4 md:lg:py-2 md:lg:pr-8 md:lg:rounded md:lg:shadow md:lg:leading-tight md:lg:focus:outline-none md:lg:focus:shadow-outline md:lg:my-3
            
            ">
            {sortMethod.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
              </select>
          </div>
        </div>
        <div className="grid gap-0  grid-cols-2 grid-rows-2   md:lg:grid md:lg:gap-4 md:lg:grid-cols-6 md:lg:grid-rows-2">
          {isSort ? <Card data={sort} /> : <Card data={inventoryFromRedux} />}
          {/* */}
        </div>
      </div>
    </div>
  );
}
