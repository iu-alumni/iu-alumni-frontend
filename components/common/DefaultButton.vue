<script setup lang="ts">
const { type = 'active', size = 'big' } = defineProps<{
  type?: 'active' | 'inactive' | 'error'
  size?: 'big' | 'small'
}>()

const mapColors = {
  active: 'bg-brandgreen',
  inactive: 'bg-bluegray',
  error: 'bg-darkpink',
}

const mapPadding = {
  big: 'p-[16px]',
  small: 'p-[8px] h-[55px]',
}
</script>

<template>
  <button class="rounded-[4px] button-text text-white text-center hover:opacity-95 min-w-[136px]" :class="`${mapColors[type]} ${mapPadding[size]}`">
    <slot />
  </button>
</template>