import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const fetchData = async () => {
    loading.value = true
    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const json = await response.json()
      data.value = json
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, fetchData }
}
