<template>
  <div class="container">
    <navigation-link :author="true" text="Serious Sam" />
    <navigation-link text="Bot status" />
    <navigation-link text="Edit menu" />
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
