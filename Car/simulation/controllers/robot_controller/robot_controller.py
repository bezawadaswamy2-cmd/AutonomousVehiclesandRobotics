from controller import Robot
import requests

TIME_STEP = 32
MAX_SPEED = 6.4

robot = Robot()

# Motors
front_left = robot.getDevice("front left wheel")
front_right = robot.getDevice("front right wheel")
back_left = robot.getDevice("back left wheel")
back_right = robot.getDevice("back right wheel")

motors = [front_left, front_right, back_left, back_right]

for motor in motors:
    motor.setPosition(float("inf"))
    motor.setVelocity(0.0)

print("Robot Controller Started!")

while robot.step(TIME_STEP) != -1:

    while robot.step(TIME_STEP) != -1:

        try:
            response = requests.get(
                "http://127.0.0.1:8000/command",
                timeout=0.1
            )

            data = response.json()

            motion = data["motion"]
            steering = data["steering"]

        except:
            motion = "stop"
            steering = "straight"

        speed = 4.0

        left_speed = 0.0
        right_speed = 0.0

        # Motion
        if motion == "forward":
            left_speed = speed
            right_speed = speed

        elif motion == "backward":
            left_speed = -speed
            right_speed = -speed

        elif motion == "stop":
            left_speed = 0
            right_speed = 0

        # Steering
        if steering == "left":
            left_speed *= 0.4

        elif steering == "right":
            right_speed *= 0.4

        front_left.setVelocity(left_speed)
        back_left.setVelocity(left_speed)

        front_right.setVelocity(right_speed)
        back_right.setVelocity(right_speed)