const socket = io("http://localhost:3000");

const container = document.querySelector(".chatbox");
const form = document.querySelector(".form");
const input = document.querySelector(".msg");

const audio = new Audio("sms.mp3");

if(Push.Permission.has() != "false") {
    Push.create('All set')
}

const getname = prompt("Enter your name");

if(getname) {
    socket.emit("get-name", getname);
} else {
    console.log("Please provide your name");
    socket.emit("get-name", "Anonymous");
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
    container.scrollTo(container.scrollHeight, 10000);
    input.value = "";
})

socket.on("joined-chat", data => {
    append(`<span>${data} - Joined Chat</span>`);
    container.scrollTo(container.scrollHeight, 10000);
})

socket.on("get-msg", data => {
    audio.play();
    Push.create(data);
    appendrecievemsg(`<span>${data}</span>`);
    container.scrollTo(container.scrollHeight, 10000);
})

socket.on("user-left", data => {
    append(`<span>${data} left</span>`);
    container.scrollTo(container.scrollHeight, 10000);
})