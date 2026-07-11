Follow the steps to set up and run the project.

1. Start the Webots Simulation
    open Webots
    Open the project world file:
        "webcommunication.wbt"
    Click the PLAY button to start the simulation

2. Start the BAckend Server
    Clone the repository
    Open the project in Visual Studio Code
    Open a terminal and navigate "backend" directory.
    Start the FastAPI server:
        uvicorn main:app --host 0.0.0.0 --port 8000

3. Enable Remote Accesss
    This step is required to control the robot over the internet

    Install Tailscale.
    Create a account and sign in.
    Open a terminal and run:
        tailscale serve --bg 8000
        then run
        tailscale funnel --bg 8000

4. Open the Dashboard
    On the same computer 
        http://localhost:8000

    Over the internet
        Use the tailscale Funnel URL generated in Step 3.


*WORKFLOW*

The robot control system follows a client-server architecture using WebSockets for real-time communication.

                  User
                   │
                   ▼
      Web Dashboard (HTML/CSS/JavaScript)
                   │
          User presses a button
                   │
                   ▼
      JavaScript updates Robot State
                   │
                   ▼
      WebSocket sends JSON command
                   │
                   ▼
          FastAPI WebSocket Server
                   │
        Updates Motion & Steering
                   │
                   ▼
      Robot Controller (Webots)
                   │
                   ▼
     Calculates Wheel Velocities
                   │
                   ▼
      Pioneer 3AT Robot Movement
                    
Step-by-step Workflow

1. Start the System

    Launch the Webots simulation
    Start the FastAPI backend.
    Open the dashboard in a web browser.
    Connect to the robot using the Connect Button.

2. User Input

The user interacts with the dashboard by pressing the control buttons:
    Forward
    Backward
    Left(Hold)
    Right(Hold)
    Stop

3. WebSocket Communication

Each user action updates the robot state and sends a JSON message to the FastAPI server.

4. Backend Processing

The FastAPI server recives the command through a WebSocket connection nd updates the robot's current motion and streering state.

5. Robot Controller

The Webots controller continuously retrieves the latest robot state and computes the appropriate left and right wheel velocities.

6. Robot Movement 

The calculated wheel velocities are applied to the four Pioneer 3AT motors using the Webots Motor API.

The robot immediately responds to the received command.

7. Dashboard Feedback

The dashboard recives acknowledgements from the server and updates:
    Robot Status
    Latency
    Motion
    Steering

DATA FLOW

                      User
                        │
                        ▼
                    Dashboard
                        │
                        ▼
                    JavaScript
                        │
                        ▼
                    WebSocket
                        │
                        ▼
                    FastAPI
                        │
                        ▼
                    Robot Controller
                        │
                        ▼
                    Pioneer 3AT

Remote Access

When Tailscale is enabled, the same workflow remains unchanged. The only difference is that the dashboard is accessed through a secure public URL, allowing users on the different networks to control the robot without changing the application logic.