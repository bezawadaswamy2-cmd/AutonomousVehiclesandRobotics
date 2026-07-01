const socket = new WebSocket("ws://127.0.0.1:8000/ws");

socket.onopen = () => {
    console.log("Connected");
};

socket.onclose = () => {
    console.log("Disconnected");
};

function send(data) {

    document.getElementById("cmd").innerHTML =
        `${data.motion} ${data.steering}`;

    socket.send(JSON.stringify(data));
}

// Motion buttons

document.getElementById("forward").onclick =
() => send({
    motion:"forward"
});

document.getElementById("backward").onclick =
() => send({
    motion:"backward"
});

document.getElementById("stop").onclick =
() => send({
    motion:"stop",
    steering:"straight"
});

// Steering buttons

const left = document.getElementById("left");

left.onmousedown =
() => send({
    steering:"left"
});

left.onmouseup =
() => send({
    steering:"straight"
});

left.onmouseleave =
() => send({
    steering:"straight"
});

const right = document.getElementById("right");

right.onmousedown =
() => send({
    steering:"right"
});

right.onmouseup =
() => send({
    steering:"straight"
});

right.onmouseleave =
() => send({
    steering:"straight"
});