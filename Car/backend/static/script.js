// WebSocket Connection

const protocol =
    window.location.protocol === "https:" ? "wss" : "ws";

const socket = new WebSocket(
    `${protocol}://${window.location.host}/ws`
);

// Store the current robot state
let robotState = {
    motion: "stop",
    steering: "straight"
};

socket.onopen = () => {
    console.log("✅ WebSocket Connected");
};

socket.onclose = () => {
    console.log("❌ WebSocket Disconnected");
};

socket.onerror = (error) => {
    console.error("WebSocket Error:", error);
};

// Send Current State

function sendState() {

    if (socket.readyState !== WebSocket.OPEN) {
        console.log("Socket not connected yet");
        return;
    }

    document.getElementById("cmd").innerHTML =
        `${robotState.motion.toUpperCase()} | ${robotState.steering.toUpperCase()}`;

    socket.send(JSON.stringify(robotState));
}

// Motion Buttons

document.getElementById("forward").onclick = () => {
    robotState.motion = "forward";
    sendState();
};

document.getElementById("backward").onclick = () => {
    robotState.motion = "backward";
    sendState();
};

document.getElementById("stop").onclick = () => {
    robotState.motion = "stop";
    robotState.steering = "straight";
    sendState();
};

// LEFT BUTTON

const left = document.getElementById("left");

left.onpointerdown = (e) => {
    e.preventDefault();
    robotState.steering = "left";
    sendState();
};

left.onpointerup = (e) => {
    e.preventDefault();
    robotState.steering = "straight";
    sendState();
};

left.onpointerleave = () => {
    robotState.steering = "straight";
    sendState();
};

left.onpointercancel = () => {
    robotState.steering = "straight";
    sendState();
};

// RIGHT BUTTON


const right = document.getElementById("right");

right.onpointerdown = (e) => {
    e.preventDefault();
    robotState.steering = "right";
    sendState();
};

right.onpointerup = (e) => {
    e.preventDefault();
    robotState.steering = "straight";
    sendState();
};

right.onpointerleave = () => {
    robotState.steering = "straight";
    sendState();
};

right.onpointercancel = () => {
    robotState.steering = "straight";
    sendState();
};

let startTime = 0;

function sendState() {

    startTime = performance.now();

    socket.send(JSON.stringify(robotState));

}

socket.onmessage = (event) => {

    const latency = performance.now() - startTime;

    console.log(`Latency: ${latency.toFixed(2)} ms`);

    document.getElementById("latency").innerHTML =
        latency.toFixed(2) + " ms";

};