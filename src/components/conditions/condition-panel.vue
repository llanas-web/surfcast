<template>
  <div class="mx-auto">
    <h2 class="ml-16 text-2xl font-bold mb-4">{{ conditionDay.date }}</h2>
    <div class="h-52 relative">
      <div ref="conditionCanvasContainer" class="absolute h-full w-full z-0">
        <ConditionCanvas
          :conditions="conditionDay.conditions"
          :width="canvasWidth"
          :height="canvasHeight"
        />
      </div>
      <div
        class="absolute p-4 h-full w-full flex justify-center items-center gap-2 [&>*:nth-child(6n+1)]:block sm:[&>*:nth-child(4n+1)]:block md:[&>*:nth-child(3n+1)]:block lg:[&>*:nth-child(2n+1)]:block 2xl:[&>*]:block"
      >
        <ConditionColumn
          v-for="condition in conditionDay.conditions"
          :key="condition.date"
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
import { onMounted, onUnmounted, ref } from 'vue';

const { conditionDay } = defineProps<{ conditionDay: ConditionDay }>();

const conditionCanvasContainer = ref<HTMLDivElement | undefined>();
const canvasWidth = ref(0);
const canvasHeight = ref(0);

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
