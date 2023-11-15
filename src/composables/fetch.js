import { ref } from 'vue'

export function useFetch(baseUrl) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const fetchData = async (params = {}) => {
    loading.value = true
    try {
      const url = new URL(baseUrl)
      Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]))

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const json = await response.json()
      if (json['Error Message']) {
        throw new Error(`Request error!`)
      }
      if (json['Information']) {
        throw new Error('Rate limit reached!')
      }

      error.value = ''
      data.value = json
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, fetchData }
}
