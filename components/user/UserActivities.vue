<script setup lang="ts">
import type { Activity } from '~/types';
import Plus from '@/assets/icons/misc/plus.svg'
import Minus from '@/assets/icons/misc/Minus.svg'

defineProps<{
  activities: Activity[],
}>()

const incrementActivityScore = (id: string) => {
  return
}

const decrementActivityScore = (id: string) => {
  return
}
</script>

<template>
  <div class="grid grid-cols-2 gap-x-[48px] gap-y-[24px]">
    <div
      v-for="activity in activities"
      :key="activity.id"
      class="flex gap-[12px]"
    >
      <div class="icon-shadow h-[24px] w-[24px] rounded-full" :style="{backgroundColor: activity.color || '#D9D9D9'}" />
      <span class="paragraph">{{ activity.name }}</span>
      <span class="button-text">{{ activity.score }}</span>
      <div class="flex flex-col items-center">
        <img
          :src="Plus"
          alt=""
          class="h-[16px] w-[16px] cursor-pointer hover:opacity-95"
          @click="incrementActivityScore(activity.id)"
        />
        <img
          :src="Minus"
          alt=""
          class="h-[16px] w-[16px] cursor-pointer hover:opacity-95"
          @click="decrementActivityScore(activity.id)"
        />
      </div>
    </div>
  </div>
</template>