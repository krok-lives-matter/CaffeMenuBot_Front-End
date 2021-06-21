<template>
  <MainLayout>
    <div class="admin">
      <h1>Hello, {{ admin.userName }}</h1>
      <p>Your email: {{ admin.email }}</p>
      <p>Your id: {{ admin.id }}</p>
      <p>Today is: {{ dateToday }}</p>
      <!--      <template v-if="mode === 'table_mode'">-->
      <!--        <v-table>-->
      <!--          <v-table-item-->
      <!--            @editItem="editItem"-->
      <!--            v-for="user in $store.state.user.users"-->
      <!--            :key="user.id"-->
      <!--          >-->
      <!--            <template slot="title">-->
      <!--              {{ user.userName }} - {{ user.roles }}-->
      <!--            </template>-->
      <!--            <template slot="buttons">-->
      <!--              <div-->
      <!--                @click="editItem(user)"-->
      <!--                class="table__control table__control-icon"-->
      <!--              >-->
      <!--                <img src="@/assets/images/edit.svg" alt="pic" />-->
      <!--              </div>-->
      <!--              <div-->
      <!--                @click="deleteItem(user.id)"-->
      <!--                class="table__control table__control-icon"-->
      <!--              >-->
      <!--                <img src="@/assets/images/remove.svg" alt="pic" />-->
      <!--              </div>-->
      <!--            </template>-->
      <!--          </v-table-item>-->
      <!--        </v-table>-->
      <!--      </template>-->
      <!--      <v-mode v-if="mode === 'create_mode'">-->
      <!--        <input-->
      <!--          type="text"-->
      <!--          v-model="user.name"-->
      <!--          class="input"-->
      <!--          placeholder="User name"-->
      <!--        />-->
      <!--        <input-->
      <!--          type="text"-->
      <!--          v-model="user.email"-->
      <!--          class="input"-->
      <!--          placeholder="User email"-->
      <!--        />-->
      <!--        <select class="input" v-model="user.role">-->
      <!--          <option value="" disabled selected>&#45;&#45; Select role &#45;&#45;</option>-->
      <!--          <option-->
      <!--            v-for="(role, idx) in $store.state.user.roles.roles"-->
      <!--            :key="idx"-->
      <!--            :value="role"-->
      <!--          >-->
      <!--            {{ role }}-->
      <!--          </option>-->
      <!--        </select>-->
      <!--        <input-->
      <!--          type="password"-->
      <!--          v-model="user.password"-->
      <!--          class="input"-->
      <!--          placeholder="User Password"-->
      <!--        />-->
      <!--        <input-->
      <!--          v-model="user.passwordRetype"-->
      <!--          type="password"-->
      <!--          class="input"-->
      <!--          placeholder="Retype User Password"-->
      <!--        />-->
      <!--      </v-mode>-->
      <!--      <template v-if="mode === 'edit_mode'">-->
      <!--        <input type="text" class="input" :value="user.userName" />-->
      <!--        <input type="text" class="input" :value="user.email" />-->
      <!--        <select class="input">-->
      <!--          <option-->
      <!--            v-for="(role, idx) in $store.state.user.roles.roles"-->
      <!--            :key="idx"-->
      <!--            :value="role"-->
      <!--            :selected="role"-->
      <!--          >-->
      <!--            {{ role }}-->
      <!--          </option>-->
      <!--        </select>-->
      <!--      </template>-->
      <!--      <v-switcher-->
      <!--        @switchMode="switchMode"-->
      <!--        :is-create="mode === 'create_mode'"-->
      <!--        :is-edit="mode === 'edit_mode'"-->
      <!--        :user="user"-->
      <!--      />-->
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout";
import { mapGetters } from "vuex";
// import VTable from "../components/vTable";
// import VTableItem from "../components/vTableItem";
// import VSwitcher from "../components/vSwitcher";
// import VMode from "../components/vMode";

export default {
  name: "User",
  // components: { VMode, VSwitcher, VTableItem, VTable, MainLayout },
  components: { MainLayout },

  async mounted() {
    await this.$store.dispatch("auth/getMe");
    await this.$store.dispatch("user/fetchUsers");
    await this.$store.dispatch("user/fetchRoles");
  },
  data() {
    return {
      mode: "table_mode",
      user: {},
      roles: ["admin", "manager"],
    };
  },

  computed: {
    ...mapGetters({ admin: "auth/getAdmin" }),
    dateToday() {
      const now = new Date();
      return `${now.getDate()}/${now.getUTCMonth() + 1}/${now.getFullYear()}`;
    },
  },
  methods: {
    switchMode(emits) {
      if (emits === "create_mode") {
        this.mode = "create_mode";
      } else {
        this.mode = "table_mode";
      }
    },
    editItem(user) {
      this.mode = "edit_mode";
      this.user = user;
    },
    deleteItem(idx) {
      this.users = this.users.filter((user) => idx !== user.id);
    },
    createUser(user) {
      this.$store.dispatch("user/createUser", user);
    },
  },
};
</script>

<style scoped>
.admin {
  width: 100%;
}
</style>
