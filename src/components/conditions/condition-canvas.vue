<template>
  <canvas ref="canvasElement"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps, toRefs, watch, type Ref } from 'vue';
import * as d3 from 'd3';
import { type ConditionModel } from '@/model/condition.model';

const props = defineProps({
  conditions: { type: Array<ConditionModel>, default: [] },
  width: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
});

const { conditions, width, height } = toRefs(props);
const canvasElement: Ref<HTMLCanvasElement | undefined> = ref();
const context: Ref<CanvasRenderingContext2D | undefined> = ref();

const render = () => {
  if (!canvasElement.value || !context.value) return;
  console.log('rendering');
  canvasElement.value.width = width.value;
  canvasElement.value.height = height.value;
  const area = d3
    .area<ConditionModel>()
    .x((d, index) => width.value / index)
    .y0((d) => d.wave.height)
    .y1((d) => d.wave.height)
    .curve(d3.curveCatmullRom.alpha(0.5))
    .context(context.value);
  context.value.beginPath();
  area(conditions.value);
  context.value.strokeStyle = 'rgba(54,158,173,.7)';
  context.value.fillStyle = 'rgba(54,158,173,.7)';
  context.value.fill();
  context.value.stroke();
};

watch(width, render);

onMounted(() => {
  context.value = canvasElement.value?.getContext('2d') || undefined;
  render();
});
</script>
