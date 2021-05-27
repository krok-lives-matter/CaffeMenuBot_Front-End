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
            >
              <img
                v-if="menu.coverPhotoUrl"
                :src="menu.coverPhotoUrl"
                alt="pic"
              />
              <img v-else src="../assets/images/menu_preview.jpg" alt="pic" />
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
      <Modal title="Create Modal" @closeModal="closeModal" v-if="modal">
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
      </Modal>
    </transition>
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout";
import AddBtn from "../components/AddBtn";
import Modal from "../components/Modal";

export default {
  name: "EditMenu",
  components: { Modal, AddBtn, MainLayout },
  async mounted() {
    document.addEventListener("keydown", this.exitModalByKeyPress);
    await this.$store.dispatch("menu/fetchMenu");
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.exitModalByKeyPress);
  },
  data: () => ({
    modal: false,
    name: "",
  }),
  methods: {
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    },
    async addMenu() {
      if (this.name.length) {
        const item = {
          categoryName: this.name,
          isVisible: false,
        };
        await this.$store.dispatch("menu/addMenu", item);
        await this.$store.dispatch("menu/fetchMenu");
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
