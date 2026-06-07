import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    set,
    onValue
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyD-GyKXAY2ZSJlGk-vk_N5-VpiDhshzUyw",
    authDomain: "harshini-date-planner.firebaseapp.com",
    databaseURL: "https://harshini-date-planner-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "harshini-date-planner",
    storageBucket: "harshini-date-planner.firebasestorage.app",
    messagingSenderId: "832725790532",
    appId: "1:832725790532:web:2fa34748581da6c5aeb111"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export {
    db,
    ref,
    push,
    set,
    onValue
};