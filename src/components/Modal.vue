<template>
  <div class="modal">
    <div class="content">
      <div><h1>Create Menu</h1></div>
      <form class="form" @submit.prevent="addMenu">
        <div>
          <input
            class="input"
            v-model="name"
            type="text"
            placeholder="Menu name"
          />
        </div>
        <button class="btn btn-primary" type="submit">Create Menu</button>
      </form>
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
    modal: {
      type: Boolean,
    },
  },
  data: () => ({
    name: "",
  }),
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    addMenu() {
      const menu = {
        categoryName: this.name,
        isVisible: false,
      };
      this.$emit("addMenu", menu);
    },
  },
};
</script>

<style scoped lang="scss">
.modal {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
}
</style>
