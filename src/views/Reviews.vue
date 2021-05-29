<template>
  <MainLayout>
    <div class="reviews">
      <div><h1>Reviews</h1></div>
      <div class="reviews__wrap">
        <div class="reviews__table">
          <div class="reviews__item">
            <div class="reviews__title"><b>Review</b></div>
            <div class="reviews__rate"><b>Rate</b></div>
          </div>
          <template v-if="$store.state.reviews.reviews">
            <div
              class="reviews__item"
              v-for="review in $store.state.reviews.reviews"
              :key="review.id"
            >
              <div class="reviews__title">{{ review.reviewComment }}</div>
              <div class="reviews__rate">
                <template>{{ reviewRating(review.rating) }}</template>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "../layouts/MainLayout";

export default {
  name: "Reviews",
  components: { MainLayout },
  async mounted() {
    await this.$store.dispatch("reviews/fetchReviews");
  },
  methods: {
    reviewRating(rating) {
      switch (rating) {
        case 1:
          return "😡";
        case 2:
          return "😐";
        case 3:
          return "🙂";
        case 4:
          return "😀";
        case 5:
          return "😍";
        default:
          return "";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.reviews {
  width: 100%;
  min-width: 700px;

  &__table {
    border: 1px solid #cfcfcf;
    border-radius: 5px;
  }

  &__item {
    padding: 14px 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #cfcfcf;

    &:last-child {
      border-bottom: 0;
    }
  }

  &__title {
    width: calc(100% / 2 - 10px);
  }

  &__rate {
    width: calc(100% / 2 - 10px);
  }
}
</style>
