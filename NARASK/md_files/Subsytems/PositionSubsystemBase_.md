# PositionSubsystemBase.java

## Preamble
This documentation outlines the methods contained in the PositionSubsytemBase and how to use them.
Authors: Timothy Dimmock (Timmy), Rishi Kumar

## Overview
PositionSubsystemBase.java is an abstract class used to create subsystems that rely on position-based setpoints. It's one of the three subsystem bases.

## Setup
- ```public PositionSubsystemBase(ControllerBase controller, NAR_Motor... motors)```: This method is the constructor. It configures the motors and PID controller.
- ```protected abstract void configMotors()```: This is a required method for any child classes. Child Classes override this method by putting in any code needed to configure the motors.
- ```protected abstract void configController()```: This is a required method for any child classes. Child Classes override this method by putting in any code needed to configure the PID controller.

## Basic Methods
These methods are used to move the physical subsystem without using PID.
- ```protected void apply(Consumer<NAR_Motor> action)```:  Takes in a motor action and runs all defined motors using this action without using PID.
- ```protected Command applyCommand(Consumer<NAR_Motor> action)```: Returns the ```apply()``` method as a command. This makes it much more versatile in command-based subsystems.
- ```public void run(double power)```: Sets all the defined motors to run at a percent of their maximum power, equal to the inputted number.
- ```public Command runCommand(double power)```: Returns the ```run()``` method as a command. This makes it much more versatile in command-based subsystems.
- ```public void runVolts(double volts)```: Sets all the defined motors to run at the inputted number of volts.
- ```public Command runVoltsCommand(double volts)```: Returns the ```runVolts()``` method as a command. This makes it much more versatile in command-based subsystems.
- ```public double getVolts()```: Returns the power of all defined motors.
- ```public void stop()```: Stops all the motors by disabling them and setting their powers to 0.
- ```public Command stopCommand()```: Returns the ```stop()``` method as a command. This makes it much more versatile in command-based subsystems.
- ```public void reset(double position)```: Set the measurement of the motor's current position to the inputted value.
- ```public Command resetCommand(double position)```: Returns the ```reset(double position)``` method as a command. This makes it much more versatile in command-based subsystems.
  
  ## Pid Methods
  These methods are used to move the physical subsystem using PID.
- ```public Command pidTo()```: Uses PID to move the motor to the inputted setpoint. There are two variants.
  - ```pidTo(double setpoint)```: Gets a setpoint as a double.
  - ```pidTo(DoubleSupplier setpoint)```: Gets a continuously updated setpoint.
- ```public void reset()```: Set the measurement of the PID controller's current position to 0.
- ```public Command resetCommand()```: Returns the ```reset()``` method as a command. This makes it much more versatile in command-based subsystems.

## Utility Methods
- ```public double getCurrent()```: Returns the current of the first motor
- ```public void setNeutralMode(Neutral mode)```: Sets the neutral mode of all defined motors to either coast (motor is free to be rotated) or break (motor is not free to be rotated)
- ```public double getPosition()```: Returns the position of the first motor
- ```public double getVelocity()```: Returns the velocity of the first motor
- ```public Command homing(double power, double delay, double currentLimit)```: Runs all defined motors at the inputted power until either the inputted delay ends or inputted currentLimit is reached.
- ```public Command characterization()```: Used to find PID constants
  - ```public Command characterization(double startDelaySecs, double rampRateVoltsPerSec)```: Takes in the delay before SysId starts and the rate that the volts are increasing. It sets the start and end positions to the controller's minimum and maximum positions, respectively. 
  - ``` public Command characterization(double startDelaySecs, double rampRateVoltsPerSec, double startPosition, double endPosition)```: Takes in the delay before SysId starts and the rate that the volts are increasing. It sets the start and end positions to the inputted minimum and maximum positions.
- ```public void initShuffleboard()```: Sets up the appropriate fields for Shuffleboard to log data into.
- ```public void FFWidgets(ControllerBase controller, int x, int y)``` Sets up the Shuffleboard fields for PID constants.
