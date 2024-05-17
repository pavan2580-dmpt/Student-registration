import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABQMjOI0kmlY8yD1LUDZPyaXuLYhtPI2A",
  authDomain: "studentregistration-afdf0.firebaseapp.com",
  projectId: "studentregistration-afdf0",
  storageBucket: "studentregistration-afdf0.appspot.com",
  messagingSenderId: "290908853164",
  appId: "1:290908853164:web:743d07f3cd73f6a10ae009",
  measurementId: "G-GLFW1R95DR",
};

const app = initializeApp(firebaseConfig);

export const Db = getFirestore(app);


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyDXkIZgXm8JaCyA-oCAwPA0wT6Lry8Srwg",
//   authDomain: "studentregisterfromto.firebaseapp.com",
//   projectId: "studentregisterfromto",
//   storageBucket: "studentregisterfromto.appspot.com",
//   messagingSenderId: "731801629940",
//   appId: "1:731801629940:web:430480468c19144ed39aa1",
//   measurementId: "G-NENDB5M8C8"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);