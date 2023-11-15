import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFetch } from '../composables/fetch'

export const useExchangeStore = defineStore('exchange', () => {
  // STATE
  const exchangeData = ref([])
  const url = 'http://localhost:3000/realtime_tsfx'
  const { data, error, loading, fetchData } = useFetch(url)

  // ACTIONS
  async function fetchExchangeData() {
    await fetchData()
    // Check if data is defined before accessing its properties
    if (!error.value) {
      const transformedObject = {
        exchangeRate: data.value['5. Exchange Rate'],
        bidPrice: data.value['8. Bid Price'],
        askPrice: data.value['9. Ask Price'],
        lastRefreshed: data.value['6. Last Refreshed']
      }
      console.log(transformedObject)
      exchangeData.value.push(transformedObject)
    }
  }

  return { exchangeData, fetchExchangeData, error, loading }
})
