// WebSocket Connection

const protocol =
    window.location.protocol === "https:" ? "wss" : "ws";

let socket = null;

let startTime = 0;

// Store the current robot state
let robotState = {
    motion: "stop",
    steering: "straight"
};

// Connect function

function connect(){
    if (socket !== null) return;

    socket = new WebSocket(
        `${protocol}://${window.location.host}/ws`
    );

    socket.onopen = () => {
        console.log("connected");

        document.getElementById("robot-status").innerHTML = "connected";

    };

    socket.onclose = () => {
        console.log("Disconnected");

        document.getElementById("robot-status").innerHTML = "Disconnected";

        socket = null;
    };

    socket.onerror = () => {

        document.getElementById("robot-status").innerHTML = "Connecting error";

    };

    socket.onmessage = (event) => {

        const data = JSON.parse(event.data);

        const latency = performance.now() - startTime;

        document.getElementById("latency").innerHTML = latency.toFixed(1) + " ms";

        document.getElementById("motion-status").innerHTML = data.motion.toUpperCase();

        document.getElementById("steering-status").innerHTML = data.steering.toUpperCase();

    }
}

// Disconnect Function
function disconnect(){
    if (socket == null) return;

    socket.close();

}

// Send Current State

function sendState() {

    if(socket == null){
        return;
    }

    if(socket.readyState !== WebSocket.OPEN){
        return;
    }

    if (socket.readyState !== WebSocket.OPEN) {
        console.log("Socket not connected yet");
        return;
    }
    startTime = performance.now();
    document.getElementById("motion-status").innerHTML =
        `${robotState.motion.toUpperCase()}`;

    socket.send(JSON.stringify(robotState));
}

//disable the buttons function

function setcontrols(enable){
    document.getElementById("forward").disabled = !enable;
    document.getElementById("backward").disabled = !enable;
    document.getElementById("left").disabled = !enable;
    document.getElementById("right").disabled = !enable;
    document.getElementById("stop").disabled = !enable;
    if (enable){
    console.log("all button functions are enabled.");
    }else{
        console.log("all button functions are disabled.");
    }
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

// connect button 
document.getElementById("connect").onclick = () => {
    connect();
    setcontrols(true);
}

// Disconnect Button
document.getElementById("disconnect").onclick = () => {
    disconnect();
    setcontrols(false);
}
