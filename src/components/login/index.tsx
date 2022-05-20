import './style.scss';
import { useEffect, useRef, useState } from 'react';
import { signup, login, useAuth, logout, db, auth } from '../../queries/api/firebase';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { off } from 'process';
import { toast } from 'react-toastify';
import { addUserInfo } from 'store/reducer/userInfo';

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const currentUser = auth.currentUser;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLogin(true);
  }, [currentUser]);
  const handleLogin = async () => {
    try {
      await login(emailRef.current?.value, passwordRef.current?.value).then(async (data) => {
        const docRef = doc(db, 'users', data.user.uid);
        const getData = await getDoc(docRef);
        if (getData.exists()) {
          console.log(getData.data());
          dispatch(addUserInfo(getData.data()));
          if(getData.data().role == 'admin'){
            navigate('/admin')
          }else{
            navigate('/user')
          }
        } else {
          console.log('Không tồn tại thông tin');
        }
      });
    } catch {
      toast.error('Sai thông tin đăng nhập !', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };
  const handleSignUp = () => {
    try {
      signup(emailRef.current?.value, passwordRef.current?.value)
        .then(async (data: any) => {
          await setDoc(doc(db, 'users', data.user.uid), {
            role: 'user',
            name: data.user.email.replace('@gmail.com', ''),
            userID: data.user.uid,
            email: data.user.email,
            password: passwordRef.current?.value,
            phoneNumber: phoneRef.current?.value,
            isActive: true,
            address:'',
            photoURL: '',
          });
          toast.success('Đăng ký thành công', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          const docRef = doc(db, 'users', data.user.uid);
          const getData = await getDoc(docRef);
          if (getData.exists()) {
            console.log(getData.data());
            dispatch(addUserInfo(getData.data()));
            if(getData.data().role == 'admin'){
              navigate('/admin')
            }else{
              navigate('/user')
            }
          } else {
            console.log('Không tồn tại thông tin');
          }
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              toast.warn('Tài khoản đã được đăng ký', {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
              break;
          }
        });
      // dispatch(checkUserController(emailRef.current?.value));
    } catch {
      toast.error('Đăng ký không thành công', {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider).then(async (data: any) => {
      await setDoc(doc(db, 'users', data.user.uid), {
        role: 'user',
        name: data.user.email.replace('@gmail.com', ''),
        userID: data.user.uid,
        email: data.user.email,
        isActive: true,
        phoneNumber: data.user.phoneNumber,
        photoURL: data.user.photoURL,
      });
      const docRef = doc(db, 'users', data.user.uid);
      const getData = await getDoc(docRef);
      if (getData.exists()) {
        console.log(getData.data());
        await dispatch(addUserInfo(getData.data()));
        navigate('/user')
        
      } else {
        console.log('Không tồn tại thông tin');
      }
    });
    // .catch((error) => {
    //   console.log(error);
    // });
  };
  const showPassword = (e: any) => {
    let x = e.currentTarget.parentNode.childNodes[0];
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  };

  return (
    <div className="login h-screen flex justify-center">
      {isLogin ? (
        <form className="login-form bg-white bg-opacity-90 w-full md:w-1/3 lg:1/3 m-0 md:m-5 lg:m-5 p-5  md:rounded-2xl lg:rounded-2xl border border-gray-400">
          <div className="title">
            {name}

            <h2 className="font-bold uppercase ">Vui lòng đăng nhập</h2>
          </div>
          <div className="form">
            <div className="form-account flex flex-col focus:outline-none py-5">
              <label className="font-semibold pb-3" htmlFor="">
                Tài khoản đăng nhập / Gmail
              </label>
              <input
                placeholder="Nhập tên tài khoản"
                ref={emailRef}
                className="rounded-lg p-2"
                type="text"
              />
            </div>
            <div className="form-password flex flex-col pb-5">
              <div className="flex justify-between items-center">
                <label className="font-semibold py-3" htmlFor="">
                  Mật khẩu
                </label>
                <p className="text-blue-400">Quên mật khẩu</p>
              </div>
              <div className="input flex justify-between">
                <input
                  placeholder="Nhập mật khẩu"
                  ref={passwordRef}
                  className="rounded-lg p-2 w-full"
                  type="password"
                />
                <i onClick={(e) => showPassword(e)} className="far fa-eye"></i>
              </div>
            </div>
            <input type="checkbox" className="mr-2 mb-6" name="" id="" />
            Ghi nhớ thông tin đăng nhập
          </div>
          <div className=" flex flex-col  justify-evenly">
            <button
              type="button"
              onClick={handleLogin}
              className="btn-log py-2 px-4  rounded border-2 border-orange-400 font-medium"
            >
              Đăng nhập
            </button>
            <p className="flex justify-center py-3"> OR</p>
            <button
              type="button"
              onClick={loginWithGoogle}
              className="flex justify-center items-center bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 border border-gray-400 rounded shadow"
            >
              <img
                className="mr-2 h-5 w-5"
                src="https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK"
                alt=""
              />
              <span>Đăng nhập tài khoản với Google</span>
            </button>
            <p className="py-4">
              Bạn chưa có thông tin đăng nhập ?{' '}
              <button onClick={() => setIsLogin(false)}>
                <a className="text-blue-700 "> Đăng ký</a>
              </button>
            </p>
          </div>
        </form>
      ) : (
        // dang ki
        <form className="login-form  bg-white bg-opacity-90 w-full md:w-1/3 lg:1/3 m-0 md:m-5 lg:m-5 p-5  md:rounded-2xl lg:rounded-2xl border border-gray-400">
          <div className="title">
            <h2 className="font-bold uppercase ">Vui lòng đăng ký</h2>
          </div>
          <div className="form">
            <div className="form-account flex flex-col focus:outline-none pt-5 pb-2">
              <label className="font-semibold pb-3" htmlFor="">
                Tài khoản đăng ký / Gmail
              </label>
              <input
                ref={emailRef}
                className="rounded-lg p-2"
                type="text"
                placeholder="Nhập tên tài khoản"
              />
            </div>
            <div className="form-password flex flex-col pb-2">
              <div className="flex justify-between items-center">
                <label className="font-semibold py-3" htmlFor="">
                  Mật khẩu
                </label>
              </div>
              <div className="input flex justify-between">
                <input
                  ref={passwordRef}
                  className="rounded-lg p-2 w-full"
                  type="password"
                  placeholder="Nhập mật khẩu"
                />
                <i onClick={(e) => showPassword(e)} className="far fa-eye"></i>
              </div>
            </div>
            <div className="form-password flex flex-col pb-2">
              <div className="flex justify-between items-center">
                <label className="font-semibold py-3" htmlFor="">
                  Nhập lại mật khẩu
                </label>
              </div>
              <div className="input flex justify-between">
                <input
                  ref={passwordRef}
                  className="rounded-lg p-2 w-full"
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                />
                <i onClick={(e) => showPassword(e)} className="far fa-eye"></i>
              </div>
            </div>
            <div className="form-account flex flex-col focus:outline-none py-5">
              <label className="font-semibold pb-3" htmlFor="">
                Số điện thoại
              </label>
              <input
                ref={phoneRef}
                className="rounded-lg p-2"
                type="text"
                placeholder="Nhập số điện thoại"
              />
            </div>
          </div>
          <div className="w-full">
            <button
              type="button" //if don't use it will be refresh whenever user try to login
              onClick={handleSignUp}
              className="btn-log w-full py-2 px-4  rounded border-2 border-orange-400 font-medium"
            >
              Đăng ký
            </button>
            <button
              className="my-3 flex items-center gap-3 hover:text-blue-500"
              onClick={() => setIsLogin(true)}
            >
              {' '}
              <i className="fa fa-arrow-left"></i>
              <p>Đã có tài khoản</p>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
