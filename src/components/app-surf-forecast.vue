<template>
  <section>
    <ConditionPanel
      v-for="conditionDay in conditionPerDay"
      :key="conditionDay.date"
      :condition-day="conditionDay"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useReportsStore } from '@/composables/use-reports';
import type { ConditionDay, ConditionModel } from '@/model/condition.model';
import { storeToRefs } from 'pinia';
import dayJs from 'dayjs';
import ConditionPanel from './conditions/condition-panel.vue';

const conditionPerDay = ref<ConditionDay[]>([]);

onMounted(async () => {
  const reportStore = useReportsStore();
  const { reports } = storeToRefs(reportStore);
  await reportStore.retrieveReports();
  const mapConditionsPerDay = new Map<string, ConditionModel[]>();
  reports.value.forEach((report) => {
    const date = dayJs(report.date).format('YYYY-MM-DD');
    if (mapConditionsPerDay.has(date)) {
      const conditions = mapConditionsPerDay.get(date) as ConditionModel[];
      conditions.push(report);
      mapConditionsPerDay.set(date, conditions);
    } else {
      mapConditionsPerDay.set(date, [report]);
    }
  });
  conditionPerDay.value = Array.from(mapConditionsPerDay.entries()).map(([date, conditions]) => ({
    date,
    conditions,
  }));
});
</script>
