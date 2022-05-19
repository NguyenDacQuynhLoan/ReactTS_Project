import { collection, doc, getDoc, getDocs, query, QueryConstraint } from "firebase/firestore";
import { listeners } from "process";
import { db } from "../queries/api/firebase";

// export const getDocsProduct=(collectionKey:string)=>{
//         let productsFirebase: any = [];
    
//         getDocs(collection(db, collectionKey))
//           .then((data) => {
//             data.docs.forEach((doc) => {
//               productsFirebase.push({
//                 ...doc.data(),
//                 id: doc.id,
//               });
//             });
//             console.log(productsFirebase);
            
//             return  productsFirebase.filter(
//               (element: any) => element.isDeleted == false
//             ); 
//           })
//           .catch((err) => {
//             console.log(err.message);
//           });
      
// }


export const getDocData = async (path:string, ...queryConstraints: QueryConstraint[]) => {
  try {
    const list: any[] =[];
    const docRef = query(collection(db, path), ...queryConstraints);
    const res = await getDocs(docRef);

    for(const doc of res.docs) {
        list.push(doc);
    }

    return list;

  } catch (error) {
    console.log(error)
  }
}


// getDocData.then((rses) => )


