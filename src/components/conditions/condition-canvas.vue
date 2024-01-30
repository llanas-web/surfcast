<template>
  <svg ref="svgElement" class="rounded-2xl"></svg>
  <canvas ref="canvasElement"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps, toRefs, watch, type Ref } from 'vue';
import { select, scaleLinear, curveCatmullRom, area } from 'd3';
import type { ConditionModel } from '@/model/condition.model';

const props = defineProps({
  conditions: { type: Array<ConditionModel>, default: [] },
  width: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
});

const { conditions, width, height } = toRefs(props);
const context: Ref<CanvasRenderingContext2D | undefined> = ref();
const svgElement: Ref<HTMLOrSVGElement | undefined> = ref();

const render = () => {
  const listWaveHeight = conditions.value
    .filter((condition) => !!condition.wave?.height)
    .map((condition) => condition.wave.height);
  const listSwellHeight = conditions.value
    .filter((condition) => !!condition.swell?.height)
    .map((condition) => condition.swell.height);
  const listWindSpeed = conditions.value
    .filter((condition) => !!condition.wind?.speed)
    .map((condition) => condition.wind.speed);

  // @ts-ignore
  const svg = select(svgElement.value);

  svg.selectAll('*').remove();
  svg
    .attr('width', width.value)
    .attr('height', height.value)
    .attr('viewBox', `0 0 ${width.value} ${height.value}`)
    .attr('style', 'max-width: 100%; height: auto;');

  const xWaveScale = scaleLinear()
    .domain([0, listWaveHeight.length - 1])
    .range([0, width.value]);

  const xSwellScale = scaleLinear()
    .domain([0, listSwellHeight.length - 1])
    .range([0, width.value]);

  const xWindScale = scaleLinear()
    .domain([0, listWindSpeed.length - 1])
    .range([0, width.value]);

  const yWaveScale = scaleLinear().domain([0, 4]).range([height.value, 0]);
  const yWindScale = scaleLinear().domain([0, 100]).range([0, height.value]);

  const waveAreaGenerator = area<number>()
    .x((d, index) => xWaveScale(index))
    .y0(yWaveScale(0))
    .y1((d) => yWaveScale(d))
    .curve(curveCatmullRom.alpha(1));

  const swellAreaGenerator = area<number>()
    .x((d, index) => xSwellScale(index))
    .y0(yWaveScale(0))
    .y1((d) => yWaveScale(d))
    .curve(curveCatmullRom.alpha(1));

  const windAreaGenerator = area<number>()
    .x((d, index) => xWindScale(index))
    .y0(yWindScale(0))
    .y1((d) => yWindScale(d))
    .curve(curveCatmullRom.alpha(1));

  svg
    .append('path')
    .attr('fill', 'rgba(34, 211, 238, 0.5)')
    .attr('d', waveAreaGenerator(listWaveHeight));

  svg
    .append('path')
    .attr('fill', 'rgba(14, 165, 233, 0.5)')
    .attr('d', swellAreaGenerator(listSwellHeight));

  svg
    .append('path')
    .attr('fill', 'rgba(94, 234, 212, 0.5)')
    .attr('d', windAreaGenerator(listWindSpeed));
};

watch(width, render);

onMounted(() => {
  render();
});
</script>
