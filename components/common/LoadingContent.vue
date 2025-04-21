<script setup lang="ts">
import SimpleLoader from './SimpleLoader.vue';

defineProps<{
  isLoading: boolean
}>()
</script>

<template>
  <template v-if="isLoading">
    <SimpleLoader />
  </template>

  <template v-else>
    <slot />
  </template>
</template>