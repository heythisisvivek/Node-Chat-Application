const socket = io("http://localhost:3000");

const container = document.querySelector(".chatbox");
const form = document.querySelector(".form");
const input = document.querySelector(".msg");

const getname = prompt("Enter your name");

if(getname) {
    socket.emit("get-name", getname);
} else {
    console.log("Please provide your name");
}

const append = (data) => {
    const msg = document.createElement("p");
    msg.setAttribute("class","joined");
    msg.innerHTML = data;
    container.appendChild(msg);
}

const appendsendmsg = (data) => {
    const msg = document.createElement("p");
    msg.setAttribute("class","send");
    msg.innerHTML = data;
    container.appendChild(msg);
}

const appendrecievemsg = (data) => {
    const msg = document.createElement("p");
    msg.setAttribute("class","recieve");
    msg.innerHTML = data;
    container.appendChild(msg);
}

form.addEventListener("submit", e => {
    e.preventDefault();
    appendsendmsg(`<span>${input.value}</span>`);
    socket.emit("get-msg", input.value);
    input.value = "";
})

socket.on("joined-chat", data => {
    append(`<span>${data} - Joined Chat</span>`);
})

socket.on("get-msg", data => {
    appendrecievemsg(`<span>${data}</span>`);
})
