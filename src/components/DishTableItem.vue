<template>
  <div class="dishes__table-item">
    <div class="dishes__table-head">
      <div class="dishes__table-big-title">
        {{ dish.dishName }}
      </div>
      <div class="dishes__table-controls">
        <div
          @click="$emit('editDish', dish.id)"
          class="dishes-control dishes-control-icon"
        >
          <img src="@/assets/images/edit.svg" alt="pic" />
        </div>
        <div
          class="dishes-control dishes-control-icon"
          @click="$emit('deleteDish', dish.id)"
        >
          <img src="@/assets/images/remove.svg" alt="pic" />
        </div>
        <div
          :class="{ 'dishes-control--active': showBody }"
          @click="toggleTableBody"
          class="dishes-control dishes-control-icon"
        >
          <img src="@/assets/images/arrow-t.svg" alt="pic" />
        </div>
      </div>
    </div>
    <div v-if="showBody" class="dishes__table-body">
      <div class="dishes__table-text">
        <div class="dishes__table-title">Description:</div>
        <div class="dishes__table-description">
          {{ dish.description }}
        </div>
      </div>
      <div class="dishes__table-text">
        <div class="dishes__table-title">Serving:</div>
        <div class="dishes__table-description">
          {{ dish.serving }}
        </div>
      </div>
      <div class="dishes__table-text">
        <div class="dishes__table-title">Price:</div>
        <div class="dishes__table-description">
          {{ dish.price }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DishTableItem",
  props: {
    dish: {
      type: Object,
    },
  },
  data() {
    return {
      showBody: false,
    };
  },
  methods: {
    toggleTableBody() {
      this.showBody = !this.showBody;
    },
  },
};
</script>
