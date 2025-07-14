<script setup lang="ts">
import DefaultButton from './DefaultButton.vue';

defineProps<{
  isOpened: boolean
}>()

defineEmits(['open'])
</script>

<template>
  <DefaultButton @click="$emit('open')" size="small">
    <slot name="button" />
  </DefaultButton>

  <template v-if="isOpened">
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden flex items-center justify-center">
      <div class="fixed rounded-[4px] bg-white p-[24px] max-w-[504px] shadow-2xl border-1 border-bluegray">
        <slot name="content" />
      </div>
    </div>
  </template>
</template>