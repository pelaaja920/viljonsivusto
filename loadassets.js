async function loadHTML(id, file) {
    const res = await fetch(file)
    document.getElementById(id).innerHTML = await res.text
}
loadHTML("sidebar", "/sidebar.html")