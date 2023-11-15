import { defineStore } from 'pinia'
import { ref, reactive, shallowRef } from 'vue'
import { useFetch } from '../composables/fetch'
import { useDateFormatter } from '@/composables/formatDate'
const { formatDateString } = useDateFormatter()

export const useExchangeStore = defineStore('exchange', () => {
  // STATE
  const exchangeRateHistory = ref([])
  const isUSD = shallowRef(true)
  const lastExchangeRate = ref(null)
  const lastLastRefreshed = ref(null)
  const baseUrl = import.meta.env.VITE_BASE_URL
  let isFirstFetch = true
  const currency = ref('USD')
  let apiKey = import.meta.env.VITE_API_KEY
  const { data, error, loading, fetchData } = useFetch(baseUrl)

  // ACTIONS

  async function fetchExchangeData() {
    await fetchData({
      function: 'CURRENCY_EXCHANGE_RATE',
      from_currency: 'BTC',
      to_currency: currency.value,
      apikey: apiKey
    })
    if (data.value) {
      data.value = data.value['Realtime Currency Exchange Rate']
    }

    if (!error.value) {
      const currentLastRefreshed = data.value['6. Last Refreshed']
      const formattedDate = formatDateString(currentLastRefreshed)
      const currentExchangeRate = parseFloat(data.value['5. Exchange Rate'])

      // compare values from last fetch
      const valueChange = currentExchangeRate - lastExchangeRate.value
      const trend = valueChange > 0 ? 'up' : valueChange < 0 ? 'down' : 'no-change'

      // if the time of last refresh is the same as the last one skip rest of the logic
      if (currentLastRefreshed == lastLastRefreshed.value && trend === 'no-change') {
        return
      }

      const transformedObject = reactive({
        exchangeRate: currentExchangeRate,
        bidPrice: data.value['8. Bid Price'],
        askPrice: data.value['9. Ask Price'],
        lastRefreshed: formattedDate,
        trend,
        valueChange: valueChange,
        firstOne: true
      })

      // if this the first fetching dont show de value diff and trend
      if (isFirstFetch) {
        transformedObject.trend = 'no-change'
        transformedObject.valueChange = 0
        lastLastRefreshed.value = data.value['6. Last Refreshed']
      }

      // add the transformed object to the first position of the array
      exchangeRateHistory.value.unshift(transformedObject)
      // save values for later comparison
      lastExchangeRate.value = currentExchangeRate
      lastLastRefreshed.value = data.value['6. Last Refreshed']

      isFirstFetch ? '' : (exchangeRateHistory.value[1].firstOne = false)
      isFirstFetch = false
    }
  }

  function changeDataType() {
    if (isUSD.value) {
      currency.value = 'CNY'
      apiKey = 'demo'
      exchangeRateHistory.value = []
      isUSD.value = false
      isFirstFetch = true
      fetchExchangeData()
      return
    } else {
      currency.value = 'USD'
      apiKey = import.meta.env.VITE_API_KEY
      exchangeRateHistory.value = []
      isUSD.value = true
      isFirstFetch = true
      fetchExchangeData()
    }
  }

  return {
    exchangeRateHistory,
    fetchExchangeData,
    error,
    loading,
    lastExchangeRate,
    changeDataType,
    currency
  }
})
