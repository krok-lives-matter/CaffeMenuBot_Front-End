<template>
  <MainLayout>
    <div v-if="admin" class="admin">
      <h1>Hello, {{ admin.userName }}</h1>
      <p>Your email: {{ admin.email }}</p>
      <p>Your id: {{ admin.id }}</p>
      <p>Today is: {{ dateToday }}</p>
      <v-table>
        <v-table-item
          v-for="user in $store.state.user"
          :user="user"
          :key="user.id"
        ></v-table-item>
      </v-table>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout";
import { mapGetters } from "vuex";
import VTable from "../components/VTable";
import VTableItem from "../components/vTableItem";

export default {
  name: "User",
  components: { VTableItem, VTable, MainLayout },
  computed: {
    ...mapGetters({ admin: "auth/getAdmin" }),
    dateToday() {
      const now = new Date();
      return `${now.getDate()}/${now.getUTCMonth() + 1}/${now.getFullYear()}`;
    },
  },
  async mounted() {
    await this.$store.dispatch("auth/getMe");
    await this.$store.dispatch("user/fetchUsers");
  },
};
</script>

<style scoped>
.admin {
  width: 100%;
}
</style>
