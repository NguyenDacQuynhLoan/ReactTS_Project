import formatCurrency from '../../../components/currency';
import { collection, getDoc, getDocs, doc, where, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../../../queries/api/firebase';
// import  {Line} from 'react-chartjs-2';

export default function UserBoughtProduct() {
  // const currentUser = auth.currentUser;

  const [order, setOrder] = useState<any>([]);
  useEffect(() => {
    // getOrder();
  }, []);
  // const getOrder = async () => {
  //   const prod: any[] = [];
  //   if (currentUser != null) {
  //     getDocs(collection(db, `orders/`));
  //     const q = query(collection(db, 'orders'), where('userID', '==', currentUser.uid) || '');
  //     const data = await getDocs(q);
  //     for (const order of data.docs) {
  //       const q2 = query(collection(db, `orders/${order.id}/product`));
  //       const data2 = await getDocs(q2);
  //       for (const item of data2.docs) {
  //         prod.push(item.data());
  //       }
  //     }
  //     setOrder(prod);
  //   }
  // };
  // const searchProduct = (key: string) => {
  //   if (key == '') {getOrder()}
  //     let newOrder = order.filter((product: any) =>
  //       product.nameProd
  //         .toLowerCase()
  //         .replaceAll(' ', '')
  //         .trim()
  //         .includes(key.toLowerCase().trim().replaceAll(' ', ''))
  //     );
  //     setOrder(newOrder);
    
  // };
  return (
    <div>
      {/* <Line/> */}
    </div>
    // <div className="">
    //   <div>
    //     <div>
    //       <span className="mx-4 text-xl">Sản phẩm đã mua</span>
    //     </div>
    //     <div className=" mx-4 border-2 border-gray-300 rounded">
    //       <input
    //         onChange={(e) => searchProduct(e.target.value)}
    //         className="focus:outline-none  w-full px-4 py-1 bg-gray-100 border-0"
    //         type="text"
    //         placeholder="Tra cứu sản phẩm ..."
    //       />
    //     </div>
    //     <div className=" flex w-full	">
    //       <div className="w-full  mx-4">
    //         {order.length > 0 &&
    //           order.map((item: any) => (
    //             <div
    //               key={item.id}
    //               className=" flex w-full  items-center justify-between my-3 bg-gray-50	"
    //             >
    //               <div className="btn-order cursor-pointer flex  h-full ">
    //                 <div className=" cursor-pointer my-2 h-full">
    //                   <img className="w-20 h-20" src={item.image[0]} alt="" />
    //                 </div>
    //                 <div className="flex flex-col">
    //                   <span className="">{item.nameProd}</span>
    //                   <span className="">{formatCurrency.format(item.price)}</span>
    //                 </div>
    //               </div>

    //               <div className="btn-order cursor-pointer  h-full  mx-3">
    //                 <button className="font-semibold rounded-full bg-orange-500 p-2">
    //                   <span className="text-white">Thêm vào giỏ hàng </span>
    //                 </button>
    //               </div>
    //             </div>
    //           ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
