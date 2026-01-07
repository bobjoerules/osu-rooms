import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAlQlj8YVo8lZftur7t7E00x6yTIYL9-TM',
  authDomain: 'osu-room-rates.firebaseapp.com',
  projectId: 'osu-room-rates',
  storageBucket: 'osu-room-rates.firebasestorage.app',
  messagingSenderId: '170430832418',
  appId: '1:170430832418:web:55761adfc3c0937ed5cf7b',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, storage };
