"use client";

import { modalState } from "@/atoms/modalAtom";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import { CameraIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import {db, storage} from "@/firebase"
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { ref, getDownloadURL, uploadString } from "firebase/storage";

export default function Modal() {
  const [open, setOpen] = useRecoilState(modalState);
  const {data: session} = useSession()
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading,setLoading] = useState(false)
  const filePickerRef = useRef(null);
  const captionRef=useRef(null)
  

  const uploadPost = async () => {
    if(loading) return;
    

    setLoading(true)

    const docRef= await addDoc(collection(db, 'posts'), {
      username: session?.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timeStamp: serverTimestamp()
    })

    console.log("New doc added with ID", docRef.id);

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile, "data_url").then(async snapshot => {
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "posts", docRef.id), {
        image: downloadURL
      })
    });

    setOpen(false)
    setLoading(false)
    setSelectedFile(null)

  }


  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          className="fixed w-full h-screen left-0 top-0 bg-black/25 flex items-center justify-center "
        >
          {/* Cart */}
          <motion.div
            layout
            onClick={(e) => e.stopPropagation()}
            className="bg-white inline-block align-bottom rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
          >
            <div>
              {selectedFile ? (
                <img src={selectedFile} className="w-full object-contain cursor-pointer" onClick={() => setSelectedFile(null)} alt="selectedImage" />
              ) : (
                <div
                  onClick={() => filePickerRef.current.click()}
                  className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                >
                  <CameraIcon
                    className="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                </div>
              )}

              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-lg loading-6 font-medium text-gray-900">
                  Upload a photo
                </h3>
                <div>
                  <input
                    ref={filePickerRef}
                    type="file"
                    hidden
                    onChange={addImageToPost}
                  />
                </div>
                <div>
                  <input className="border-none focus:ring-0 w-full text-center" type="text" ref={captionRef} placeholder="Please enter a caption" />
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  disabled={!selectedFile}
                  onClick={() => uploadPost()}
                  className="inline-flex justify-center w-full rounded-md border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                >
                  Upload Post
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
