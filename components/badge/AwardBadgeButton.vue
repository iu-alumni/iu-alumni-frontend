<script setup lang="ts">
import { onMounted, ref } from 'vue';
import DefaultButton from '~/components/common/DefaultButton.vue';
import badgesApi from '~/api/badges';
import { useToast } from '~/components/ui/toast/use-toast';
import type { BadgeCatalogItem } from '~/types';

const props = defineProps<{
  alumniId: string;
  userLabel?: string;
}>();

const emit = defineEmits<{ (e: 'awarded'): void }>();

const { toast } = useToast();
const isOpen = ref(false);
const catalog = ref<BadgeCatalogItem[]>([]);
const selectedCode = ref('');
const isSubmitting = ref(false);

const load = async () => {
  if (catalog.value.length) return;
  try {
    catalog.value = await badgesApi.listBadges();
  } catch {
    toast({ variant: 'destructive', title: 'Failed to load catalog' });
  }
};

onMounted(load);

const open = async () => {
  await load();
  selectedCode.value = '';
  isOpen.value = true;
};

const submit = async () => {
  if (!selectedCode.value) {
    toast({ variant: 'destructive', title: 'Pick a badge first' });
    return;
  }
  isSubmitting.value = true;
  try {
    await badgesApi.awardBadge({
      alumni_id: props.alumniId,
      badge_code: selectedCode.value,
    });
    toast({ title: 'Badge awarded' });
    isOpen.value = false;
    emit('awarded');
  } catch (e: unknown) {
    const detail =
      (e as { response?: { data?: { detail?: string } } })?.response?.data
        ?.detail ?? 'Award failed';
    toast({ variant: 'destructive', title: detail });
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <DefaultButton
    type="inactive"
    size="small"
    @click="open"
  >
    Award badge
  </DefaultButton>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    @click.self="isOpen = false"
  >
    <div class="bg-white rounded-md shadow-2xl border border-bluegray p-6 w-[400px]">
      <h3 class="text-lg font-semibold mb-1">
        Award a badge
      </h3>
      <p
        v-if="userLabel"
        class="text-sm text-gray-600 mb-4"
      >
        Recipient: <span class="font-medium">{{ userLabel }}</span>
      </p>
      <label class="text-xs uppercase tracking-wide text-gray-500">
        Badge
      </label>
      <select
        v-model="selectedCode"
        class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brandgreen"
      >
        <option
          value=""
          disabled
        >
          Pick a badge…
        </option>
        <option
          v-for="b in catalog"
          :key="b.code"
          :value="b.code"
        >
          {{ b.name }} ({{ b.tier }})
        </option>
      </select>
      <div class="flex justify-end gap-2 mt-6">
        <DefaultButton
          type="inactive"
          size="small"
          :disabled="isSubmitting"
          @click="isOpen = false"
        >
          Cancel
        </DefaultButton>
        <DefaultButton
          size="small"
          :disabled="isSubmitting"
          @click="submit"
        >
          {{ isSubmitting ? 'Awarding…' : 'Award' }}
        </DefaultButton>
      </div>
    </div>
  </div>
</template>
