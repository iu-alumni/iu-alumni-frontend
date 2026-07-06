<script setup lang="ts">
defineProps<{
  tier: 'gold' | 'silver' | 'bronze' | 'special';
}>();

const tierClass: Record<string, string> = {
  gold: 'bg-yellow-100 text-yellow-800',
  silver: 'bg-gray-200 text-gray-800',
  bronze: 'bg-orange-100 text-orange-800',
  special: 'bg-green-100 text-green-800',
};
</script>

<template>
  <span
    class="inline-block px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide"
    :class="tierClass[tier]"
  >
    {{ tier }}
  </span>
</template>
