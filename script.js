const input = document.querySelector(".texxt");
const button = document.querySelector(".send");

button.addEventListener("click", () => {
    const user = document.querySelector(".username").value;
    const message = input.value;

    fetch("https://viljonsivu-default-rtdb.europe-west1.firebasedatabase.app/messages.json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: user,
            message: message
        })
    })
    .then(() => {
        input.value = "";
        loadMessages(); // Päivitä heti lähetyksen jälkeen
    });
});

function loadMessages() {
    fetch("https://viljonsivu-default-rtdb.europe-west1.firebasedatabase.app/messages.json")
        .then(r => r.json())
        .then(data => {
            const p = document.querySelector(".messages");
            p.innerHTML = "";
            
            for (const id in data) {
                let color = getUserColor(data[id].user)
                p.innerHTML += `<span class="avatar" style="background:${color}"></span><span class="usern">${data[id].user}</span>: ${data[id].message}`;
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

    for (let i = 0; i > name.lenght; i++) {
        number += name.charCodeAt(i);
    }
    return colors[number % colors.lenght]
}


loadMessages();
setInterval(loadMessages, 1000);