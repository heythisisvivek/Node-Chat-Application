const expressObj = require("express");
const express = expressObj();
const io = require("socket.io")(3000, {
    cors: {
        origin: "http://localhost:3300",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});
const path = require("path");
require("dotenv").config();

express.set("view engine", "ejs");
express.use(expressObj.static("."));

const user = {}

io.on("connection", socket => {
    socket.on("get-name", data => {
        user[socket.id] = data;
        socket.broadcast.emit("joined-chat", data);
    })
    
    socket.on("get-msg", data => {
        socket.broadcast.emit("get-msg", data);
    })

    socket.on("disconnect", () => {
        socket.broadcast.emit("user-left", user[socket.id]);
    })
})

express.get("/", (req, res) => {
    res.render(path.join(__dirname, "view"));
})

express.listen(process.env.PORT, (req, res) => { console.log(`Server is running at ${process.env.PORT}`) });