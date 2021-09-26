import { createStore } from "vuex";
import { game } from "@/store/game";

export default createStore({
  strict: process.env.NODE_ENV !== "production", // strict only in dev since its resourcefully expensive-ish
  modules: {
    game,
  },
});
