<template>
  <div>
    <strong>SCORE: </strong><span id="game_score">{{ gameScore }}</span> |
    <strong>PANIC: </strong><span id="game_panic">{{ gamePanic }}</span> %
    <br />
    <button
      @click="press_me"
      :disabled="isPanicked"
      id="press_me"
      :style="buttonStyle"
    >
      <template v-if="isPanicked"> ヽ(ಠ_ಠ)ノ </template>
      <template v-else> PRESS ME </template>
    </button>
    <br />
    <div v-if="isPanicked">
      <strong>Timeout: </strong>
      <span id="game_timeout">{{ gameTimeout / 10 }}</span> secs.
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {},
  computed: {
    ...mapState("game", ["gameScore", "gamePanic", "gameTimeout"]),
    ...mapGetters("game", ["isPanicked"]),
    buttonStyle() {
      return {
        backgroundColor: `rgb(${Math.floor(2.55 * this.gamePanic)},${Math.floor(
          2.55 * (100 - this.gamePanic)
        )},0)`,
      };
    },
  },
  methods: {
    press_me() {
      this.$store.dispatch("game/press");
    },
    loop: function () {
      let self = this;
      setInterval(function () {
        self.$store.dispatch("game/tick");
      }, 100);
    },
  },
  mounted() {
    this.loop();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  background-color: green;
  padding: 20vh 20vw;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: xx-large;
}
</style>
