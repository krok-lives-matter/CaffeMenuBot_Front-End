<template>
  <div class="table">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "VTable",
};
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  border: 1px solid #cfcfcf;
  border-radius: 5px;
}
</style>
