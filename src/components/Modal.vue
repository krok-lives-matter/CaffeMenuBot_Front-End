<template>
  <div class="modal">
    <div class="content">
      <div>
        <h1>{{ title }}</h1>
      </div>
      <slot> </slot>
    </div>
    <div class="exit" @click="closeModal">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M23 1L1 23M1 1L23 23" stroke="#111111" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    title: {
      type: String,
      default: "Type text",
    },
  },

  data: () => ({}),
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style scoped lang="scss">
.modal {
  width: 100%;
  height: 100vh;
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
}
</style>
