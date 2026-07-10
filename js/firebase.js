import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {

apiKey: "AIzaSyBCWKQ-4_nYVCBfLLUZDQDzHYbrOziow6g",

authDomain: "sg-recordz.firebaseapp.com",

projectId: "sg-recordz",

storageBucket: "sg-recordz.firebasestorage.app",

messagingSenderId: "225419832232",

appId: "1:225419832232:web:1f41ff4e5e659c79db0b9d"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
