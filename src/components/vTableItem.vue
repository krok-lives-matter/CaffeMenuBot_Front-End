<template>
  <div class="table__item">
    <div class="table__head">
      <div class="table__title">
        <slot name="title"></slot>
      </div>
      <div class="table__controls">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VTableItem",
};
</script>

<style lang="scss" scoped>
.table {
  &__item {
    width: 100%;
    padding: 14px 20px;
    border-bottom: 1px solid #cfcfcf;

    &:last-child {
      border-bottom: none;
    }
  }

  &__head {
    display: flex;
    justify-content: space-between;
  }

  &__controls {
    display: flex;
  }

  &__control {
    cursor: pointer;
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
