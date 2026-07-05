from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

motion = "stop"
steering = "straight"
connected_clients = set()


@app.get("/")
def home():
    return FileResponse("static/index.html")


@app.post("/forward")
def forward():
    global motion
    motion = "forward"
    return {"status": "ok"}


@app.post("/backward")
def backward():
    global motion
    motion = "backward"
    return {"status": "ok"}


@app.post("/stop")
def stop():
    global motion, steering
    motion = "stop"
    steering = "straight"
    return {"status": "ok"}


@app.post("/left")
def left():
    global steering
    steering = "left"
    return {"status": "ok"}


@app.post("/right")
def right():
    global steering
    steering = "right"
    return {"status": "ok"}


@app.post("/straight")
def straight():
    global steering
    steering = "straight"
    return {"status": "ok"}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    global motion, steering

    await websocket.accept()
    connected_clients.add(websocket)

    print("WebSocket Client Connected")

    try:
        while True:

            data = await websocket.receive_json()

            print(data)

            if "motion" in data:
                motion = data["motion"]

            if "steering" in data:
                steering = data["steering"]

            await websocket.send_json({
                "status": "ok",
                "motion": motion,
                "steering": steering
            })

    except WebSocketDisconnect:

        connected_clients.remove(websocket)

        print("Client Disconnected")

@app.get("/command")
def command():
    return {
        "motion": motion,
        "steering": steering
    }