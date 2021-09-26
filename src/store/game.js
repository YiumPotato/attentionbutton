const state = {
  gameScore: 0,
  gamePanic: 0,
  gameTimeout: 0,
};

const mutations = {
  addGameScore(state, n) {
    state.gameScore += n;
  },
  addGamePanic(state, n) {
    state.gamePanic += n;
  },
  addGameTimeout(state, n) {
    state.gameTimeout += n;
  },
  setGamePanicked(state) {
    state.gamePanic = 100;
    state.gameTimeout = 50;
  },
};

const actions = {
  press({ commit, state }) {
    if (state.gameTimeout > 0) return;
    commit("addGameScore", 10);
    commit("addGamePanic", 20);
    if (state.gamePanic >= 100) {
      commit("setGamePanicked");
    }
  },
  tick({ commit, state }) {
    if (state.gameTimeout > 0) {
      commit("addGameTimeout", -1);
    } else if (state.gamePanic > 0) {
      commit("addGamePanic", -1);
    }
  },
};

const getters = {
  isPanicked: (state) => state.gameTimeout > 0,
};

export const game = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
