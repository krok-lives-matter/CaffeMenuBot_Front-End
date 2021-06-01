<template>
  <MainLayout>
    <transition name="fade">
      <Modal title="Update title" @closeModal="closeModal" v-if="modal">
        <form class="form" @submit.prevent="updateTitle">
          <div>
            <input
              class="input"
              v-model="title"
              type="text"
              placeholder="Category title"
            />
          </div>
          <button class="btn btn-primary" type="submit">Update Title</button>
        </form>
      </Modal>
    </transition>
    <div class="dishes">
      <RouterLink to="/menu" class="dishes__back">
        <div class="dishes__back-icon">
          <img src="@/assets/images/arrow-r.svg" alt="pic" />
        </div>
        <div class="dishes__back-text">Back</div>
      </RouterLink>
      <h1>Dishes</h1>
      <template v-if="!error">
        <div v-if="$store.state.menu.menu" class="dishes__wrap">
          <div class="dishes__item">
            <label for="file">
              <div class="dishes__image">
                <img
                  v-if="!$store.state.menu.menu.coverPhotoUrl"
                  src="@/assets/images/big-menu-preview.png"
                  alt="pic"
                />
                <img
                  v-else
                  :src="$store.state.menu.menu.coverPhotoUrl"
                  alt="pic"
                />
              </div>
            </label>
            <input
              type="file"
              id="file"
              accept="image/*"
              @change="fileImage = $event.target.files[0]"
            />
            <div class="dishes__title" id="dishes-title">
              {{ $store.state.menu.menu.categoryName }}
            </div>
            <div class="dishes__controls">
              <div
                @click="toggleCheck"
                :class="{
                  'dishes-control-switch--active':
                    $store.state.menu.menu.isVisible,
                }"
                class="dishes-control dishes-control-switch"
              >
                <span></span>
              </div>
              <div
                class="dishes-control dishes-control-icon"
                @click="deleteMenu"
              >
                <img src="@/assets/images/remove.svg" alt="pic" />
              </div>
              <div
                class="dishes-control dishes-control-icon"
                @click="openModal"
              >
                <img src="@/assets/images/edit.svg" alt="pic" />
              </div>
            </div>
          </div>
          <div class="dishes__item">
            <div class="dishes__search">
              <input
                v-model="search"
                :disabled="tabs !== 'table'"
                class="input"
                :class="{ 'input-disabled': tabs !== 'table' }"
                type="text"
                placeholder="Search..."
              />
              <button
                @click="switchTab"
                class="btn btn-primary dishes__search-btn"
                type="submit"
              >
                {{ tabs === "table" ? "Add mode" : "Search mode" }}
              </button>
            </div>
            <div v-if="tabs === 'table'" class="dishes__table">
              <template v-if="$store.state.dishes.dishes.length">
                <DishTableItem
                  v-for="dish in searchDish"
                  :key="dish.id"
                  :dish="dish"
                  @deleteDish="deleteDish"
                  @editDish="editDish"
                />
              </template>
              <template v-else>
                <div class="dishes__table-item">
                  <div class="dishes__table-head">
                    <div class="dishes__table-big-title">
                      Nothing here, switch to add mode and start adding
                      dishes...
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <form
              @submit.prevent="addDish"
              v-if="tabs === 'form'"
              class="dishes__form"
            >
              <input
                class="input"
                v-model="dish.dishName"
                type="text"
                placeholder="Title..."
              />
              <input
                class="input"
                v-model="dish.price"
                type="number"
                placeholder="Price..."
              />
              <input
                class="input"
                v-model="dish.serving"
                type="text"
                placeholder="Serving..."
              />
              <textarea
                v-model="dish.description"
                class="textarea"
                type="text"
                placeholder="Description..."
              />
              <button class="btn btn-success dishes__form-button">
                add dish
              </button>
            </form>
            <form
              @submit.prevent="updateDish"
              v-if="tabs === 'update'"
              class="dishes__form"
            >
              <input
                v-model="currentDish.dishName"
                class="input"
                type="text"
                placeholder="Name..."
              />
              <input
                v-model="currentDish.price"
                class="input"
                type="number"
                placeholder="Price..."
              />
              <input
                v-model="currentDish.serving"
                class="input"
                type="text"
                placeholder="Weight..."
              />
              <textarea
                v-model="currentDish.description"
                class="textarea"
                type="text"
                placeholder="Description..."
              />
              <button class="btn btn-primary dishes__form-button">
                update dish
              </button>
            </form>
          </div>
        </div>
      </template>
      <template v-else> Error 404</template>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout";
import DishTableItem from "../components/DishTableItem";
import axios from "axios";
import Modal from "../components/Modal";

