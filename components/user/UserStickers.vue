<script setup lang="ts">
import type { Sticker } from '~/types';
import DefaultButton from '../common/DefaultButton.vue';

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

      <DefaultButton>
        Award
      </DefaultButton>
    </div>

    <div class="flex gap-[16px]">
      <div
        v-for="sticker in stickers"
        :key="sticker.id"
        class="flex flex-col gap-[14px] items-center"
      >
        <img :src="sticker.img" class="max-w-[96px] max-h-[96px]" />
        <span class="text-bluegray text-[18px]">
          {{ sticker.label }}
        </span>
      </div>
    </div>
  </div>
</template>