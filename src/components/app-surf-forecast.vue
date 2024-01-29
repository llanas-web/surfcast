<template>
  <section class="mx-auto h-80 relative">
    <div class="absolute w-full h-full">
      <AppSurfChart />
    </div>
    <div
      class="absolute p-4 h-full w-full flex justify-center items-center gap-2 [&>*:nth-child(4n)]:block sm:[&>*:nth-child(3n)]:block md:[&>*:nth-child(3n)]:block lg:[&>*:nth-child(2n)]:block xl:[&>*]:block"
    >
      <div
        v-for="(hour, index) in hours"
        :key="index"
        class="relative flex-1 h-80 [&>*]:rounded-xl hidden"
      >
        <div class="absolute h-full w-full z-0"></div>
        <div class="absolute p-2 z-10">
          <div class="font-bold mb-2">{{ hour }}</div>
          <div class="">
            <div v-for="condition in surfConditions" :key="condition.id" class="mb-2">
              <strong class="text-gray-700">{{ condition.title }}:</strong> {{ condition.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppSurfChart from './app-surf-chart.vue';

const hours = ref([
  '12:00 AM',
  '2:00 AM',
  '4:00 AM',
  '6:00 AM',
  '8:00 AM',
  '10:00 AM',
  '12:00 PM',
  '2:00 PM',
  '4:00 PM',
  '6:00 PM',
  '8:00 PM',
  '10:00 PM',
]);

const surfConditions = ref([
  { id: 1, title: 'Wave Height', value: '3 ft' },
  { id: 2, title: 'Wave Period', value: '10 sec' },
  { id: 3, title: 'Wind Force', value: '15 knots' },
  { id: 4, title: 'Wind Direction', value: 'NE' },
  // Add more conditions as needed
]);
</script>
