import { LinearStateMachine } from "./LinearStateMachine";
import { State } from "./State";

class TestState extends State {
  enter() {}
  exit() {}
}

describe("LinearStateMachine", () => {
  it("should not error if next is called when empty", () => {
    const machine = new LinearStateMachine();
    expect(machine.hasNext()).toBeFalsy();
    expect(() => {
      machine.next();
    }).not.toThrow();
  });

  it("should not error when valid states are added", () => {
    const machine = new LinearStateMachine();
    expect(() => {
      machine.add(new State());
    }).not.toThrow();
    expect(() => {
      machine.add(new TestState());
    }).not.toThrow();
    expect(() => {
      machine.add([new State(), new State()]);
    }).not.toThrow();
  });

  it("should error when invalid states are added", () => {
    const machine = new LinearStateMachine();
    expect(() => {
      machine.add({});
    }).toThrow();
    expect(() => {
      machine.add([new State(), {}]);
    }).toThrow();
  });

  it("should prepend states", () => {
    const machine = new LinearStateMachine();
    const state1 = new State();
    const state2 = new TestState();

    machine.add(state1);
    machine.prepend(state2);
    machine.next();

    expect(machine.currentState).toBe(state2);
  });

  it("should prepend states", () => {
    const machine = new LinearStateMachine();
    const state1 = new State();
    const state2 = new TestState();
    const state3 = new TestState();

    machine.add(state1);
    machine.prepend([state2, state3]);
    machine.next();

    expect(machine.currentState).toBe(state2);
  });

  it("should set currentState to state1", () => {
    const machine = new LinearStateMachine();
    const state1 = new TestState();
    machine.add(state1);

    machine.next();

    expect(machine.currentState).toBe(state1);
  });

  it("should call enter after the default 1000ms interval", () => {
    const machine = new LinearStateMachine();
    const state1 = new TestState();
    machine.add(state1);

    const spy = jest.spyOn(state1, "enter");

    jest.useFakeTimers();

    machine.next();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    expect(spy).not.toHaveBeenCalled();

    jest.runOnlyPendingTimers();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should call enter after the state's interval", () => {
    const machine = new LinearStateMachine(10);
    const state1 = new TestState();
    state1.delay = 500;
    machine.add(state1);

    jest.useFakeTimers();

    machine.next();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
  });

  it("should call enter after the state machine's interval", () => {
    const machine = new LinearStateMachine(10);
    const state1 = new TestState();
    machine.add(state1);

    jest.useFakeTimers();

    machine.next();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10);
  });

  it("should call exit & enter", () => {
    const machine = new LinearStateMachine();
    const state1 = new TestState();
    const state2 = new TestState();
    machine.add([state1, state2]);

    const state1ExitSpy = jest.spyOn(state1, "exit");
    const state2EnterSpy = jest.spyOn(state2, "enter");

    jest.useFakeTimers();
    machine.next();
    jest.runOnlyPendingTimers();
    machine.next();
    expect(state1ExitSpy).toHaveBeenCalled();
    jest.runOnlyPendingTimers();
    expect(state2EnterSpy).toHaveBeenCalled();
  });
});
