import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
    console.log("Käyttäjä:", user);
    if (user != null) {
        document.getElementById("loginbutton").hidden = true;
        document.getElementById("logoutbutton").hidden = false;
    }
    else {
        document.getElementById("loginbutton").hidden = false;
        document.getElementById("logoutbutton").hidden = true;
    }
    
});