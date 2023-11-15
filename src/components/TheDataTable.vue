<template>
  <DataTable showGridlines :value="dddata" tableStyle="min-width: 50rem">
    <Column field="exchangeRate" header="From currency code"></Column>
    <Column field="bidPrice" header="Exchange Rate"></Column>
    <Column field="askPrice" header="Ask price"></Column>
    <Column field="lastRefreshed" header="Last Refreshed"></Column>
  </DataTable>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref } from 'vue'
import { useExchangeStore } from '../stores/exchange'

const exchangeStore = useExchangeStore();
const dddata = exchangeStore.$state.exchangeData

const products = ref([
  {
    code: 'adsa',
    name: 'dadasd',
    category: 'dasdaa',
    quantity: 'dsadas'
  }
])

const realData = ref({
  "1. From_Currency Code": "BTC",
  "2. From_Currency Name": "Bitcoin",
  "3. To_Currency Code": "USD",
  "4. To_Currency Name": "United States Dollar",
  "5. Exchange Rate": "36670.82000000",
  "6. Last Refreshed": "2023-11-14 08:12:01",
  "7. Time Zone": "UTC",
  "8. Bid Price": "36670.82000000",
  "9. Ask Price": "36670.83000000"
})

const realData2 = ref([{
  exchangeRate: "36670.82000000",
  bidPrice: "36670.82000000",
  askPrice: "36670.83000000",
  lastRefreshed: "2023-11-14 08:12:01",
}])

</script>