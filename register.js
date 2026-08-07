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
                    admin: false,
                    description: "This user has no description",
                    avatar: "https://th.bing.com/th/id/OIP.oFCdkrt8_o9UdkAAD-SI1QHaHa?w=200&h=200&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
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
import {
    GithubAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const provider = new GithubAuthProvider();

document.querySelector("#githubRegister").onclick = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const uid = result.user.uid;
            const githubUsername =
                result.user.reloadUserInfo?.screenName ||
                result.user.providerData[0]?.displayName;

            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            return fetch("https://api.github.com/user", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(r => r.json())
            .then(data => {
                return fetch(`https://viljonsivu-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: githubUsername,
                        admin: false,
                        description: data.bio || "This user has no description",
                        avatar: data.avatar_url,
                        githubId: data.id
                    })
                })
                .then(() => {
                    return fetch(`https://viljonsivu-default-rtdb.europe-west1.firebasedatabase.app/githubLinks/${data.id}.json`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            uid: uid
                        })
                    });
                });
            });
        })
        .then(() => {
            window.location.replace("successr.html");
        })
        .catch((error) => {
            console.error(error);
            window.location.replace("errorr.html");
        });
};