<template>
  <div class="add-btn" @click="openModal">
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20 40V0M0 20H40" stroke="#593C8F" stroke-width="2" />
    </svg>
  </div>
</template>

<script>
export default {
  name: "AddBtn",
  props: {
    modal: {
      type: Boolean,
    },
  },
  methods: {
    openModal() {
      this.$emit("openModal");
    },
  },
};
</script>

<style scoped lang="scss">
.add-btn {
  width: 150px;
  height: 150px;
  border-radius: 5px;
  background: #eeeef2;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s all ease-out;

  &:hover {
    background: #e6e6ec;
  }
}
</style>
