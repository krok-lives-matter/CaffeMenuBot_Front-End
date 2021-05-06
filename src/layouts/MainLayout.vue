<template>
  <div class="container">
    <div class="main-wrapper">
      <Navigation />
      <slot />
    </div>
  </div>
</template>

<script>
import Navigation from "../components/Navigation";

export default {
  name: "MainLayout",
  components: { Navigation },
};
</script>

<style scoped lang="scss">
.main-wrapper {
  padding-top: 40px;
  display: flex;
}
</style>
