<template>
  <router-link
    class="navigation-link"
    :to="link"
    :exact="exact"
    :active-class="!author ? 'navigation-link--active' : ''"
  >
    <img v-if="author" src="../assets/images/author-logo.png" alt="pic" />
    <div v-else class="block" />
    <span>{{ text }}</span>
  </router-link>
</template>

<script>
export default {
  name: "NavigationLink",
  props: {
    text: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "/",
    },
    author: {
      type: Boolean,
      default: false,
    },
    exact: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.navigation-link {
  height: 55px;
  width: 250px;
  border-radius: 5px;
  background: transparent;
  color: #111111;
  display: flex;
  align-items: center;
  transition: 0.3s all ease-out;
  text-decoration: none;
  padding: 0 25px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: #7e93ff;
    color: #ffffff;
  }
}

img {
  display: inline-block;
  margin-right: 5px;
}

.block {
  background: #c4c4c4;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 15px;
  margin-left: 10px;
}

.navigation-link--active {
  background: #7e93ff;
  color: #ffffff;
}
</style>
