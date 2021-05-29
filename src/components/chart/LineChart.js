import { Line, mixins } from "vue-chartjs";
import axios from "axios";

const { reactiveData } = mixins;

export default {
  extends: Line,
  mixins: [reactiveData],
  data() {
    return {
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
      chartData: {
        datasets: [
          {
            backgroundColor: "#7E93FF",
            borderColor: "#593C8F",
            fill: false,
            data: [
              {
                x: 0,
                y: 0,
              },
              {
                x: 25,
                y: 0,
              },
              {
                x: 50,
                y: 0,
              },
              {
                x: 75,
                y: 0,
              },
              {
                x: 100,
                y: 0,
              },
            ],
          },
        ],
      },
      interval: null,
    };
  },
  async mounted() {
    this.renderChart(this.chartData, this.options);
    await this.fetchLoadAverage();
    this.interval = setInterval(this.fetchLoadAverage, 10000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    async fetchLoadAverage() {
      try {
        const { data } = await axios.get("/system/loadavg");
        if (data) {
          this.chartData = {
            datasets: [
              {
                backgroundColor: "#7E93FF",
                borderColor: "#593C8F",
                fill: false,
                data: [
                  {
                    x: 0,
                    y: data.avg1,
                  },
                  {
                    x: 25,
                    y: data.avg2,
                  },
                  {
                    x: 50,
                    y: data.avg3,
                  },
                  {
                    x: 75,
                    y: data.avg4,
                  },
                  {
                    x: 100,
                    y: data.avg5,
                  },
                ],
              },
            ],
          };
        } else {
          clearInterval(this.interval);
        }
      } catch (e) {
        console.error("[Error]: fetchLoadAverage");
        throw new Error(e.message);
      }
    },
  },
  watch: {
    chartData: function () {
      this.$data._chart.update();
    },
  },
};
