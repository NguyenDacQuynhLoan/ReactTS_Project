import { db } from '../../queries/api/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default function DeleteModal(props: any) {
  const deletedController = () => {    
    if (props.deleteData) {
      
      const deleted = doc(db, 'products', props.deleteData);
      const newChange = { isDeleted: true };
      updateDoc(deleted, newChange);
    }
    props.isDelete(true);
  };
  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-5">
      <div className="max-w-sm p-6 bg-white divide-y divide-gray-500">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl">Model Title</h3>
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
          <p className="mb-4 text-sm">Xác nhận xóa sản phẩm khỏi danh sách</p>
          <button onClick={deletedController} className="px-4 py-2 text-white bg-green-600 rounded">
            Xóa
          </button>
          <button
            onClick={() => props.isModalOpen(false)}
            className="px-4 py-2 text-white bg-red-600 rounded"
          >
            Thoát
          </button>
        </div>
      </div>
    </div>
  );
}
