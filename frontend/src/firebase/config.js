
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxV6e_GMHwV6Kw514k-P72_H0Y03PlgDA",
  authDomain: "e-commerce-prg.firebaseapp.com",
  projectId: "e-commerce-prg",
  storageBucket: "e-commerce-prg.appspot.com",
  messagingSenderId: "48499650731",
  appId: "1:48499650731:web:d4d32a25b9d4a8624f47ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);