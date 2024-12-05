import http from "http";
import express from "express";
import SocketIO from "socket.io";
//import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log(`Listening on http://localhost:3000`); //ws://localhost:3000 also OK

const httpServer = http.createServer(app); //http server
const wsServer = SocketIO(httpServer);

wsServer.on("connection", socket => {
    socket.on("enter_room", (roomName, done) => {
        console.log(roomName);
        setTimeout(() => {
            done("hello from the backend");
        }, 10000);
    });
})

/*
//WebSocket Code

const wss = new WebSocket.Server({ server }); //websocket server (on top of the http server)
//{server} -> can run both http & websocket servers (on the same port)

const sockets = [];

//connection은 메서드로 socket을 받아서 저장해야 함, socket은 브라우저와의 연결
wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anon";
    console.log("Connected to Browser ✅");
    socket.on("close", () => console.log("Disconnected from the Browser! ❌"));
    socket.on("message", msg => {
        const message = JSON.parse(msg);
        switch(message.type) {
            case "new_message":
                sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`));
                break
            case "nickname":
                socket["nickname"] = message.payload;
                break
        }
    });
});
*/

httpServer.listen(3000, handleListen);