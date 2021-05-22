<template>
  <MainLayout>
    <div class="dishes">
      <RouterLink to="/menu" class="dishes__back">
        <div class="dishes__back-icon">
          <img src="@/assets/images/arrow-r.svg" alt="pic" />
        </div>
        <div class="dishes__back-text">Back</div>
      </RouterLink>
      <h1>Dishes</h1>
      <div v-if="$store.state.menu.menu" class="dishes__wrap">
        <div class="dishes__item">
          <label for="file">
            <div class="dishes__image">
              <img src="@/assets/images/big-menu-preview.png" alt="pic" />
            </div>
          </label>
          <input type="file" id="file" />
          <div class="dishes__title" id="dishes-title">
            {{ $store.state.menu.menu.categoryName }}
          </div>
          <div class="dishes__controls">
            <div
              @click="toggleCheck"
              :class="{ 'dishes-control-switch--active': checkState }"
              class="dishes-control dishes-control-switch"
            >
              <span></span>
            </div>
            <div class="dishes-control dishes-control-icon" @click="deleteMenu">
              <img src="@/assets/images/remove.svg" alt="pic" />
            </div>
            <div class="dishes-control dishes-control-icon">
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
          <template v-if="dishes.length">
            <div v-if="tabs === 'table'" class="dishes__table">
              <DishTableItem
                v-for="dish in searchDish"
                :key="dish.id"
                :dish="dish"
                @deleteDish="deleteDish"
                @editDish="editDish"
              />
            </div>
          </template>
          <form
            @submit.prevent="addDish"
            v-if="tabs === 'form'"
            class="dishes__form"
          >
            <input
              class="input"
              v-model="dish.title"
              type="text"
              placeholder="Title..."
            />
            <input
              class="input"
              v-model="dish.price"
              type="text"
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
              v-model="currentDish.title"
              class="input"
              type="text"
              placeholder="Name..."
            />
            <input
              v-model="currentDish.price"
              class="input"
              type="text"
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
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout";
import DishTableItem from "../components/DishTableItem";

export default {
  name: "Dishes",
  components: { MainLayout, DishTableItem },
  async mounted() {
    await this.$store.dispatch(
      "menu/fetchOneMenu",
      this.$router.currentRoute.params.id
    );
  },
  data() {
    return {
      checkState: false,
      search: "",
      tabs: "table",
      dishes: [
        {
          id: 1,
          title: "Шашлык",
          description:
            "1080 грамм. Тигровые креветки, тунец,  лосось, осьминог, окунь, помидоры черри, лайм, лимон, соус.",
          serving: "150/50/25г",
          price: "159 грн",
        },
        {
          id: 2,
          title: "Шашлык-машлык",
          description:
            "1080 грамм. Тигровые креветки, тунец,  лосось, осьминог, окунь, помидоры черри, лайм, лимон, соус.",
          serving: "150/50/25г",
          price: "159 грн",
        },
      ],
      dish: {
        title: "",
        description: "",
        serving: "",
        price: "",
      },
      currentDish: "",
    };
  },
  computed: {
    searchDish() {
      return this.dishes.filter((dish) => {
        return dish.title.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  methods: {
    toggleCheck() {
      this.checkState = !this.checkState;
    },

    switchTab() {
      if (this.tabs === "table") {
        this.tabs = "form";
      } else {
        this.tabs = "table";
      }
    },
    editDish(id) {
      this.currentDish = this.dishes.find((i) => i.id === id);
      this.tabs = "update";
    },
    deleteDish(id) {
      this.dishes = this.dishes.filter((item) => item.id !== id);
    },
    addDish() {
      const dish = {
        ...this.dish,
      };
      this.dishes.unshift(dish);
      this.tabs = "table";
      this.dish = {
        id: Date.now(),
        title: "",
        description: "",
        price: "",
        serving: "",
      };
    },
    updateDish() {
      const idx = this.dishes.findIndex((i) => i === this.currentDish);
      this.dishes[idx] = this.currentDish;
      this.tabs = "table";
    },
    async deleteMenu() {
      await this.$store.dispatch(
        "menu/deleteMenu",
        this.$router.currentRoute.params.id
      );
      await this.$router.push("/menu");
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

    img {
      width: 100%;
      height: 100%;
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
