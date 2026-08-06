
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBgZZWKJtjuuLTsU2nKfhOH7wp3naSWiks",
    authDomain: "viljonsivu.firebaseapp.com",
    databaseURL: "https://viljonsivu-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "viljonsivu"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);