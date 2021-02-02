import firebase from 'firebase';

const config = {
  apiUrl: 'https://badge-generator-api.herokuapp.com',
  firebaseApiKey: firebase.config().firebaseapi.key,
};

export default config;
