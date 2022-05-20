import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import formatCurrency from '../../currency';
import { useEffect, useState } from 'react';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../../queries/api/firebase';
import { getAllProducts } from 'store/reducer/inventory';
import DeleteModal from '../../modal/modal-delete';
import EditModal from '../../modal/modal-admin-edit';
export default function AdminListProduct() {
  const inventoryFromRedux = useAppSelector((state: RootState) => state.inventory).inventory;
  // const [newPrice, setPrice] = useState<number>(0);
  const [product, setProduct] = useState<any>([]);
  const [autoFill, setAutofill] = useState('');
  const [edit, setEdit] = useState() as any;
  const [editModal, setEditModal] = useState(false);
  const [deleted, setDeleted] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
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
        console.log(availableProduct);
        
        setProduct(availableProduct);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const sendEditData = (info: object) => {
    setEdit(info);
  };
  const sendDeleteData = (id: string) => {
    setDeleted(id);
  };

  const modalHandler = (confirm: boolean) => {
    setDeleteModal(confirm);
    setEditModal(confirm);
  };
  const deleteHandler = (accept: boolean) => {
    if (accept) {
      loadProducts();
      setDeleteModal(false);
    }
  };
  const editHandler = (accept: boolean) => {
    if (accept) {
      loadProducts();
      setEditModal(false);
    }
  };
  const searchProduct = (key: string) => {
    setTimeout(() => {
      let newProd = inventoryFromRedux.filter((product: any) =>
        product.name
          .toLowerCase()
          .replaceAll(' ', '')
          .trim()
          .includes(key.toLowerCase().replaceAll(' ', '').trim())
      );
      setProduct(newProd);
    }, 1000);
  };
  return (
    <div className="text-black flex flex-col">
      <div className="text-2xl m-3">Danh sách sản phẩm</div>
      <div className="w-4/5 bg-white flex ml-5 border border-grey-500 relative md:lg:w-1/2 md:lg:flex md:lg:ml-5 md:lg:border md:lg:border-grey-500  md:lg:relative   ">
        <i className="fa fa-search text-gray-500 abosolute flex items-center px-2"></i>
        <input
          onChange={(e) => searchProduct(e.target.value)}
          placeholder="Tìm kiếm sản phẩm"
          className=" bg-white w-5/6 py-2 bg-none ml-3 focus:outline-none"
          type="text"
          autoComplete="on"
        />
      </div>
      <div className="m-2">
        <div className="flex w-full text-xl my-3">
          <div className="hidden md:lg:block md:lg:w-1/5">Hình ảnh</div>
          <div className="hidden md:lg:block md:lg:w-1/5">Tên sản phẩm</div>
          <div className="hidden md:lg:block md:lg:w-1/5">Thông tin sản phẩm</div>
          <div className="hidden md:lg:block md:lg:w-1/5">Giá tiền</div>
          <div className="hidden md:lg:block md:lg:w-1/5">Chỉnh sửa</div>
          <div className="block w-2/3 md:lg:hidden">Thông tin sản phẩm</div>
          <div className="block text-center w-1/3 md:lg:hidden">Sửa</div>

        </div>
        {product.length > 0 ? (
          product.map((info: any) => (
            <div
              key={info.id}
              className="flex flex-col w-full h-full max-h-screen overflow-y-auto flex-grow bg-purple-50"
            >
              <div className="items-center flex w-full my-5  bg-purple-50 max-h-screen overflow-y-autox">
                <div className="w-1/5">
                  <img className=" sm:md:lg:w-40 sm:md:lg:h-40 md:lg:object-contain md:lg:m-2" src={info.imgArray[0]} alt="" />
                </div>
                <div className="w-3/5 md:lg:w-1/5">
                  <ul>
                    <li className="font-semibold my-2"> {info.name}</li>
                    <li className="hidden md:lg:block md:lg:text-xs">ID : {info.id}</li>
                    <li className="block text-red-500 font-semibold md:lg:hidden"> {formatCurrency.format(info.price)}</li>
                    <li  className="block text-blue-500 underline md:lg:hidden"><i>Xem chi tiết</i></li>

                  </ul>
                </div>
                <div className="hidden md:lg:block md:lg:w-1/5">
                  <ul>
                    <li>Loại : {info.category}</li>
                    <li>Hãng : {info.brand}</li>
                    <li>Khuyến mãi :{info.discPercent?info.discPercent + "%":"--"}</li>
                    <li>Còn hàng : {info.available}</li>
                  </ul>
                </div>
                <div className="hidden md:lg:block md:lg:w-1/5    md:lg:font-semibold md:lg:text-red-500">
                  {formatCurrency.format(info.price)}
                </div>
                <div className="w-1/5 flex  gap-6">
                  <i
                    onClick={() => {
                      setDeleteModal(true);
                      sendDeleteData(info.id);
                    }}
                    className=" hover:text-orange-500 fas fa-trash text-xl cursor-pointer"
                  ></i>
                  <i
                    onClick={() => {
                      setEditModal(true);
                      sendEditData(info);
                    }}
                    className=" hover:text-orange-500 fas fa-edit text-xl cursor-pointer"
                  ></i>
                </div>
              </div>
              <hr />
              <>
                {deleteModal ? (
                  <DeleteModal
                    isModalOpen={modalHandler}
                    deleteData={deleted}
                    isDelete={deleteHandler}
                  />
                ) : (
                  ''
                )}
                {editModal ? (
                  <EditModal isModalOpen={modalHandler} EditData={edit} isEdit={editHandler} />
                ) : (
                  ''
                )}
              </>
            </div>
          ))
        ) : (
          <div className="w-full">
            <span className="text-xl text-gray-500 ml-5 my-3">Sản phẩm không tồn tại ...</span>
          </div>
        )}
      </div>

    </div>
  );
}
