<template>
  <EmptyLayout>
    <div class="content">
      <div><h1>Login</h1></div>
      <form class="form" @submit.prevent="tryAuth">
        <div class="form-control">
          <input
            class="input"
            type="text"
            placeholder="Email"
            v-model="admin.email"
          />
        </div>
        <div class="form-control">
          <!--          <div class="form-password">-->
          <!--            <input-->
          <!--              class="input input-error"-->
          <!--              :type="isShowed ? 'text' : 'password'"-->
          <!--              placeholder="Password"-->
          <!--              v-model="admin.password"-->
          <!--            />-->
          <!--            <span @click="switchShowing">Show</span>-->
          <!--          </div>-->
          <div class="form-password">
            <input
              class="input"
              :type="isShowed ? 'text' : 'password'"
              placeholder="Password"
              v-model="admin.password"
            />
            <span @click="switchShowing">Show</span>
          </div>
        </div>

        <div class="form-group">
          <button class="btn btn-primary" type="submit">Login</button>
        </div>
        <!--        <p class="text-error">[Error]: Password or email does not exist</p>-->
      </form>
    </div>
  </EmptyLayout>
</template>

<script>
import EmptyLayout from "../layouts/EmptyLayout";

export default {
  name: "AdminAuth",
  components: { EmptyLayout },
  data: () => ({
    isShowed: false,
    admin: {
      email: "admin@caffemenubot.com",
      password: "_Change$ThisPlease3",
    },
  }),
  beforeCreate() {
    if (this.$store.state.auth.admin) {
      this.$router.push("/");
    }
  },
  methods: {
    switchShowing() {
      this.isShowed = !this.isShowed;
    },
    async tryAuth() {
      if (this.admin.email.length && this.admin.password.length) {
        if (await this.$store.dispatch("auth/authAdmin", this.admin)) {
          await this.$router.push({ path: "/" });
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.form-jwt-btns {
  width: 320px;
  display: flex;
  justify-content: space-between;

  .btn {
    margin-top: 0;
  }
}

.form-control {
  margin-bottom: 20px;

  input {
    margin-bottom: 0;
  }
}

.text-error {
  margin-top: 15px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 120%;
  color: #db5461;
}

.btn {
  margin-top: 20px;
}

.form-password {
  position: relative;

  span {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    font-size: 12px;
    line-height: 120%;
    cursor: pointer;
    user-select: none;
  }

  input {
    padding-right: 69px;
  }
}
</style>
