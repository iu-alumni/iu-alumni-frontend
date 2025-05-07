<script setup lang="ts">
import type { Sticker } from '~/types';
import AwardSticker from './AwardSticker.vue';

defineProps<{
  stickers: Sticker[]
}>()
</script>

<template>
  <div>
    <div class="flex justify-between gap-[24px] mb-[21px]">
      <h3>
        Stickers
      </h3>

      <AwardSticker />
    </div>

    <div class="flex gap-[16px] min-w-0 min-h-0 overflow-x-auto pb-[8px]">
      <div
        v-for="sticker in stickers"
        :key="sticker.id"
        class="flex flex-col gap-[14px] items-center"
      >
        <div class="w-[96px] h-[96px] flex items-center justify-center">
          <img :src="sticker.img" class="max-w-[96px] max-h-[96px]" />
        </div>
        <span class="text-bluegray text-[18px]">
          {{ sticker.label }}
        </span>
      </div>
    </div>
  </div>
</template>