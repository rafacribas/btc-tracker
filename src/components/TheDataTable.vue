<template>
  <div class="table-wrapper">
    <DataTable showGridlines :value="props.data" :rowStyle="rowStyle" :pt="{
      thead: 'exchange-header',
      table: 'exchange-table',
    }">
      <template #empty>
        <h1 class="no-data">No data availabe.</h1>
      </template>
      <Column field="exchangeRate" header="Exchange Rate" :pt="{
        root: 'column-root'
      }">
        <template #body="slotProps">
          <div class="trend-wrapper">
            <TrendIcon :trend="slotProps.data.trend" style="width:25%" />
            <div style="width:50%">
              {{ slotProps.data.exchangeRate }}
            </div>
            <div class="diff-txt" style="width:25%">
              ({{ diffValue(slotProps.data.valueChange) }})
            </div>
          </div>
        </template>
      </Column>
      <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" :pt="{
        root: 'column-root'
      }" />

    </DataTable>
  </div>
</template>

<script setup>
import TrendIcon from './TheTrendIcon.vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


const props = defineProps(
  {
    data: {
      type: Array,
      required: true
    }
  })


const columns = [
  { field: 'bidPrice', header: 'Bid Price' },
  { field: 'askPrice', header: 'Ask Price' },
  { field: 'lastRefreshed', header: 'Updated at' }
];


function diffValue(value) {
  return value > 0 ? `+${value.toFixed(4)}` : value.toFixed(4)
}
const rowStyle = (data) => {
  if (data.firstOne && data.trend == 'down') {
    return { backgroundColor: 'rgb(255,0,0,0.10)' };
  }
  if (data.firstOne && data.trend == 'up') {
    return { backgroundColor: 'rgb(0,255,0,0.10)' };
  }
};
</script>

<style lang="scss">
.column-root {
  padding: 8px;
  color: $text-color;
}

.exchange-header {
  border-bottom: 1.5px solid #ddd;
}

.exchange-all-columns {
  padding: 8px;
  margin: 5px;
}

.diff-txt {
  display: inline;
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.8);
}

.trend-wrapper {
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  width: 80%;
  align-items: center;
}

.exchange-column {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 8px;
}


.no-data {
  font-size: 18px;
  font-weight: 300;
  text-align: center;
  padding: 8px 0px;
}

.pa {
  padding: 16px;
  margin: 16px;
}

.exchange-table {
  box-shadow: $box-shadow;
  border-radius: .55rem;
  width: 100%;
  padding: 15px !important;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.p-datatable-table {
  padding: 15px;
}

.p-datatable-wrapper {
  border-radius: 15px;
  padding: 15px !important;

}

.table-wrapper {
  height: 100%;
}
</style>