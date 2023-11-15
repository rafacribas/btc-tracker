<template>
  <button style="margin: 20px;" @click="exchangeStore.fetchExchangeData()">get real time datA now!!</button>
  <div>
    {{ exchangeStore.exchangeData }}
  </div>
  <div v-if="exchangeStore.loading">
    loading!
  </div>
  <div v-if="exchangeStore.error">
    ERROR!
  </div>
  data table
  {{ exchangeStore.error }}
  <TheDataTable />
</template>

<script setup>
import { onMounted } from 'vue';
import { useExchangeStore } from '../stores/exchange'
import TheDataTable from '../components/TheDataTable.vue'

const exchangeStore = useExchangeStore();

onMounted(async () => {
  exchangeStore.fetchExchangeData()
})


</script>