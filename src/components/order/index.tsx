import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import { removeCart, quantityPlusCart, quantityMinusCart } from 'store/reducer/cart';
import formatCurrency from '../currency';

import './style.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import DeleteModal from '../modal/modal-delete';
import { IProduct } from '../../types/product';

export default function Order(props: any) {
  const dispatch = useAppDispatch();
  const cartFromRedux = useAppSelector((state: RootState) => state.cart).cart;
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleted, setDeleted] = useState('');

  const quantityPlus = (index: number) => {
    dispatch(quantityPlusCart(index));
  };

  const quantityMinus = (index: number) => {
    if (cartFromRedux[index].quantity === 1) {
    } else {
      dispatch(quantityMinusCart(index));
    }
  };
  const modalHandler = (confirm: boolean) => {
    setDeleteModal(confirm);
  };
  const deleteHandler = (accept: boolean, e: IProduct) => {
    if (accept) {
      dispatch(removeCart(e));
      setDeleteModal(false);
    }
  };
  const deleteItem = () => {
    setDeleteModal(true);
  };

  return (
    <>
      {cartFromRedux.length > 0 ? (
        cartFromRedux.map((e: any, index: number) => (
          <div key={e.id} className="productOrder cursor-pointer">
            <div className="flex w-full items-center justify-evenly">
              <div className="prod-info  flex items-center w-1/2  md:lg:flex md:lg:items-center md:lg:my-2">
                <Link to={`/detail/${e.id}`}>
                  <div className="info-img rounded-xl border border-neutral-300 cursor-pointer">
                    <img
                      className=" w-14 h-14 object-contain   rounded-xl mx-auto "
                      src={e.imgArray[0]}
                      alt=""
                    />
                  </div>
                </Link>
                <div className="info-text flex flex-col mx-4">
                  <p>
                    <b> {e.name}</b>
                  </p>
                  <p className="hidden md:lg:block md:lg:text-gray-300">ID:{e.id}</p>
                </div>
              </div>
              <div className="prod-price hidden md:lg:block">
                <p className="font-medium text-red-600">{formatCurrency.format(e.price)}</p>
              </div>
              <div className="prod-quantity w-1/3 md:lg:flex md:lg:items-center">
                <button
                  onClick={() => quantityPlus(index)}
                  className="bg-gray-300 rounded-2xl px-1"
                >
                  <i className="fa fa-plus"></i>
                </button>
                <input
                  value={e.quantity}
                  className="focus:outline-none rounded-lg  p-1 text-center"
                  type="number"
                  name=""
                  min="0"
                  id=""
                />
                <button
                  onClick={() => quantityMinus(index)}
                  className="bg-gray-300 rounded-2xl px-1"
                >
                  <i className="fa fa-minus"></i>
                </button>
              </div>
              <div onClick={() => deleteItem()} className="prod-delete">
                <i className="fas fa-backspace "></i>
              </div>
            </div>
            <hr />
            {deleteModal ? (
              <DeleteModal
                isModalOpen={modalHandler}
                deleteData={deleted}
                isDelete={(check: boolean) => {
                  deleteHandler(check, e);
                }}
              />
            ) : (
              ''
            )}
          </div>
        ))
      ) : (
        <div className="my-4 text-xl mx-5 ">Hãy thêm sản phẩm vào giỏ hàng của bạn...</div>
      )}
    </>
  );
}
