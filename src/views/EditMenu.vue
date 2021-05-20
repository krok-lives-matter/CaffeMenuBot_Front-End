<template>
  <MainLayout>
    <div class="edit-menu">
      <h1>Menu</h1>
      <div class="edit-menu__wrapper">
        <div
          v-for="menu in $store.state.menu"
          :key="menu.id"
          class="edit-menu__item"
        >
          <img
            v-if="!menu.image"
            src="../assets/images/menu_preview.jpg"
            alt="pic"
          />
          <img v-else :src="menu.image" alt="pic" />
          <div class="edit-menu__item-desc">
            {{ menu.name | truncate(15) }}
          </div>
        </div>
        <div class="edit-menu__item">
          <AddBtn @openModal="openModal" />
        </div>
      </div>
    </div>
    <transition name="fade">
      <CreateModal @addMenu="addMenu" @closeModal="closeModal" v-if="modal" />
    </transition>
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout";
import AddBtn from "../components/AddBtn";
import CreateModal from "../components/Modal";

export default {
  name: "EditMenu",
  components: { CreateModal, AddBtn, MainLayout },
  mounted() {
    document.addEventListener("keydown", this.exitModalByKeyPress);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.exitModalByKeyPress);
  },
  data: () => ({
    modal: false,
  }),
  methods: {
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    },
    addMenu(item) {
      if (item.name.length) {
        this.$store.commit("ADD_MENU", item);
        this.modal = false;
      }
    },
    exitModalByKeyPress(event) {
      if (event.code === "Escape") {
        this.modal = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.edit-menu {
  width: 100%;

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  &__item {
    margin-right: 30px;
    margin-bottom: 30px;

    &:nth-child(8n + 8) {
      margin-right: 0;
    }

    &-desc {
      margin-top: 10px;
      font-size: 15px;
      line-height: 90%;
      color: #111111;
    }
  }
}

img {
  width: 150px;
  height: 150px;
  border-radius: 5px;
  object-fit: cover;
}
</style>
