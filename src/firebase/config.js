const firebaseConfig = {
  apiKey: "AIzaSyDRMePCJjDHGTHCm5568KE0sQHGwvwKNOU",
  authDomain: "etl-tool-2021.firebaseapp.com",
  projectId: "etl-tool-2021",
  storageBucket: "etl-tool-2021.appspot.com",
  messagingSenderId: "327878026744",
  appId: "1:327878026744:web:7da324b7a8e1864278a20d",
  measurementId: "G-BZHEND41HG"
};

const devConfig = {
  apiKey: "AIzaSyDRMePCJjDHGTHCm5568KE0sQHGwvwKNOU",
  authDomain: "etl-tool-2021.firebaseapp.com",
  projectId: "etl-tool-2021",
  storageBucket: "etl-tool-2021.appspot.com",
  messagingSenderId: "327878026744",
  appId: "1:327878026744:web:7da324b7a8e1864278a20d",
  measurementId: "G-BZHEND41HG"
};

const config = process.env.NODE_ENV === 'production' ? firebaseConfig : devConfig;

export default config