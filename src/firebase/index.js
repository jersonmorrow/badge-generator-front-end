import firebase from 'firebase/app';
import 'firebase/storage';
import config from '../config/index';

const firebaseConfig = {
  apiKey: config.firebaseApiKey,
  authDomain: 'badge-generator-adb42.firebaseapp.com',
  projectId: 'badge-generator-adb42',
  storageBucket: 'badge-generator-adb42.appspot.com',
  messagingSenderId: '497162240901',
  appId: '1:497162240901:web:3ca5a1a897d5bbf4cebaec',
  measurementId: 'G-NKV2BRNDJ5',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
