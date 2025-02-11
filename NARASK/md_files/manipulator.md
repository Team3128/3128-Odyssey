# Subsystem: manipulator

## Preamble
This documentation explains how the manipulator subsystem on our 2025 robot, [insert name], works.

Authors: Timothy Dimmock (Timmy), Avani Goyal, Rishi Kumar, Dhriti Naik

## Manipulator.java
### imports???
### FSMSubsystemBase<ManipulatorStates>
The FSM, or finite-state machine, is defined by a list of states. We use the base code, to define all of our constants, in this case, for our manipulator. We then extend our class from this base. All of the FSM subsystems come with a transition map, and most with a defaultTransitioner Function.
### Set up
We first define all the features of the FSMSubsystemBase. Then, we define all the mechanisms of the subsystem itself such as the roller mechanism. We then define the method to create a manipulator using the Singleton design (makes sure that only one instance at a time). 
After that, we start registering the transitions between states. First, we define how to go from any of our states to the UNDEFINED state (a state where the robot is using no power). Every subsystem has this transition. We then add transitions between each of the functional states like NEUTRAL, IN, and OUT. 
