let firebaseConfig = {
  apiKey: "AIzaSyBMJspwqbaqXg_nR2uXWkd6BjTgWHetSKA",
  authDomain: "blogging-website-5e5ea.firebaseapp.com",
  projectId: "blogging-website-5e5ea",
  storageBucket: "blogging-website-5e5ea.appspot.com",
  messagingSenderId: "1000197012492",
  appId: "1:1000197012492:web:63c5bcb0f30558b1968229"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();