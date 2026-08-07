import { auth } from "./firebase.js";
import {
    signInWithEmailAndPassword,
    GithubAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const provider = new GithubAuthProvider();

document.getElementById("githubLogin").onclick = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const githubId = result.user.providerData[0].uid;

            return fetch(`https://viljonsivu-default-rtdb.europe-west1.firebasedatabase.app/githubLinks/${githubId}.json`);
        })
        .then(r => r.json())
        .then(data => {
            if (data) {
                window.location.href = "success.html";
            } else {
                window.location.href = "notlinked.html";
            }
        })
        .catch((error) => {
            console.error(error);
        });
};

// Sähköpostikirjautuminen
document.getElementById("login").onclick = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = "success.html";
        })
        .catch((error) => {
            console.error(error);
            window.location.href = "error.html";
        });
};