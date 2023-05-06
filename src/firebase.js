// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import { v4 } from "uuid";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_BUCKET,
  messagingSenderId: import.meta.env.VITE_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

export async function uploadFile(file, userId, filename) {
  const storageRef = ref(storage, `csv/${userId}/${filename}`);
  return await uploadBytes(storageRef, file, {
    cacheControl: "public, max-age=31536000",
    contentType: "text/json",
    customMetadata: { mode: "no-cors" },
  });
}

export async function getFileUrl(userId, filename) {
  const storageRef = ref(storage, `csv/${userId}/${filename}`);
  const url = await getDownloadURL(storageRef);
  const data = await fetch(url);
  const dataJson = await data.json();
  return dataJson;
}
