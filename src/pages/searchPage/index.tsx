import Detail from '../../components/detail';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import Card from '../../components/card';

export default function Search() {
  const inventoryFromRedux = useAppSelector((state: RootState) => state.inventory).inventory;
  const { keyword } = useParams() as any;
  const [product, setProduct] = useState<any>([]);
  useEffect(() => {
    searching();
  }, [keyword]);
  const searching = () => {
    let newProd = [];
    newProd = inventoryFromRedux.filter((product: any) =>
      product.name
        .toLowerCase()
        .replaceAll(' ', '')
        .trim()
        .includes(keyword.toLowerCase().trim().replaceAll(' ', ''))
    );

    setProduct(newProd);
  };
  return (
    <div>
      {product.length > 0 ? (
        <div>
          <div className="grid gap-2 grid-cols-2 grid-rows-2 md:lg:w-4/5 md:lg:mx-auto md:lg:grid md:lg:gap-4 md:lg:grid-cols-6 md:lg:grid-rows-2">
            <Card data={product} />
          </div>
          <div className="w-full mx-auto flex justify-center">
            <Link to={'/'}>
              <button className="bg-orange-500 p-2 my-5  items-center  flex gap-2">
                <i className="fa fa-arrow-left"></i>
                <p>Về trang chủ</p>
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className=" h-96 my-12 	flex flex-col  items-center justify-center">
          <div className=" w-full mx-auto flex justify-center">
            <span className="text-2xl py-12">Sản phẩm không tồn tại</span>
          </div>
          <div className="w-full mx-auto flex justify-center">
            <Link to={'/'}>
              <button className="bg-orange-500 p-2 my-5  items-center  flex gap-2">
                <i className="fa fa-arrow-left"></i>
                <p>Về trang chủ</p>
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
