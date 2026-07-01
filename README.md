Web-Based Robot Control using Webots and FastAPI

Architecture 

             USER
               │
        Click Button
               │
               ▼
       HTML + JavaScript
               │
         HTTP Request
               │
               ▼
      FastAPI (Python)
               │
      Robot Command
               │
               ▼
     Webots Simulation
               │
      Robot Moves

Project structure

RobotControl/

│
├── web/
│     ├── index.html
│     ├── style.css
│     └── script.js
│
├── backend/
│     ├── main.py
│     └── commands.py
│
├── simulation/
│     ├── worlds/
│     ├── controllers/
│     │      └── robot_controller.py
│     └── robots/
│
└── README.md

work flow:

Browser

Forward Button
      │
      ▼
POST /forward
      │
      ▼
FastAPI
      │
writes command
      │
      ▼
Robot Controller
      │
reads command
      │
      ▼
Robot moves

predecting user interface:

-----------------------------------

      ROBOT CONTROLLER

            ↑

      ←   STOP   →

            ↓

Status

Robot :
Connected

Speed :
0.5 m/s

-----------------------------------

Backend:

Forward Button
        ↓
POST /forward
        ↓
Python receives
        ↓
Current Command = FORWARD

Robot Controlller

Loop forever

Read latest command

If FORWARD
    move forward

If LEFT
    turn left

If RIGHT
    turn right

If STOP
    stop motors

Communication: 

Web Page
      │
HTTP
      │
FastAPI
      │
Shared command
      │
Robot

Project Flow:

Open Website

↓

Click Forward

↓

FastAPI receives request

↓

Stores "forward"

↓

Webots controller reads it

↓

Motor Speed

Left = 5

Right = 5

↓

Robot moves