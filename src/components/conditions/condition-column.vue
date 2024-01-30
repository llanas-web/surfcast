<template>
  <div class="flex-1 h-full hidden text-gray-500 rounded-xl p-2 text-center">
    <div class="font-bold mb-2">
      {{ dayjs(condition.date).format('HH[h]') }}
    </div>
    <div class="px-2">
      <div class="mb-2">
        <span>
          {{ condition.wind.speed }}
        </span>
      </div>
      <div class="mb-2">
        <span>
          {{ condition.swell.height }}
        </span>
      </div>
      <div class="mb-2">
        <span>
          {{ condition.wave.height }}
        </span>
      </div>
      <div class="mb-2">
        <span>
          {{ condition.seaTemperature }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ConditionModel } from '@/model/condition.model';
import dayjs from 'dayjs';

const { condition } = defineProps<{ condition: ConditionModel }>();
</script>
