<template>
  <div class="status">
    <h1>Status</h1>
    <div class="status__chart">
      <LineChart />
    </div>
    <div class="status__buttons">
      <button
        @click="toggleButton"
        class="btn"
        :class="!start ? 'btn-danger' : 'btn-success'"
      >
        {{ isStart }} the bot
      </button>
      <button class="btn btn-warning">Restart the bot</button>
    </div>
  </div>
</template>

<script>
import LineChart from "./chart/LineChart.js";

export default {
  name: "Status",
  components: { LineChart },
  data: () => ({
    start: false,
  }),

  computed: {
    isStart() {
      return this.start ? "Start" : "Stop";
    },
  },
  methods: {
    toggleButton() {
      this.start = !this.start;
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
