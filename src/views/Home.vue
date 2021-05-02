<template>
  <div class="container">
    <div class="navigation">
      <navigation-link :author="true" text="Serious Sam" />
      <navigation-link link="/status" text="Bot status" />
      <navigation-link link="/edit" text="Edit menu" />
    </div>
  </div>
</template>

<script>
import NavigationLink from "../components/NavigationLink";

export default {
  name: "Home",
  components: {
    NavigationLink,
  },
};
</script>
<style>
.navigation {
  margin-top: 40px;
}
</style>
