<template>
  <MainLayout>
    <div>
      <h1>Hello, {{ $store.state.auth.admin.user.userName }}</h1>
      <p>Your email: {{ $store.state.auth.admin.user.email }}</p>
      <p>Your id: {{ $store.state.auth.admin.user.id }}</p>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout";

export default {
  name: "User",
  components: { MainLayout },
};
</script>

<style scoped></style>
