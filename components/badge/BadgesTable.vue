<script setup lang="ts">
import type { BadgeCatalogItem } from '~/types';
import BadgeTierPill from './BadgeTierPill.vue';

defineProps<{
  badges: BadgeCatalogItem[];
  selectedCode: string | null;
}>();

const emit = defineEmits<{
  (e: 'select', code: string): void;
}>();
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-gray-200">
    <div class="grid grid-cols-12 bg-gray-50 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      <div class="col-span-3">
        Badge
      </div>
      <div class="col-span-2">
        Tier
      </div>
      <div class="col-span-5">
        Criteria
      </div>
      <div class="col-span-2 text-right">
        Earned by
      </div>
    </div>
    <div class="divide-y divide-gray-200 bg-white">
      <button
        v-for="b in badges"
        :key="b.code"
        type="button"
        class="grid grid-cols-12 items-center w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
        :class="{ 'bg-brandgreen bg-opacity-10': selectedCode === b.code }"
        @click="emit('select', b.code)"
      >
        <div class="col-span-3">
          <div class="text-sm font-medium text-gray-900">
            {{ b.name }}
          </div>
          <div class="text-xs text-gray-500">
            {{ b.code }}
          </div>
        </div>
        <div class="col-span-2">
          <BadgeTierPill :tier="b.tier" />
        </div>
        <div class="col-span-5 text-sm text-gray-600">
          {{ b.criteria_summary }}
        </div>
        <div class="col-span-2 text-right text-sm font-semibold text-gray-900">
          {{ b.earned_by_count }}
        </div>
      </button>
    </div>
  </div>
</template>
