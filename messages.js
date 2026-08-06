const input = document.querySelector(".texxt");
const button = document.querySelector(".send");
let usernamee = "Anonyymi";
let admin = false
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { auth } from "./firebase.js";
button.addEventListener("click", () => {
    
    const message = input.value;

    if (message != "!admincmd.clear") {
        fetch("https://viljonsivu-default-rtdb.europe-west1.firebasedatabase.app/messages.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: usernamee,
                message: message
        })
    })
    .then(() => {
        input.value = "";
        loadMessages(); // Päivitä heti lähetyksen jälkeen
    });
}
    else {
        fetch("https://viljonsivu-default-rtdb.europe-west1.firebasedatabase.app/messages.json", {
            method: "DELETE"
        })
        .then(() => {
            return fetch("https://viljonsivu-default-rtdb.europe-west1.firebasedatabase.app/messages.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: "[system]",
                    message: `Messages tyhjennetty ylläpitäjän ${usernamee} toimesta`
                })
            });
        })
        .then(() => {
            input.value = "";
            loadMessages();
        });
    }
})
function loadMessages() {
    fetch("https://viljonsivu-default-rtdb.europe-west1.firebasedatabase.app/messages.json")
        .then(r => r.json())
        .then(data => {
            const p = document.querySelector(".messages");
            p.innerHTML = "";
            
            for (const id in data) {
                
                let color = getUserColor(data[id].user)
                p.innerHTML += `<span class="avatar" style="background:${color}"></span><span class="usern">${data[id].user}</span>: ${data[id].message}<br>`;
                
            }
        });
}
function getUserColor(name) {
    let colors = [
        "#ff0000",
        "#ff6600",
        "#ffd000",
        "#d9ff00",
        "#00ff0d",
        "#00ffc8",
        "#0099ff",
        "#006eff",
        "#1100ff",
        "#7700ff",
        "#c300ff",
        "#ff00ff",
        "#ff0055"
    ]
    let number = 0;
    for (let i = 0; i < name.length; i++) {
        number += name.charCodeAt(i);
    }
    return colors[number % colors.length]
    
    
}


loadMessages();
setInterval(loadMessages, 1000);

onAuthStateChanged(auth, (user) => {
    if (!user) return;

    fetch(`https://viljonsivu-default-rtdb.europe-west1.firebasedatabase.app/users/${user.uid}.json`)
        .then(r => r.json())
        .then(data => {
            console.log(data.username);
            usernamee = data.username;
            admin = data.admin;
        });
});