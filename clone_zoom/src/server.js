import http from "http";
import express from "express";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log(`Listening on http://localhost:3000`); //ws://localhost:3000 also OK

const server = http.createServer(app); //http server
const wss = new WebSocket.Server({ server }); //websocket server (on top of the http server)
//{server} -> can run both http & websocket servers (on the same port)

//connection은 메서드로 socket을 받아서 저장해야 함, socket은 브라우저와의 연결
wss.on("connection", (socket) => {
    console.log("Connected to Browser ✅");
    socket.on("close", () => console.log("Disconnected from the Browser! ❌"));
    socket.on("message", message => {
        console.log(message.toString('utf8'));
    });
    socket.send("hello!");
});

server.listen(3000, handleListen);