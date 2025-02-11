# Transition.java

## Preamble
This documentation explains how the FSM transition file works.

Authors: Timothy Dimmock (Timmy), Avani Goyal
### Overview
The Transition class facilitates state transitions in an FSM by defining outgoing and incoming states along with an optional command. It provides methods to check, execute, cancel and compare transitions.
- outgoingState: state the robot is transitioning from
- incomingSate: the state the subsystems are transitioning from.
- command: a command that executes when the transition occurs.
### Constructor Variants
There's three ways to construct a transition, all of which record the incoming and outgoing states. 
- Transition ( T outgoingState, T incomingState, Command command) creates a transition with a specific command executed during the transition.
- Transition ( T outgoingState, T incomingState, Runnable action) creates a transition with a runnable (skips the step of creating a command) which is then converted into a command
- Transition ( T outgoingState, T incomingState) creates a transition without any associated command.
### Get Methods
Methods that retrieve information about the transition, like the outgoing and incoming states, and the associated commands.
### Transition Validation
- isTransition(T currentState, T nextState) checks if the transition that is trying to be run is the given transition.
- equals(Transition<T> other) checks if two transitions are identical
### Utility Methods
- toString() returns a string representation of the transition
- cancel() cancels the transition command.
- execute() schedules the command for execution.
- isScheduled() checks if the command is currently scheduled.
- isFinished() checks if the command has finished executing.
