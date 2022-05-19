import Nav from '../../components/navbar';
import Card from '../../components/card';
import Carousel from '../../components/carousel';
import { auth, db, useAuth } from '../../queries/api/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import HotSale from '../../components/hot-sales';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getAllProducts } from 'store/reducer/inventory';
import { RootState } from 'store/store';
import LoadersLoading from '../../components/loading/loading-loaders';
import SpinnerLoading from '../../components/loading/loading-spinner';
import { IProduct } from '../../types/product';
// import { getDocData, getDocsProduct } from 'shared/products';

export default function Home() {
  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState<IProduct[]>([]);
  const [laptop, setLaptop] = useState<IProduct[]>([]);
  const [isGetProduct, setGetProduct] = useState(false);
  // const [loader, setLoader] = useState(true);
  const currentUser = auth.currentUser;
  useEffect(() => {
    load();
  }, []);
  const load = () => {
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
        if (availableProduct) {
          setGetProduct(true);
          dispatch(getAllProducts(availableProduct));

          let phoneCategory = availableProduct
            .filter((phone: any) => phone.category === 'phone')
            .slice(0, 12);
          setPhone(phoneCategory);

          let latopCategory = availableProduct
            .filter((laptop: any) => laptop.category === 'laptop')
            .slice(0, 12);
          setLaptop(latopCategory);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="home ">
      {isGetProduct ? (
        <div>
          <div className="flex justify-center h-56 md:h-96 lg:h-96 ">
            <Carousel />
          </div>

          <div className="w-full md:lg:w-4/5 md:lg:mx-auto">
            <div className="mx-12">
            <HotSale />

            </div>
            <Nav />
            <div className="flex flex-col mx-auto" >
              <div className="flex flex-col mx-3 md:mx-0 lg:mx-0">
                <div className="font-semibold text-xl mx-6 my-3">Điện thoại</div>

                <div className="grid md:lg:grid md:lg:gap-3 gap-4 grid-cols-2 grid-rows-2 md:grid-cols-6 md:grid-rows-2 lg:grid-cols-6 lg:grid-rows-2 ">
                  <Card data={phone} />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="font-semibold text-xl mx-6 my-3">Laptop</div>

                <div className="grid gap-2 grid-cols-2 grid-rows-2 md:gap-4 md:grid-cols-6 md:grid-rows-2 lg:gap-4 lg:grid-cols-6 lg:grid-rows-2">
                  <Card data={laptop} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SpinnerLoading />
      )}
    </div>
  );
}
