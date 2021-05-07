<template>
  <div class="status">
    <h1>Status</h1>
    <div class="status__chart">
      <LineChart :chart-data="dataCollection" :options="options" />
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
    dataCollection: {
      datasets: [
        {
          backgroundColor: "#7E93FF",
          borderColor: "#593C8F",
          fill: false,
          data: [
            {
              x: 0,
              y: 92,
            },
            {
              x: 25,
              y: 22,
            },
            {
              x: 50,
              y: 37,
            },
            {
              x: 75,
              y: 90,
            },
            {
              x: 100,
              y: 0,
            },
          ],
        },
      ],
    },
    options: {
      height: 477,
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            type: "linear",
            position: "bottom",
          },
        ],
      },
    },
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
