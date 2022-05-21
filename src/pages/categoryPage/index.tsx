import Card from '../../components/card';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
// import CategorySidebar from '../../components/category-sidebar/desktop';
import CategorySidebarMobile from '../../components/category-sidebar/mobile';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../queries/api/firebase';
import { getAllProducts } from 'store/reducer/inventory';

export default function Category() {
  const inventoryFromRedux = useAppSelector((state: RootState) => state.inventory).inventory;
  const [product, setProduct] = useState([]);
  const [isSort, setIsSort] = useState(false);
  const [sort, setSort] = useState<any>();
  const dispatch = useAppDispatch();
  const sortMethod = [
    { id: 1, name: 'Tất cả' },
    { id: 2, name: 'A - Z' },
    { id: 3, name: 'Z - A' },
    { id: 4, name: 'Giá cao - thấp' },
    { id: 5, name: 'Giá thấp - cao' },
  ];

  useEffect(() => {
    loadProducts();
  }, []);
  const loadProducts = () => {
    let productsFirebase: any = [];

    getDocs(collection(db, 'products'))
      .then((data) => {
        data.docs.forEach((doc) => {
          productsFirebase.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        let availableProduct = productsFirebase.filter(
          (element: any) => element.isDeleted == false
        );
        dispatch(getAllProducts(availableProduct));
        setProduct(availableProduct);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSort = (e: any) => {
    let key = Number(e.target.value);
    setIsSort(true);
    if (key === 1) {
      setSort(inventoryFromRedux);
    }
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
  };
  const filterByCategory = (e: any) => {
    setIsSort(true);
    if (Number(e) == 1) {
      let newProd = product.filter((item: any) => item.category == 'phone');
      setSort([...newProd]);
    } else if (Number(e) == 2) {
      let newProd = product.filter((item: any) => item.category == 'laptop');
      setSort(newProd);
    } else if (Number(e) == 3) {
      let newProd = product.filter((item: any) => item.category == 'headphone');
      setSort(newProd);
    } else if (Number(e) == 4) {
      let newProd = product.filter((item: any) => item.category == 'accessory');
      setSort(newProd);
    }
  };
  return (
    <div className="flex flex-col ">
      {/* <div className="hidden md:lg:block md:lg:w-1/6">
        <CategorySidebar />
      </div> */}

      <div className="w-full md:lg:w-4/5 md:lg:mx-auto">
        <div className="md:lg:flex md:lg:flex-row md:lg:items-center md:lg:justify-between">
          <span className="w-1/2  text-xl ml-5 my-2">Danh sách các sản phẩm</span>
          <div className="w-full  md:lg:w-1/3">
            <CategorySidebarMobile filterCategory={filterByCategory} />
          </div>
          <div className="flex flew-row mx-3 justify-end w-full gap-2  items-center md:lg:w-2/5">
            <span className=" md:lg:text-right">
              Lọc theo <i className="fa fa-filter text-gray-700"></i>
            </span>

            <select
              onClick={handleSort}
              className="w-2/5 mr-12 p-0  block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline 
              md:lg:mr-0 
            md:lg:block md:lg:appearance-none md:lg:w-3/5 md:lg:bg-white md:lg:border md:lg:border-gray-400 md:lg:hover:border-gray-500 md:lg:px-4 md:lg:py-2 md:lg:pr-8 md:lg:rounded md:lg:shadow md:lg:leading-tight md:lg:focus:outline-none md:lg:focus:shadow-outline md:lg:my-3
            
            "
            >
              {sortMethod.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid gap-0  grid-cols-2 grid-rows-2   md:lg:grid md:lg:gap-4 md:lg:grid-cols-6 md:lg:grid-rows-2">
          {isSort ? <Card data={sort} /> : <Card data={product} />}
          {/* */}
        </div>
      </div>
    </div>
  );
}
