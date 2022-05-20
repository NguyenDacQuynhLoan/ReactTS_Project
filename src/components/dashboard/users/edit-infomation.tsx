import { db, storage, storageRef } from '../../../queries/api/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import { addUserInfo } from 'store/reducer/userInfo';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function UserEdit() {
  const userInfo = useAppSelector((state: RootState) => state.userInfo).userInfo;
  const [isEdit, setEdit] = useState(true);
  const dispatch = useAppDispatch();
  // const [user,setUser]=useState<IUser|undefined>()
  const handleEdit = () => {
    setEdit(true);
  };

  const uploadAvater = (e: any): void => {
    const files = Array.from(e.target.files);
    uploadBytes(storageRef, files[0] as any).then((snapshot) => {
      console.log(snapshot.metadata);
      getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(async (item) => {
        let { photoURL = item, ...rest } = userInfo;
        let newUserInfo = Object.assign(rest, { photoURL: item });
        const userDoc = doc(db, 'users', userInfo.userID);
        updateDoc(userDoc, newUserInfo);
        dispatch(addUserInfo(newUserInfo));
        getUser();
      });
    });
  };
  const getUser = async () => {
    const docRef = doc(db, 'users', userInfo.userID);
    const getData = await getDoc(docRef);
    if (getData.exists()) {
      dispatch(addUserInfo(getData.data()));
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    let formValue = new FormData(e.target);
    let newChange = Object.fromEntries(formValue.entries());
    if (Object.values(newChange).includes('')) {
      toast.warning('Vui lòng kiểm tra lại thông tin', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    } else {
      setEdit(false);
      const userDoc = doc(db, 'users', userInfo.userID);
      updateDoc(userDoc, newChange);
      getUser();
      toast.success('Đã cập nhật thông tin !', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  return (
    <div className="w-full flex my-3 flex-row md:lg:w-5/6 md:lg:mx-auto md:lg:flex md:lg:flex-row ">
      <div className=" w-full items-center justify-center  md:lg:w-1/4 md:lg:flex md:lg:flex-col md:lg:justify-center md:lg:mt-12 md:lg:mx-5">
        <img
          className="w-36 h-36 p-2 mx-auto rounded-full border-2 
          border-yellow-400 md:lg:w-64 md:lg:h-64 md:lg:mx-auto md:lg:rounded-full md:lg:border-4 md:lg:border-yellow-400"
          src={
            userInfo.photoURL
              ? userInfo.photoURL
              : 'https://john-mohamed.com/wp-content/uploads/2018/05/Profile_avatar_placeholder_large.png'
          }
          alt=""
        />
        <button className="w-full mt-3 p-1 rounded-full font-semibold bg-yellow-400 font-semibold md:lg:mt-5 md:lg:mx-12 md:lg:py-2  md:lg:bg-yellow-400 md:lg:rounded-full md:lg:font-semibold md:lg:text-white ">
          <input onChange={uploadAvater} hidden type="file" name="fileAvatar" id="fileAvatar" />
          <label htmlFor="fileAvatar">
            <i className="fas fa-cloud-upload mx-2"></i>
            <span>Upload</span>
          </label>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="w-3/5  md:lg:w-3/4 md:lg:mt-12">
        <div>
          <div className=" m-3">
            <div className="flex items-center ">
              <p className="font-semibold text-2xl  pb-3 pt-2 ">Hồ sơ của tôi</p>
            </div>
            <div className="">
              <div className="flex flex-col">
                <div className="flex flex-col mb-2 md:lg:flex md:lg:flex-row md:lg:items-center md:lg:mb-3 md:lg:mr-2 md:lg:w-full">
                  <span className="w-full md:lg:w-1/4">Họ Tên :</span>
                  {isEdit ? (
                    <input
                      defaultValue={userInfo.name}
                      name="name"
                      type="text"
                      className="w-full focus:outline-none  border border-gray-300 px-2 rounded md:lg:w-1/4 md:lg:focus:outline-none  md:lg:border ,md:lg:border-gray-300 md:lg:px-2 md:lg:rounded"
                    />
                  ) : (
                    <input
                      readOnly
                      defaultValue={userInfo.name}
                      name="name"
                      type="text"
                      className="w-full focus:outline-none font-semibold px-2 rounded md:lg:w-1/4 md:lg:focus:outline-none md:lg:font-semibold md:lg:px-2 md:lg:rounded"
                    />
                  )}
                </div>

                <div className="flex flex-col mb-2 md:lg:flex md:lg:flex-row md:lg:items-center md:lg:mb-3 md:lg:mr-2 md:lg:w-full">
                  <span className="w-full md:lg:w-1/4">Số điện thoại :</span>
                  {isEdit ? (
                    <input
                      defaultValue={userInfo.phoneNumber}
                      name="phoneNumber"
                      type="text"
                      className="w-full focus:outline-none  border border-gray-300 px-2 rounded md:lg:w-1/4 md:lg:focus:outline-none  md:lg:border ,md:lg:border-gray-300 md:lg:px-2 md:lg:rounded"
                    />
                  ) : (
                    <input
                      readOnly
                      defaultValue={userInfo.phoneNumber}
                      name="phoneNumber"
                      type="text"
                      className="w-full focus:outline-none font-semibold px-2 rounded md:lg:w-1/4 md:lg:focus:outline-none md:lg:font-semibold md:lg:px-2 md:lg:rounded"
                    />
                  )}
                </div>
                <div className="flex flex-col mb-2 md:lg:flex md:lg:flex-row md:lg:items-center md:lg:mb-3 md:lg:mr-2 md:lg:w-full">
                  <span className="w-full md:lg:w-1/4">Địa chỉ :</span>
                  {isEdit ? (
                    <input
                      defaultValue={userInfo.address ? userInfo.address : ''}
                      name="address"
                      type="text"
                      className="w-full focus:outline-none  border border-gray-300 px-2 rounded md:lg:w-1/4 md:lg:focus:outline-none  md:lg:border ,md:lg:border-gray-300 md:lg:px-2 md:lg:rounded"
                    />
                  ) : (
                    <input
                      readOnly
                      defaultValue={userInfo.address ? userInfo.address : ''}
                      name="address"
                      type="text"
                      className="w-full focus:outline-none font-semibold px-2 rounded md:lg:w-1/4 md:lg:focus:outline-none md:lg:font-semibold md:lg:px-2 md:lg:rounded"
                    />
                  )}
                </div>
                <div className="flex flex-col mb-2 md:lg:flex md:lg:flex-row md:lg:items-center md:lg:mb-3 md:lg:mr-2 md:lg:w-full">
                  <span className="w-full md:lg:w-1/4">Chức năng :</span>
                  {/* {isEdit ? (
                      <input
                        defaultValue={userInfo.role}
                        name="role"
                        type="text"
                        className="w-1/4 focus:outline-none  border border-gray-300 px-2 rounded"
                      />
                    ) : ( */}
                  <input
                    readOnly
                    defaultValue={userInfo.role}
                    name="role"
                    type="text"
                    className="w-full focus:outline-none font-semibold px-2 rounded md:lg:w-1/4 md:lg:focus:outline-none md:lg:font-semibold md:lg:px-2 md:lg:rounded"
                  />
                  {/* )} */}
                </div>
                <div className="flex flex-col mb-2 md:lg:flex md:lg:flex-row md:lg:items-center md:lg:mb-3 md:lg:mr-2 md:lg:w-full">
                  <span className="w-full md:lg:w-1/4">Email :</span>
                  {/* {isEdit ? (
                      <input
                        defaultValue={userInfo.email}
                        name="email"
                        type="text"
                        className="w-1/4 focus:outline-none  border border-gray-300 px-2 rounded"
                      />
                    ) : ( */}
                  <input
                    readOnly
                    defaultValue={userInfo.email}
                    name="email"
                    type="text"
                    className="w-full focus:outline-none font-semibold px-2 rounded md:lg:w-1/4 md:lg:focus:outline-none md:lg:font-semibold md:lg:px-2 md:lg:rounded"
                  />
                  {/* )} */}
                </div>
                <div className="flex flex-col mb-2 md:lg:flex md:lg:flex-row md:lg:items-center md:lg:mb-3 md:lg:mr-2 md:lg:w-full">
                  <span className="w-full md:lg:w-1/4">Mật khẩu :</span>
                  {isEdit ? (
                    <input
                      defaultValue={userInfo.password}
                      name="password"
                      type="text"
                      className="w-full focus:outline-none  border border-gray-300 px-2 rounded md:lg:w-1/4 md:lg:focus:outline-none  md:lg:border ,md:lg:border-gray-300 md:lg:px-2 md:lg:rounded"
                    />
                  ) : (
                    <input
                      readOnly
                      defaultValue={userInfo.password}
                      name="password"
                      type="text"
                      className="w-full focus:outline-none font-semibold px-2 rounded md:lg:w-1/4 md:lg:focus:outline-none md:lg:font-semibold md:lg:px-2 md:lg:rounded"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full rounded justify-center flex gap-6 md:lg:w-1/2 md:lg:rounded  md:lg:justify-center md:lg:flex  md:lg:gap-6">
            <button
              type="submit"
              className="font-semibold p-3 bg-orange-500 text-white w-40 rounded active:shadow-xl"
            >
              Lưu
            </button>
            <button
              onClick={handleEdit}
              type="button"
              className="font-semibold p-3 border-4 border-orange-500 text-orange-500 w-40 rounded  active:shadow-xl"
            >
              Chỉnh sửa
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
