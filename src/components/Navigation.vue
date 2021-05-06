<template>
  <div class="navigation">
    <router-link
      v-for="route in routes"
      :key="route.link"
      :to="route.link"
      :exact="route.link === '/'"
      class="navigation-link"
      active-class="navigation-link--active"
    >
      <img
        :class="!route.author ? 'image' : ''"
        :src="getImgUrl(route.img)"
        alt="pic"
      />
      <span>{{ route.name }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  data: () => ({
    routes: [
      {
        name: "Serious Sam",
        link: "/user",
        img: "author-logo.png",
        author: true,
      },
      {
        name: "Bot status",
        link: "/",
        img: "moon-apple.png",
      },
      {
        name: "Edit menu",
        link: "/edit",
        img: "fire-apple.png",
      },
    ],
  }),
  methods: {
    getImgUrl(pic) {
      return require("../assets/images/" + pic);
    },
  },
};
</script>

<style scoped lang="scss">
.navigation {
  margin-right: 40px;
}

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

  &--active {
    background: #7e93ff;
    color: #ffffff;
  }

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

.image {
  width: 25px;
  height: 25px;
  margin-right: 15px;
  margin-left: 10px;
}
</style>
