import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useFetch } from '../composables/fetch'

export const useExchangeStore2 = defineStore('exchange', () => {
  const exchangeData = ref(0)
  const name = ref('Eduardo')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  async function getExchangeData() {
    try {
      const urlRealTime = 'http://localhost:3000/realtime_tsfx'
      exchangeData.value = await useFetch(urlRealTime)
      return exchangeData
    } catch (error) {
      console.error('Error fetching data:', error)
      return exchangeData
    }
  }

  return { count, name, doubleCount, increment }
})

export const useExchangeStore3 = defineStore('exchange', {
  state: () => ({
    exchangeData: {}
  }),
  getters: {},
  actions: {
    deleteAll() {}
  }
})

export const useExchangeStore4 = defineStore('exchange', () => {
  const exchangeData = ref({})

  const sanitizedExchangeData = computed(() => {
    let test = 'a'
    return test
  })

  const getExchangeData = computed(async () => {
    try {
      const urlRealTime = 'http://localhost:3000/realtime_tsfx'
      exchangeData.value = await useFetch(urlRealTime)
      return exchangeData
    } catch (error) {
      console.error('Error fetching data:', error)
      return exchangeData
    }
  })

  function deleteAll() {
    exchangeData.value = {}
  }

  return { exchangeData, sanitizedExchangeData, deleteAll, getExchangeData }
})
