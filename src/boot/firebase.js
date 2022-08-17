import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDodBjfOUCxqZy93Titu6anve6tAI70w5U",
  authDomain: "twitter-clone-vue-813fe.firebaseapp.com",
  projectId: "twitter-clone-vue-813fe",
  storageBucket: "twitter-clone-vue-813fe.appspot.com",
  messagingSenderId: "949057188527",
  appId: "1:949057188527:web:3be3cdec37b30533309a5a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default db; app
