<script setup lang="ts">
defineProps<{
  withShadow?: boolean
}>()
</script>

<template>
  <img alt="" class="h-[44px] w-[44px] rounded-full bg-basegray" :class="{'icon-shadow': withShadow}" />
</template>