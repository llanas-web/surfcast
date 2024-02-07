<template>
  <div class="flex-1 h-full hidden text-gray-500 rounded-xl py-2 text-center">
    <div
      class="font-bold mb-2 rounded-full"
      :class="`bg-${condition.rating ? COLOR_SURF_CONDITION[condition.rating] : ''}/60`"
    >
      {{ dayjs(condition.date).format('HH[h]') }}
    </div>
    <div class="px-2">
      <div class="mb-2 px-2 py-1">
        <span class="flex justify-center gap-1">
          {{ condition.wind.speed }}
          <ArrowUpIcon
            class="w-4 stroke-red-300"
            :class="windConditionRotation(condition.wind.direction)"
          />
        </span>
      </div>
      <div class="mb-2 px-4 py-1">
        <span>
          {{ condition.swell.height }}
        </span>
      </div>
      <div class="mb-2 px-4 py-1">
        <span>
          {{ condition.wave.height }}
        </span>
      </div>
      <div class="mb-2 px-4 py-1">
        <span>
          {{ condition.seaTemperature }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ConditionModel } from '@/model/condition.model';
import { COLOR_SURF_CONDITION } from '@/utils/common';
import { ArrowUpIcon } from '@heroicons/vue/24/solid';
import dayjs from 'dayjs';

const ROTATION_WIND_DIRECTION: { [key: string]: number } = {
  n: 0,
  nne: 22,
  ne: 45,
  ene: 67,
  e: 90,
  ese: 112,
  se: 135,
  sse: 157,
  s: 180,
  sso: 202,
  so: 225,
  oso: 247,
  o: 270,
  ono: 292,
  no: 315,
  nno: 337,
};

const windConditionRotation = (windDirection: string) => {
  const direction = windDirection?.toLowerCase().split('_')[1];
  if (!direction || !ROTATION_WIND_DIRECTION[direction]) return '';
  return `rotate-[${ROTATION_WIND_DIRECTION[direction]}deg]`;
};

const { condition } = defineProps<{ condition: ConditionModel }>();
</script>
