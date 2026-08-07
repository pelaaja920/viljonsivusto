import { auth } from "./firebase.js";
import {
    signInWithEmailAndPassword,
    GithubAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const provider = new GithubAuthProvider();

// GitHub-kirjautuminen
document.getElementById("githubLogin").onclick = () => {
    fetch(`https://viljonsivu-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`)
        .then(r => r.json())
        .then(data => {
            if (data != null) {
                signInWithPopup(auth, provider)
        .then((result) => {
            window.location.href = "success.html";
        })
        .catch((error) => {
            console.error(error);
            window.location.replace("success.html")
        });
            }
            else {
                window.location.href = "notlinked.html";
            }
        })
    signInWithPopup(auth, provider)
        .then((result) => {
            window.location.href = "success.html";
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
            window.location.href = "errorr.html";
        });
};