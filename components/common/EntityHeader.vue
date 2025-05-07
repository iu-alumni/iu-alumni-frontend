<script setup lang="ts">
import EntityLogo from './EntityLogo.vue';

defineProps<{
  logo: string,
}>()
</script>

<template>
  <div class="flex justify-between">
    <div class="flex">
      <EntityLogo :src="logo" class="mr-[30px]" />
      <div class="self-center">
        <h2 class="mb-[10px]">
          <slot name="title" />
        </h2>
        <h4 class="opacity-80">
          <slot name="subittle" />
        </h4>
      </div>
    </div>

    <div class="mt-[20px] flex flex-col gap-[16px]">
      <slot name="buttons" />
    </div>
  </div>
</template>