export default {
  name: "Dishes",
  components: { Modal, MainLayout, DishTableItem },
  async mounted() {
    document.addEventListener("keydown", this.exitModalByKeyPress);
    try {
      await this.$store.dispatch("menu/fetchOneMenu", this.dish.categoryId);
      await this.$store.dispatch("dishes/fetchDishes", this.dish.categoryId);
      this.error = false;
    } catch (e) {
      this.error = true;
    }
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.exitModalByKeyPress);
  },
  data() {
    return {
      error: false,
      title: "",
      modal: false,
      fileImage: null,
      search: "",
      tabs: "table",
      dish: {
        dishName: "",
        description: "",
        serving: "",
        price: "",
        categoryId: Number(this.$router.currentRoute.params.id),
      },
      currentDish: "",
    };
  },
  computed: {
    searchDish() {
      return this.$store.state.dishes.dishes.filter((dish) => {
        return dish.dishName.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  methods: {
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    },
    switchTab() {
      if (this.tabs === "table") {
        this.tabs = "form";
      } else {
        this.tabs = "table";
      }
    },
    exitModalByKeyPress(event) {
      if (event.code === "Escape") {
        this.modal = false;
      }
    },
    editDish(id) {
      this.currentDish = this.$store.state.dishes.dishes.find(
        (item) => item.id === id
      );
      this.tabs = "update";
    },
    async toggleCheck() {
      this.$store.state.menu.menu.isVisible = !this.$store.state.menu.menu
        .isVisible;
      try {
        await axios.put(
          "/dashboard/menu/categories",
          this.$store.state.menu.menu
        );
      } catch (e) {
        console.error("[Error]: toggleCheck");
        throw new Error(e.message);
      }
      const text = this.$store.state.menu.menu.isVisible
        ? "Now your menu is visible"
        : "Now your menu is invisible";
      const type = this.$store.state.menu.menu.isVisible ? "success" : "error";
      this.$notify({
        group: "foo",
        title: "Change visibility",
        text: text,
        type: type,
      });
    },
    async addDish() {
      await this.$store.dispatch("dishes/addDish", this.dish);
      this.tabs = "table";
      this.dish.dishName = "";
      this.dish.description = "";
      this.dish.price = "";
      this.dish.serving = "";
    },
    async deleteDish(id) {
      await this.$store.dispatch("dishes/deleteDish", id);
    },
    async updateDish() {
      await this.$store.dispatch("dishes/updateDish", this.currentDish);
      await this.$store.dispatch("dishes/fetchDishes", this.dish.categoryId);
      this.tabs = "table";
    },
    async deleteMenu() {
      await this.$store.dispatch(
        "menu/deleteMenu",
        this.$router.currentRoute.params.id
      );
      await this.$router.push("/menu");
    },
    async updateTitle() {
      this.$store.state.menu.menu.categoryName = this.title;
      const item = this.$store.state.menu.menu;
      if (this.title.length) {
        await this.$store.dispatch("menu/updateMenu", item);
        await this.$store.dispatch("menu/fetchOneMenu", this.dish.categoryId);
        this.title = "";
        this.modal = false;
      }
    },
  },
  watch: {
    async fileImage() {
      const formData = new FormData();
      formData.append("file", this.fileImage, this.fileImage.name);
      formData.append("categoryId", this.dish.categoryId);
      await this.$store.dispatch("menu/setCoverPhoto", formData);
      await this.$store.dispatch("menu/fetchOneMenu", this.dish.categoryId);
    },
  },
};
</script>

<style lang="scss">
#file {
  display: none;
}

.dishes {
  width: 100%;

  .input {
    width: 100%;
    margin-bottom: 5px;
  }

  &__upload {
    margin-top: 12px;
    width: 100%;
  }

  &__image {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__form-button {
    margin-top: 5px;
  }

  &__back {
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    color: #9c9c9c;
    margin-bottom: 20px;

    &-icon {
      margin-right: 10px;
      display: flex;
      align-items: center;
    }
  }

  &__wrap {
    display: flex;
  }

  &__item {
    &:last-child {
      margin-left: 30px;
      width: 100%;
    }
  }

  &__search {
    display: flex;
  }

  &__search-btn {
    margin-left: 5px;
    height: 50px;
    width: 150px;
  }

  &__image {
    width: 250px;
    height: 250px;
    border-radius: 5px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 7px;
    }

    position: relative;

    &:hover {
      &:before {
        opacity: 1;
      }

      &:after {
        opacity: 1;
      }
    }

    &:before {
      transition: 0.3s all ease-out;
      cursor: pointer;
      content: "";
      opacity: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #e6e6ec;
      border-radius: 5px;
      position: absolute;
    }

    &:after {
      cursor: pointer;
      transition: 0.3s all linear;
      content: url("../assets/images/plus.svg");
      opacity: 0;
      position: absolute;
      z-index: 99;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &__title {
    margin-top: 15px;
    font-weight: 600;
    font-size: 25px;
    line-height: 120%;
    color: #111111;
  }

  &__table {
    border: 1px solid #cfcfcf;
    border-radius: 5px;
  }

  &__table-body {
    margin-top: 15px;
    font-size: 16px;
    line-height: 120%;
  }

  &__table-text {
    display: flex;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__table-title {
    width: 78px;
    margin-right: 20px;
  }

  &__controls {
    margin-top: 12px;
    display: flex;
    align-items: center;
  }

  &__table-item {
    min-width: 700px;
    padding: 14px 20px;

    border-bottom: 1px solid #cfcfcf;

    &:last-child {
      border-bottom: none;
    }

    img {
      -webkit-user-drag: none;
      user-select: none;
    }
  }

  &__table-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__table-controls {
    display: flex;
  }

  &-control {
    margin-right: 15px;
    width: 20px;
    height: 20px;
    cursor: pointer;

    &--active {
      transform: rotate(180deg);
    }

    img {
      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
      user-drag: none;
    }

    &:last-child {
      margin-right: 0;
    }

    &-switch {
      position: relative;
      background: #c4c4c4;
      width: 30px;
      height: 16px;
      border-radius: 9px;

      span {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 100%;
        left: 1px;
        display: block;
        background: #e6e6ec;
        width: 14px;
        height: 14px;
      }

      &--active {
        background: #16c172;

        span {
          background: #ffffff;
          left: unset;
          right: 1px;
        }
      }
    }
  }
}
</style>
