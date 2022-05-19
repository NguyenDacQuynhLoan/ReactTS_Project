import { useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';

export default function AdminEdit() {
  const userInfo = useAppSelector((state: RootState) => state.userInfo).userInfo;
  const [isEdit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(true);
  };
  const handleSubmit = () => {
    setEdit(false);
  };
  const upload = () => {};

  return (
    <div className="w-full wrapped flex ">
      <div className="w-1/4 flex flex-col justify-center mt-12 mx-5">
        <img
          className="w-64 h-64 mx-auto rounded-full border-4 border-yellow-400"
          src={userInfo.photoURL}
          // src="https://john-mohamed.com/wp-content/uploads/2018/05/Profile_avatar_placeholder_large.png"
          alt=""
        />
        <button className="mt-5 mx-12 py-2  bg-yellow-400 rounded-full font-semibold text-white ">
          <input id="selectImage" type="file" hidden />
          <label htmlFor="selectImage">
            <i className="fas fa-cloud-upload mx-2"></i> Upload
          </label>
        </button>
      </div>

      <div className="w-3/4 mt-12">
        <form className="form">
          <div className="form-container">
            <div className=" m-3">
              <div className="flex items-center ">
                <p className="font-semibold text-2xl  pb-3 pt-2 ">Hồ sơ của tôi</p>
                {/* <i onClick={()=>{setEdit(true)}} className="fa fa-edit text-xl cursor-pointer"></i>
                <i  onClick={()=>{setEdit(false)}} className="fas fa-save text-xl cursor-pointer"></i> */}
              </div>
              <div className="">
                <div className="flex flex-col">
                  <div className="flex items-center mb-3 mr-2 w-full">
                    <span className="w-1/4">Họ Tên :</span>
                    <input
                      value={userInfo.name}
                      name=""
                      type="text"
                      className={
                        isEdit
                          ? 'w-1/4 focus:outline-none  border border-gray-300 px-2 rounded'
                          : 'w-1/4 focus:outline-none font-semibold px-2 rounded'
                      }
                    />{' '}
                  </div>
                  <div className="flex items-center mb-3 mr-2 w-full">
                    <span className="w-1/4">Chức năng :</span>
                    <input
                      value={userInfo.role}
                      name=""
                      type="text"
                      className={
                        isEdit
                          ? 'w-1/4 focus:outline-none  border border-gray-300 px-2 rounded'
                          : 'w-1/4 focus:outline-none font-semibold px-2 rounded'
                      }
                    />{' '}
                  </div>
                  <div className="flex items-center mb-3 mr-2 w-full">
                    <span className="w-1/4">Ngày sinh :</span>
                    {/* <input
                      name=""
                      type="text"
                      className="focus:outline-none  border border-gray-300 px-2 rounded"
                    />{' '} */}
                    <input
                      className="w-1/4 focus:outline-none  border border-gray-300 px-2 rounded"
                      type="date"
                      id="birthday"
                      name="birthday"
                    />
                  </div>
                  <div className="flex items-center mb-3 mr-2 w-full">
                    <span className="w-1/4">Số điện thoại :</span>
                    <input
                     value={userInfo.phoneNumber}
                      name=""
                      type="text"
                      className={
                        isEdit
                          ? 'w-1/4 focus:outline-none  border border-gray-300 px-2 rounded'
                          : 'w-1/4 focus:outline-none font-semibold px-2 rounded'
                      }
                    />{' '}
                  </div>
                  <div className="flex items-center mb-3 mr-2 w-full">
                    <span className="w-1/4">Email :</span>
                    <input
                     value={userInfo.email}
                      name=""
                      type="text"
                      className={
                        isEdit
                          ? 'w-1/4 focus:outline-none  border border-gray-300 px-2 rounded'
                          : 'w-1/4 focus:outline-none font-semibold px-2 rounded'
                      }
                    />{' '}
                  </div>
                  <div className="flex items-center mb-3 mr-2 w-full">
                    <span className="w-1/4">Mật khẩu :</span>
                    <input
                     value={userInfo.password}
                      name=""
                      type="text"
                      className={
                        isEdit
                          ? 'w-1/4 focus:outline-none  border border-gray-300 px-2 rounded'
                          : 'w-1/4 focus:outline-none font-semibold px-2 rounded'
                      }
                    />{' '}
                  </div>
                </div>
              </div>
            </div>
            <div className="btn w-1/2 rounded  justify-center flex gap-6">
              <button
                onClick={handleSubmit}
                type="button"
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
    </div>
  );
}
