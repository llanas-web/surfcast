<template>
  <div class="mx-auto px-16">
    <h2 class="ml-16 text-3xl font-black tracking-tight text-cyan-700 sm:text-4xl mb-4 capitalize">
      {{ formatedDate }}
    </h2>
    <div class="h-52 relative">
      <div ref="conditionCanvasContainer" class="absolute h-full w-full z-0">
        <ConditionCanvas
          :conditions="conditionDay.conditions"
          :width="canvasWidth"
          :height="canvasHeight"
        />
      </div>
      <div
        class="absolute h-full w-full flex justify-center items-center gap-2 [&>*:nth-child(7n+1)]:block sm:[&>*:nth-child(6n)]:block md:[&>*:nth-child(6n)]:block lg:[&>*:nth-child(4n)]:block 2xl:[&>*:nth-child(2n)]:block"
      >
        <ConditionInfoColumn />
        <ConditionColumn
          v-for="condition in conditionDay.conditions"
          :key="condition.date.toISOString()"
          :condition="condition"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ConditionDay } from '@/model/condition.model';
import ConditionCanvas from '@/components/conditions/condition-canvas.vue';
import ConditionColumn from '@/components/conditions/condition-column.vue';
import ConditionInfoColumn from '@/components/conditions/condition-info-column.vue';
import { onMounted, onUnmounted, ref, computed } from 'vue';
import dayjs from 'dayjs';
import localizedPlugin from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/fr';

dayjs.locale('fr');
dayjs.extend(localizedPlugin);

const { conditionDay } = defineProps<{ conditionDay: ConditionDay }>();

const conditionCanvasContainer = ref<HTMLDivElement | undefined>();
const canvasWidth = ref(0);
const canvasHeight = ref(0);

const formatedDate = computed(() => {
  const day = dayjs(conditionDay.date);

  if (day.get('D') === 1) {
    return day.format('dddd D MMM');
  } else {
    return day.format('ddd D');
  }
});

const resize = () => {
  if (!conditionCanvasContainer.value) return;
  console.log(conditionCanvasContainer.value.clientWidth);
  canvasWidth.value = conditionCanvasContainer.value.clientWidth;
  canvasHeight.value = conditionCanvasContainer.value.clientHeight;
};

onMounted(() => {
  resize();
  window.addEventListener('resize', resize);
});

onUnmounted(() => {
  window.removeEventListener('resize', resize);
});
</script>
