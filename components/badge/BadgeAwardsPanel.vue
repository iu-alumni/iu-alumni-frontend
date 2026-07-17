<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import DefaultButton from '~/components/common/DefaultButton.vue';
import SimpleLoader from '~/components/common/SimpleLoader.vue';
import badgesApi from '~/api/badges';
import { useToast } from '~/components/ui/toast/use-toast';
import type { BadgeAward, BadgeAwardsResponse } from '~/types';

const props = defineProps<{
  code: string | null;
}>();

const emit = defineEmits<{
  (e: 'revoked', code: string): void;
  (e: 'close'): void;
}>();

const { toast } = useToast();
const data = ref<BadgeAwardsResponse | null>(null);
const isLoading = ref(false);
const revokingKey = ref<string | null>(null);

const rows = computed<BadgeAward[]>(() => data.value?.awards ?? []);

const load = async () => {
  if (!props.code) return;
  isLoading.value = true;
  try {
    data.value = await badgesApi.listAwards(props.code);
  } catch {
    toast({ variant: 'destructive', title: 'Failed to load awards' });
  } finally {
    isLoading.value = false;
  }
};

watch(() => props.code, load, { immediate: true });

const rowKey = (r: BadgeAward): string =>
  `${r.alumni_id}::${JSON.stringify(r.extra)}`;

const revoke = async (row: BadgeAward) => {
  if (!props.code) return;
  const key = rowKey(row);
  revokingKey.value = key;
  try {
    await badgesApi.revokeBadge({
      alumni_id: row.alumni_id,
      badge_code: props.code,
      metadata: Object.keys(row.extra).length ? row.extra : undefined,
    });
    toast({ title: 'Badge revoked' });
    emit('revoked', props.code);
    await load();
  } catch {
    toast({ variant: 'destructive', title: 'Revoke failed' });
  } finally {
    revokingKey.value = null;
  }
};

const extraLabel = (extra: Record<string, unknown>): string => {
  const parts = Object.entries(extra).map(([k, v]) => `${k}: ${v}`);
  return parts.join(' · ');
};

const formatDate = (iso: string | null): string => {
  if (!iso) return '—';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(iso));
};
</script>

<template>
  <div class="border-l border-gray-200 bg-white p-4 h-full flex flex-col">
    <div class="flex items-start justify-between mb-4">
      <div>
        <div class="text-xs text-gray-500 uppercase tracking-wide">
          Holders
        </div>
        <h3 class="text-lg font-semibold text-gray-900">
          {{ data?.name ?? code }}
        </h3>
      </div>
      <button
        class="text-gray-400 hover:text-gray-600 text-xl leading-none"
        @click="emit('close')"
      >
        ×
      </button>
    </div>
    <div
      v-if="isLoading"
      class="flex items-center justify-center py-10"
    >
      <SimpleLoader />
    </div>
    <div
      v-else-if="!rows.length"
      class="text-sm text-gray-500 py-8 text-center"
    >
      Nobody has earned this badge yet.
    </div>
    <div
      v-else
      class="flex-1 overflow-y-auto divide-y divide-gray-100"
    >
      <div
        v-for="row in rows"
        :key="rowKey(row)"
        class="py-3 flex items-center justify-between gap-3"
      >
        <div class="min-w-0">
          <div class="text-sm font-medium text-gray-900 truncate">
            {{ row.first_name }} {{ row.last_name }}
          </div>
          <div class="text-xs text-gray-500 truncate">
            {{ row.email }}
          </div>
          <div
            v-if="Object.keys(row.extra).length"
            class="text-xs text-brandgreen font-medium mt-0.5"
          >
            {{ extraLabel(row.extra) }}
          </div>
          <div class="text-xs text-gray-400 mt-0.5">
            Awarded {{ formatDate(row.awarded_at) }}<span v-if="row.awarded_by"> · by admin</span>
          </div>
        </div>
        <DefaultButton
          size="small"
          type="inactive"
          :disabled="revokingKey === rowKey(row)"
          @click="revoke(row)"
        >
          {{ revokingKey === rowKey(row) ? 'Revoking…' : 'Revoke' }}
        </DefaultButton>
      </div>
    </div>
  </div>
</template>
