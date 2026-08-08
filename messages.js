import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { auth } from "./firebase.js";

const input = document.querySelector(".texxt");
const button = document.querySelector(".send");
let usernamee = "Anonyymi";
let admin = false;
let uidd = null;
let avatar = "https://viljonsivusto.vercel.app/Account.png";
button.addEventListener("click", () => {
    
    const message = input.value;
    

    if (!message.includes("!#") && admin) {
        fetch("https://viljonsivu-default-rtdb.europe-west1.firebasedatabase.app/messages.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: usernamee,
                message: message,
                avatar: avatar,
                time: Date.now()
            })
        })
        .then(() => {
            input.value = "";
            loadMessages(); // Päivitä heti lähetyksen jälkeen
        });
    }
    else if (message.startsWith("!#clear")) {
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
                    message: `Messages tyhjennetty ylläpitäjän ${usernamee} toimesta`,
                    avatar: "https://viljonsivusto.vercel.app/System.png",
                    time: 0
                })
            });
        })
        .then(() => {
            input.value = "";
            loadMessages();
        });
    }
    else if (message.startsWith("!#del.")) {
        const [ignore, deletemsg] = message.split(".", 2);
        fetch("https://viljonsivu-default-rtdb.europe-west1.firebasedatabase.app/messages.json")
            .then(r => r.json())
            .then(data => {
                const deletePromises = [];
                for (const key in data) {
                    if (data[key].message === deletemsg) {
                        deletePromises.push(fetch(`https://viljonsivu-default-rtdb.europe-west1.firebasedatabase.app/messages/${key}.json`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                message: "Tämä viesti poistettiin",
                                user: "???",
                                avatar: "https://viljonsivusto.vercel.app/Deleted.png"
                            })

                        }));
                    }
                }
                return Promise.all(deletePromises);
            })
        
            .then(() => {
            
        })
        .then(() => {
            input.value = "";
            loadMessages();
        });
    }
    else if (message.startsWith("!#system.")) {
        const sysmsg = message.substring("!#system.".length);
        fetch("https://viljonsivu-default-rtdb.europe-west1.firebasedatabase.app/messages.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: "[system]",
                message: sysmsg,
                avatar: "https://viljonsivusto.vercel.app/System.png",
                time: Date.now()
            })
        })
        .then(() => {
            input.value = "";
            loadMessages();
        })
        
    }
    
})
function loadMessages() {
    fetch("https://viljonsivu-default-rtdb.europe-west1.firebasedatabase.app/messages.json")
        .then(r => r.json())
        .then(data => {
            const p = document.querySelector(".messages");
            const messages = Object.values(data);
            messages.sort((a, b) => a.time - b.time);
            p.innerHTML = "";

            messages.forEach(msg => {
                p.innerHTML += `
                <span class ="avatar" style="background-image:url('${msg.avatar}')"></span>
                <span class="usern">${msg.user}</span>: ${msg.message} <br>
                `
            })
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
            avatar = data.avatar;
            
        });
});