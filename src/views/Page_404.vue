<template>
  <EmptyLayout>
    <div class="content">
      <div><h1>404 Page not found</h1></div>
      <div>Go to <router-link to="/">main page</router-link></div>
    </div>
  </EmptyLayout>
</template>

<script>
import EmptyLayout from "../layouts/EmptyLayout";

export default {
  name: "Page_404",
  components: { EmptyLayout },
};
</script>

<style scoped></style>
