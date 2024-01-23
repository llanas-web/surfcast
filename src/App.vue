<script setup lang="ts">
import { onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import { useReports } from '@/services/reports';

const reportsByDay = ref<any[]>([]);

onMounted(async () => {
  const response = await useReports().getReports();
  const mapByDay = new Map();
  response.forEach((item) => {
    const day = dayjs(item.timestamp).format('DD/MM/YYYY');
    if (!mapByDay.has(day)) {
      mapByDay.set(day, [item]);
    }
    mapByDay.get(day).push(item);
  });
  reportsByDay.value = Array.from(mapByDay.values());
});
</script>

<template>
  <h1>Surfcast</h1>
  <table>
    <thead>
      <tr>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="day in reportsByDay" :key="day[0]">
        <td
          v-for="hours in day.sort((a: any, b: any) => a.timestamp - b.timestamp)"
          :key="hours.timestamp"
        >
          {{ dayjs(hours.timestamp).format('HH:mm') }} - {{ hours.surfline.key }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
