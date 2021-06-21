<template>
  <div class="controls">
    <template v-if="user">
      <button @click="createUser(user)" v-if="isCreate" class="btn btn-success">
        Create user
      </button>
      <button @click="editUser" v-if="isEdit" class="btn btn-success">
        Edit user
      </button>
      <button @click="switchMode" class="btn" :class="modeStyle">
        {{ modeNow }}
      </button>
    </template>
    <template v-else>
      <button @click="createSchedule" v-if="isCreate" class="btn btn-success">
        Create schedule
      </button>
      <button @click="editSchedule" v-if="isEdit" class="btn btn-success">
        Edit schedule
      </button>
      <button @click="switchMode" class="btn" :class="modeStyle">
        {{ modeNow }}
      </button>
    </template>
  </div>
</template>

<script>
export default {
  name: "vSwitcher",
  props: {
    isCreate: {
      required: true,
      type: Boolean,
    },
    isEdit: {
      required: true,
      type: Boolean,
    },
    user: {
      required: false,
      type: Object,
    },
    schedule: {
      required: false,
      type: Object,
    },
    newSchedule: {
      required: false,
      type: Object,
    },
  },
  data() {
    return {
      mode: "table_mode",
    };
  },
  methods: {
    switchMode() {
      if (!this.isCreate && !this.isEdit) {
        this.mode = "create_mode";
      } else {
        this.mode = "table_mode";
      }
      this.$emit("switchMode", this.mode);
    },
    createUser(user) {
      if (
        user.password === user.passwordRetype &&
        user.name &&
        user.email &&
        user.password &&
        user.role
      ) {
        const userObject = {
          userName: user.name,
          email: user.email,
          roles: user.role,
          password: user.password,
        };
        this.$store.dispatch("user/createUser", userObject);
      }
      // this.$emit("createUser");
    },
    editUser() {
      this.$emit("editUser");
    },
    createSchedule() {
      if (
        this.newSchedule.closeTime &&
        this.newSchedule.openTime &&
        this.newSchedule.orderIndex &&
        this.newSchedule.weekdayName
      )
        this.$emit("createSchedule", this.newSchedule);
    },
    editSchedule() {
      if (
        this.schedule.closeTime &&
        this.schedule.openTime &&
        this.schedule.orderIndex &&
        this.schedule.weekdayName
      )
        this.$emit("editSchedule", this.schedule);
    },
  },
  computed: {
    modeNow() {
      if (!this.isCreate && !this.isEdit) {
        return "Create mode";
      }
      return "Table mode";
    },
    modeStyle() {
      if (!this.isCreate && !this.isEdit) {
        return "btn-primary";
      }
      return "btn-warning";
    },
  },
};
</script>

<style lang="scss">
.controls {
  margin-top: 5px;
  display: flex;

  .btn {
    &:first-child {
      margin-right: 5px;
    }
  }
}
</style>
