<script setup lang="ts">
import { onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import { useReports } from '@/services/reports';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'vue-chartjs';
import {
  type ChartData,
  type Point,
  type ChartOptions,
  type LineControllerChartOptions,
} from 'chart.js';
const SURFLINE_COLOR_MAP = {
  0: ['244', '74', '109'],
  1: ['255', '149', '0'],
  2: ['255', '205', '29'],
  3: ['10', '214', '116'],
  4: ['0', '147', '113'],
  5: ['104', '81', '244'],
  6: ['100', '30', '200'],
};

type SurflineRating = keyof typeof SURFLINE_COLOR_MAP;

const getSurflineColor = (rating: SurflineRating, transparent: number) => {
  return `rgba(${SURFLINE_COLOR_MAP[rating].join(',')}, ${transparent})`;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const surfdata = ref<ChartData<'line', (number | Point | null)[], unknown>>({
  labels: [],
  datasets: [],
});
const surfOptions = ref<ChartOptions<'line'>>();

const fetchSurfdata = async () => {
  const response = await useReports().getReports();

  const listDays = Array.from(
    new Set(response.map((item) => dayjs(item.condition_date).format('DD/MM/YYYY HH:mm')))
  );

  surfdata.value = {
    labels: listDays,
    datasets: [
      {
        label: 'Swell Height',
        data: response.map((item) => item.allosurf?.swe_h),
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
        pointRadius: 0,
        yAxisID: 'y',
        order: 2,
      },
      {
        label: 'Wave Height',
        data: response.map((item) => item.allosurf?.s_wht),
        borderColor: 'rgba(255, 99, 132, 1)',
        segment: {
          backgroundColor: (context) => {
            const surflinevalue = response[context.p0.parsed.x].surfline?.value;
            return getSurflineColor(surflinevalue, 0.5);
          },
        },
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        yAxisID: 'y',
        order: 3,
      },
      {
        label: 'Wave Period',
        data: response.map((item) => item.allosurf?.mean_fr),
        borderColor: 'rgba(173, 216, 230, .2)',
        tension: 0.4,
        pointRadius: 0,
        yAxisID: 'y1',
        order: 1,
      },
    ],
  };

  surfOptions.value = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          callback: (tickValue, index, ticks) => (index % 24 === 0 ? listDays[index] : ''),
          color: '#fff',
        },
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Wave Height',
        },
        suggestedMin: 0,
        suggestedMax: 2,
      },
      y1: {
        type: 'linear',
        title: {
          display: true,
          text: 'Wave Period',
        },
        position: 'right',
      },
    },
  };
};

onMounted(() => {
  fetchSurfdata();
});
</script>

<template>
  <h1>Surfcast</h1>
  <div>
    <Line :data="surfdata" :options="surfOptions" class="line-chart"></Line>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.line-chart {
  height: 800px;
  width: 800px;
}
</style>
