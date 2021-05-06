<template>
  <div class="status">
    <h1>Status</h1>
    <div class="status__chart">some chart</div>
    <div class="status__buttons">
      <!--      <button class="btn btn-success">Start the bot</button>-->
      <button class="btn btn-danger">Stop the bot</button>
      <button class="btn btn-warning">Restart the bot</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Status",
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
