<template>
  <div class="home-wrapper">
    <h1 class="title">
      {{ exchangeStore.currency }} to Bitcoin Live Tracker
    </h1>
    <Subtitle />
    <div>
      <TheDataTable :data="exchangeStore.$state.exchangeRateHistory" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { useExchangeStore } from '../stores/exchange'
import TheDataTable from '../components/TheDataTable.vue'
import Subtitle from '@/components/TheSubtitle.vue'
const intervalId = ref(null);

const exchangeStore = useExchangeStore();

onMounted(async () => {
  exchangeStore.fetchExchangeData()

  intervalId.value = setInterval(() => {
    exchangeStore.fetchExchangeData();
  }, 30000);
})

onBeforeUnmount(() => {
  clearInterval(intervalId.value);
});


</script>

<style lang="scss" scoped>
.home-wrapper {
  width: 70%;
  height: 100%;
  margin: 0px auto;
}


.title {
  font-size: 48px;
  margin: 8px 0px;
  text-align: center;
  font-weight: 300;

}

@media (max-width: 1080px) {
  .home-wrapper {
    width: 100%;
  }
}
</style>