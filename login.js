import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { auth } from "./firebase.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBgZZWKJtjuuLTsU2nKfhOH7wp3naSWiks",
    authDomain: "viljonsivu.firebaseapp.com",
    databaseURL: "https://viljonsivu-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "viljonsivu"
};
import {
    GithubAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const provider = new GithubAuthProvider();

document.getElementById("githubLogin").onclick = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Kirjauduttu:", result.user);
            window.location.href = "success.html";
        })
        .catch((error) => {
            console.error(error);
        });
};

const app2 = initializeApp(firebaseConfig);
const auth2 = getAuth(app2);
document.querySelector("#login").onclick = () => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    

    signInWithEmailAndPassword(auth2, email, password)
    .then((userCredential) => {
        const uid = userCredential.user.uid;
        window.location.href = "success.html"
    })
    .catch((error) => {
        window.location.href = "errorr.html";
    })
}
