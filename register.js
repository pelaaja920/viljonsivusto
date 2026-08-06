import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyBgZZWKJtjuuLTsU2nKfhOH7wp3naSWiks",
    authDomain: "viljonsivu.firebaseapp.com",
    databaseURL: "https://viljonsivu-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "viljonsivu"
};
const app3 = initializeApp(firebaseConfig);
const auth3 = getAuth(app3);

document.querySelector("#register").onclick = () => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const username2 = document.querySelector("#usernameinput").value;

    createUserWithEmailAndPassword(auth3, email, password)
    .then((userCredential) => {
            const uid = userCredential.user.uid;

            return fetch(`https://viljonsivu-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username2,
                    admin: false
                })
            });
        })
    .then(() => {
        window.location.replace("successr.html");
    })
    .catch((error) => {
        window.location.replace("error.html")
    })

}
