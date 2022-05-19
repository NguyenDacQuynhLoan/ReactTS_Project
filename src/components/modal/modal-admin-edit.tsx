import { db } from '../../queries/api/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import './edit.scss';
import { toast } from 'react-toastify';

export default function EditModal(props: any) {
  const options = ['laptop', 'phone', 'headphone', 'accessory'];
  const editHandler = async (e: any) => {
    e.preventDefault();
    const formValue = new FormData(e.target);
    let newChange = Object.fromEntries(formValue.entries());    
    if (!Object.values(newChange).includes('')) {
      const userDoc = doc(db, 'products', props.EditData.id);
      updateDoc(userDoc, newChange);
      props.isEdit(true);
      toast.success('Cập nhật sản phẩm thành công !', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      toast.warn('Chỉnh sửa sản phẩm còn thiếu thông tin !', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-end justify-center bg-gray-800 bg-opacity-5 md:lg:fixed md:lg:inset-0 md:lg:flex  md:lg:items-center md:lg:justify-center md:lg:bg-gray-800 md:lg:bg-opacity-5">
      <form
        onSubmit={editHandler}
        className="w-full h-3/5 p-6 bg-white divide-y divide-gray-500 md:lg:w-2/5 md:lg:p-6 md:lg:bg-white md:lg:divide-y md:lg:divide-gray-500"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-2xl">chỉnh sửa sản phẩm</h3>
          <svg
            onClick={() => props.isModalOpen(false)}
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="mt-4">
          <div className="mb-4 text-sm my-2 flex gap-2 justify-between">
            <p className="w-1/3">Tên:</p>
            <input
              defaultValue={props.EditData.name}
              name="name"
              type="text"
              className="w-2/5 border border-gray-500"
            />
          </div>
          <div className="mb-4 text-sm my-2 flex gap-2 justify-between">
            <p className="w-1/3">Giá:</p>
            <input
              defaultValue={props.EditData.price}
              type="number"
              name="price"
              min={1}
              className="w-2/5 border border-gray-500"
            />
          </div>
          <div className="mb-4 text-sm my-2 flex gap-2 justify-between">
            <p>Còn hàng:</p>
            <input
              defaultValue={props.EditData.avaiable}
              type="number"
              name="avaiable"
              min={1}
              className="w-2/5 border border-gray-500"
            />
          </div>
          <div className="mb-4 text-sm my-2 flex gap-2 justify-between">
            <p>Hãng:</p>
            <input
              defaultValue={props.EditData.brand}
              type="text"
              name="brand"
              min={1}
              className="w-2/5 border border-gray-500"
            />
          </div>
          <div className="mb-4 text-sm my-2 flex gap-2 justify-between">
            <p>
              Phân loại: <b>{/* {formatCurrency.format(infoProd.price)} */}</b>{' '}
            </p>
            <select name="category" className="w-2/5  border border-gray-500" id="">
              {options.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="mb-4 text-sm my-2 flex gap-2 justify-between items-center">
            <p>Hình ảnh (URL) </p>
            {/* <div className="border border-gray-400 bg-gray-200 px-3 py-1 rounded-full ">
              <label className="flex gap-2 item-center  cursor-pointer " htmlFor="upload">
                <i className="fa fa-upload mt-1"></i>
                <span>Chọn ảnh</span>
              </label>
            </div> */}
            <div className="w-2/3 flex justify-end">
              <input
                id="upload"
                // name="imgArray"
                type="file"
                multiple
                className="w-3/5 text-blue-500"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-gray-400 p-2 w-full "
          //   onClick={() => editHandler(infoProd.id, newPrice)}
          // onClick={()=>}
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
}
