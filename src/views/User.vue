<template>
  <MainLayout>
    <div v-if="admin">
      <h1>Hello, {{ admin.userName }}</h1>
      <p>Your email: {{ admin.email }}</p>
      <p>Your id: {{ admin.id }}</p>
      <p>Today is: {{ dateToday }}</p>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout";
import { mapGetters } from "vuex";

export default {
  name: "User",
  components: { MainLayout },
  computed: {
    ...mapGetters({ admin: "auth/getAdmin" }),
    dateToday() {
      const now = new Date();
      return `${now.getDate()}/${now.getUTCMonth() + 1}/${now.getFullYear()}`;
    },
  },
  async mounted() {
    await this.$store.dispatch("auth/getMe");
  },
};
</script>

<style scoped></style>
