const server = "http://127.0.0.1:8000";

async function send(command) {

    document.getElementById("cmd").innerHTML = command.toUpperCase();

    await fetch(server + "/" + command, {
        method: "POST"
    });

}

// Forward
document.getElementById("forward").onclick = () => send("forward");

// Backward
document.getElementById("backward").onclick = () => send("backward");

// Stop
document.getElementById("stop").onclick = () => send("stop");

// LEFT (Hold)

const left = document.getElementById("left");

left.onmousedown = () => send("left");

left.onmouseup = () => send("straight");

left.onmouseleave = () => send("straight");

// RIGHT (Hold)

const right = document.getElementById("right");

right.onmousedown = () => send("right");

right.onmouseup = () => send("straight");

right.onmouseleave = () => send("straight");