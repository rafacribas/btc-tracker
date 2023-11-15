<template>
  <ArrowDownIcon v-if="props.trend == 'down'" />
  <ArrowUpIcon v-if="props.trend == 'up'" />
  <div class="no-icon" v-if="props.trend == 'no-change'"> - </div>
</template>

<script setup>
import ArrowUpIcon from '@/components/icons/ArrowUpIcon.vue';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon.vue'

const props = defineProps(
  {
    trend: {
      type: String,
      required: true
    }
  })
</script>
<style scoped>
.no-icon {
  font-weight: 500;
  margin-left: 8px;
}
</style>