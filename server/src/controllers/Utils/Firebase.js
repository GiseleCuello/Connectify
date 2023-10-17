const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');
const dotenv = require('dotenv');

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

module.exports = { storage };

// const firebaseConfig = {
//   apiKey: "AIzaSyC6x854lGnyyzf7rbGuzZ3FobZn1fzfmco",
//   authDomain: "connectify-366f6.firebaseapp.com",
//   projectId: "connectify-366f6",
//   storageBucket: "connectify-366f6.appspot.com",
//   messagingSenderId: "755597773111",
//   appId: "1:755597773111:web:fe19381fc1cbfddb1c32b2",
//   measurementId: "G-27SQDFPS54"
// };
