import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyC2ocMpukP1MG8cRZa3j3BVD87WTaEME4E",
  authDomain: "local-bliss-416610.firebaseapp.com",
  projectId: "local-bliss-416610",
  storageBucket: "local-bliss-416610.appspot.com",
  messagingSenderId: "19580547296",
  appId: "1:19580547296:web:2ba87ec88cf93e4c3e6085",
  measurementId: "G-J81WFGV12H"
};

// Initializing................................................................
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, db, analytics };
