from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

motion = "stop"
steering = "straight"


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


@app.get("/command")
def command():
    return {
        "motion": motion,
        "steering": steering
    }