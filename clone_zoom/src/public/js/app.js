const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

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

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);