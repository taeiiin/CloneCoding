//프런트와 백엔드 연결
const socket = new WebSocket(`ws://${window.location.host}`);

//이벤트 처리
socket.addEventListener("open", () => {
    console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
    console.log("New messages: ", message.data);
});

socket.addEventListener("close", () => {
    console.log("Disconnected from Server ❌");
});

setTimeout(() => {
    socket.send("hello from the browser!");
}, 10000);