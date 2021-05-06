<template>
  <MainLayout>
    <Status />
  </MainLayout>
</template>

<script>
import Status from "../components/Status";
import MainLayout from "../layouts/MainLayout";

export default {
  name: "Home",
  components: {
    MainLayout,
    Status,
  },
};
</script>
