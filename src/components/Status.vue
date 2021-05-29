<template>
  <div class="status">
    <h1>Server Status</h1>
    <div class="status__chart">
      <LineChart />
    </div>
    <div class="status__buttons">
      <button
        @click="toggleButton"
        class="btn"
        :class="$store.state.status.isRunning ? 'btn-danger' : 'btn-success'"
      >
        {{ isStart }} the bot
      </button>
      <button @click="restart" class="btn btn-warning">Restart the bot</button>
    </div>
  </div>
</template>

<script>
import LineChart from "./chart/LineChart.js";

export default {
  name: "Status",
  components: { LineChart },
  async mounted() {
    await this.$store.dispatch("status/getStatus");
  },
  data: () => ({
    start: false,
  }),

  computed: {
    isStart() {
      return this.$store.state.status.isRunning ? "Stop" : "Start";
    },
  },
  methods: {
    toggleButton() {
      if (this.$store.state.status.isRunning) {
        this.$store.dispatch("status/stopTheBot");
        this.$notify({
          group: "foo",
          title: "Bot is stopped",
          text: "Be careful now bot is down",
          type: "error",
        });
      } else {
        this.$store.dispatch("status/startTheBot");
        this.$notify({
          group: "foo",
          title: "Bot is running",
          text: "Be careful now bot is up",
          type: "success",
        });
      }
    },
    restart() {
      this.$store.dispatch("status/restartTheBot");
      this.$notify({
        group: "foo",
        title: "Bot is restarted",
        text: "Be careful now bot is up",
        type: "success",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.status {
  width: 100%;

  &__chart {
    height: 400px;
    width: 100%;
    margin-bottom: 30px;
  }

  &__buttons {
    display: flex;
    align-items: center;

    .btn {
      margin-right: 30px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
