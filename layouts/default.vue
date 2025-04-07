<script setup lang="ts">
import DefaultHeader from '~/components/common/DefaultHeader.vue'
</script>

<template>
  <div class="pb-[36px] overflow-x-hidden">
    <DefaultHeader />
    <slot />
  </div>
</template>