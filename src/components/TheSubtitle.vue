
<template>
  <h2 class="subtitle" style="min-height: 20px;">
    <div v-if="exchangeStore.loading">
      Fetching data...
    </div>
  </h2>
  <h2 class="subtitle">
    <div v-if="exchangeStore.error" class="error-txt">
      {{ exchangeStore.error }}
      Error while fetching data. Try again later.
    </div>
  </h2>
  <div class="subtitles-wrapper">
    <h2 class="subtitle interactive" @click="exchangeStore.changeDataType()">
      {{ exchangeStore.currency == 'USD' ? 'Get unlimited updates!' : 'Get limited updates.' }}
    </h2>
    <h2 class="subtitle interactive" @click="exchangeStore.fetchExchangeData()" v-tooltip.left="{
      value: 'Force request',
      pt: {
        text: {
          style: {
            fontSize: '14px',
            padding: '8px',
            fontWeight: '300',
          }
        }
      }
    }" type="text" placeholder="Top">
      Data is updated every ~60s
    </h2>
  </div>
</template>

<script setup>
import { useExchangeStore } from '../stores/exchange'
const exchangeStore = useExchangeStore();
</script>

<style scoped>
.subtitle {
  font-size: 14px;
  text-align: end;
  margin-right: 28px;
  font-weight: 300;
}

.error-txt {
  color: rgb(255, 0, 0, 0.8);
}

.interactive {
  margin-left: 28px;
  cursor: pointer;
}

.interactive:hover {
  text-decoration: underline;
}

.subtitles-wrapper {
  display: flex;
  justify-content: space-between;
}
</style>
