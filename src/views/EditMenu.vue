<template>
  <MainLayout>
    <div class="edit-menu">
      <h1>Menu</h1>
      <div class="edit-menu__wrapper">
        <template v-if="$store.state.menu.menus">
          <template v-for="menu in $store.state.menu.menus">
            <RouterLink
              v-if="menu"
              :to="`/menu/dishes/${menu.id}`"
              :key="menu.id"
              class="edit-menu__item"
              :menu="menu"
            >
              <img src="../assets/images/menu_preview.jpg" alt="pic" />
              <div class="edit-menu__item-desc">
                {{ menu.categoryName | truncate(15) }}
              </div>
            </RouterLink>
          </template>
        </template>
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
  async mounted() {
    document.addEventListener("keydown", this.exitModalByKeyPress);
    await this.$store.dispatch("menu/fetchMenu");
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
    async addMenu(item) {
      if (item.categoryName.length) {
        await this.$store.dispatch("menu/addMenu", item);
        await this.$store.dispatch("menu/fetchMenu", item);
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
    min-width: 870px;
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
