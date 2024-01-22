<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useReports } from '@/services/reports';

const reports = ref<any[]>([]);

onMounted(async () => {
  console.log('mounted');
  reports.value = await useReports().getReports();
});
</script>

<template>
  <h1>Surfcast</h1>
  <table>
    <thead>
      <tr>
        <th>date</th>
        <th>surfline</th>
        <th>allosurf</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in reports" :key="item.timestamp">
        <td>{{ new Date(item.timestamp).toLocaleString() }}</td>
        <td>{{ item.surfline.key }}</td>
        <td>{{ item.allosurf?.s_wht || '' }}</td>
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

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
