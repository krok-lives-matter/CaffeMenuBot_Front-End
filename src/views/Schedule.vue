<template>
  <MainLayout>
    <div class="admin">
      <h1>Schedule</h1>
      <template v-if="mode === 'table_mode'">
        <v-table>
          <v-table-item
            @editItem="editItem"
            v-for="schedule in $store.state.schedule.schedules"
            :key="schedule.id"
          >
            <template slot="title">
              {{ schedule.orderIndex }}, {{ schedule.weekdayName }},
              {{ schedule.openTime }} – {{ schedule.closeTime }}
            </template>
            <template slot="buttons">
              <div
                @click="editItem(schedule)"
                class="table__control table__control-icon"
              >
                <img src="@/assets/images/edit.svg" alt="pic" />
              </div>
              <div
                @click="deleteItem(schedule.id)"
                class="table__control table__control-icon"
              >
                <img src="@/assets/images/remove.svg" alt="pic" />
              </div>
            </template>
          </v-table-item>
        </v-table>
      </template>
      <v-mode v-if="mode === 'create_mode'">
        <input
          type="text"
          v-model="newSchedule.weekdayName"
          class="input"
          placeholder="Weekday name..."
        />
        <input
          type="text"
          v-model="newSchedule.openTime"
          class="input"
          placeholder="Open time..."
        />
        <input
          type="text"
          v-model="newSchedule.closeTime"
          class="input"
          placeholder="Close time..."
        />
        <input
          v-model="newSchedule.orderIndex"
          type="number"
          class="input"
          placeholder="OrderIndex"
        />
      </v-mode>
      <template v-if="mode === 'edit_mode'">
        <input
          type="text"
          v-model="schedule.weekdayName"
          class="input"
          placeholder="Weekday name..."
        />
        <input
          type="text"
          v-model="schedule.openTime"
          class="input"
          placeholder="Open time..."
        />
        <input
          type="text"
          v-model="schedule.closeTime"
          class="input"
          placeholder="Close time..."
        />
        <input
          v-model="schedule.orderIndex"
          type="number"
          class="input"
          placeholder="OrderIndex"
        />
      </template>
      <v-switcher
        @switchMode="switchMode"
        :is-create="mode === 'create_mode'"
        :is-edit="mode === 'edit_mode'"
        :newSchedule="newSchedule"
        :schedule="schedule"
        @createSchedule="createSchedule"
        @editSchedule="editSchedule"
      />
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout";
import VTable from "../components/vTable";
import VTableItem from "../components/vTableItem";
import VSwitcher from "../components/vSwitcher";
import VMode from "../components/vMode";

export default {
  name: "User",
  components: { VMode, VSwitcher, VTableItem, VTable, MainLayout },
  async mounted() {
    await this.$store.dispatch("schedule/fetchSchedule");
  },
  data() {
    return {
      mode: "table_mode",
      schedule: {},
      newSchedule: {},
    };
  },
  methods: {
    switchMode(emits) {
      if (emits === "create_mode") {
        this.mode = "create_mode";
      } else {
        this.mode = "table_mode";
      }
    },
    async deleteItem(idx) {
      await this.$store.dispatch("schedule/deleteSchedule", idx);
    },
    editItem(schedule) {
      this.mode = "edit_mode";
      this.schedule = {
        id: schedule.id,
        weekdayName: schedule.weekdayName,
        openTime: schedule.openTime,
        closeTime: schedule.closeTime,
        orderIndex: schedule.orderIndex,
      };
    },
    async createSchedule(schedule) {
      await this.$store.dispatch("schedule/createSchedule", schedule);
      this.mode = "table_mode";
      this.newSchedule = {};
    },
    async editSchedule(schedule) {
      await this.$store.dispatch("schedule/editSchedule", schedule);
      this.mode = "table_mode";
      this.schedule = {};
    },
  },
};
</script>

<style scoped>
.admin {
  width: 100%;
}
</style>
