<template>
  <MainLayout>
    <div class="edit-menu">
      <h1>Menu</h1>
      <AddBtn />
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout";
import AddBtn from "../components/AddBtn";

export default {
  name: "EditMenu",
  components: { AddBtn, MainLayout },
};
</script>

<style scoped lang="scss">
.edit-menu {
  width: 100%;
}
</style>
