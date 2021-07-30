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
apiKey: "AIzaSyAXWk-46y7UHC72-TxLp09vVBSplboK91M",
authDomain: "adebola1-beeee.firebaseapp.com",
projectId: "adebola1-beeee",
storageBucket: "adebola1-beeee.appspot.com",
messagingSenderId: "116822433204",
appId: "1:116822433204:web:6c0f10a86d14315b4326e1",
measurementId: "G-HEFNJT5LSG"
};

const config = process.env.NODE_ENV === 'production' ? firebaseConfig : devConfig;

export default config