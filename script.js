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
                p.innerHTML += `<b>${data[id].user}:</b> ${data[id].message}<br>`;
            }
        });
}

loadMessages();
setInterval(loadMessages, 1000);