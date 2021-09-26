import { game } from "@/store/game";
import { createStore } from "vuex";

// Mutations are simple, test them all at once
describe("testing mutations", () => {
  it("addGameScore: should increase the stored game score value", () => {
    const state = {
      gameScore: 100,
    };
    game.mutations.addGameScore(state, 10);
    expect(state.gameScore).toBe(110);
  });
  it("addGamePanic: should increase the stored game panic value", () => {
    const state = {
      gamePanic: 100,
    };
    game.mutations.addGamePanic(state, 10);
    expect(state.gamePanic).toBe(110);
  });
  it("addGameTimeout: should increase the stored game timeout value", () => {
    const state = {
      gameTimeout: 0,
    };
    game.mutations.addGameTimeout(state, 50);
    expect(state.gameTimeout).toBe(50);
  });
  it("setGamePanicked: should set gamePanic to 100 and gameTimeout to 50", () => {
    const state = {
      gamePanic: 0,
      gameTimeout: 0,
    };
    game.mutations.setGamePanicked(state);
    expect(state.gamePanic).toBe(100);
    expect(state.gameTimeout).toBe(50);
  });
});

describe("testing getters", () => {
  it("isPanicked: true if store's game timeout is not 0", () => {
    const state_panicked = {
      gameTimeout: 1,
    };
    const state_cool = {
      gameTimeout: 0,
    };
    expect(game.getters.isPanicked(state_panicked)).toBe(true);
    expect(game.getters.isPanicked(state_cool)).toBe(false);
  });
});

const createTestingStore = (state) => {
  return createStore({
    state: state,
    mutations: game.mutations,
    actions: game.actions,
  });
};

describe("testing action press", () => {
  it("should do nothing if game is 'panicked'", async () => {
    // game is panicked if panic level if getter isPanicked is true
    const state_initial = {
      gameTimeout: 1, // panicked
      gamePanic: 100,
      gameScore: 42,
    };
    const store = createTestingStore(state_initial);
    await store.dispatch("press");
    expect(state_initial).toStrictEqual(store.state);
  });
  it("should set the game to panicked if the game isn't already but gamePanic >= 100", async () => {
    const store = createTestingStore({
      gameTimeout: 0,
      gamePanic: 100,
      gameScore: 42,
    });
    await store.dispatch("press");
    expect(store.state.gamePanic).toBe(100);
    expect(store.state.gameTimeout).toBe(50);
    expect(store.state.gameScore).toBe(52);
  });
  it("should increase gameScore by 10 and gamePanic by 20 if its not panicked and gamePanic < 100", async () => {
    const store = createTestingStore({
      gameTimeout: 0,
      gamePanic: 20,
      gameScore: 50,
    });
    await store.dispatch("press");
    expect(store.state.gameScore).toBe(60);
    expect(store.state.gamePanic).toBe(40);
  });
});

describe("testing action tick", () => {
  it("should lower gamePanic by 1 if game isn't panicked", async () => {
    const store = createTestingStore({
      gameTimeout: 0,
      gamePanic: 100,
      gameScore: 50,
    });
    await store.dispatch("tick");
    expect(store.state.gameTimeout).toBe(0);
    expect(store.state.gamePanic).toBe(99);
    expect(store.state.gameScore).toBe(50);
  });
  it("should lower gameTimeout by 1 if game is panicked", async () => {
    const store = createTestingStore({
      gameTimeout: 50,
      gamePanic: 100,
      gameScore: 50,
    });
    await store.dispatch("tick");
    expect(store.state.gameTimeout).toBe(49);
    expect(store.state.gamePanic).toBe(100);
    expect(store.state.gameScore).toBe(50);
  });
});
