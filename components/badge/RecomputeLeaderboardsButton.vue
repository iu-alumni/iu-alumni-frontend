<script setup lang="ts">
import { ref } from 'vue';
import DefaultButton from '~/components/common/DefaultButton.vue';
import TextInput from '~/components/common/TextInput.vue';
import badgesApi from '~/api/badges';
import { useToast } from '~/components/ui/toast/use-toast';

const emit = defineEmits<{ (e: 'done'): void }>();

const { toast } = useToast();
const isOpen = ref(false);
const yearInput = ref(String(new Date().getFullYear() - 1));
const isSubmitting = ref(false);

const submit = async () => {
  const year = Number.parseInt(yearInput.value, 10);
  if (!Number.isFinite(year) || year < 2010 || year > 2100) {
    toast({ variant: 'destructive', title: 'Enter a valid year' });
    return;
  }
  isSubmitting.value = true;
  try {
    const res = await badgesApi.recomputeLeaderboards(year);
    toast({
      title: `Recomputed ${res.year}`,
      description: `${res.awarded} Local Legend badges awarded.`,
    });
    isOpen.value = false;
    emit('done');
  } catch {
    toast({ variant: 'destructive', title: 'Recompute failed' });
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <DefaultButton
    type="inactive"
    size="small"
    @click="isOpen = true"
  >
    Recompute leaderboards
  </DefaultButton>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    @click.self="isOpen = false"
  >
    <div class="bg-white rounded-md shadow-2xl border border-bluegray p-6 w-[360px]">
      <h3 class="text-lg font-semibold mb-1">
        Recompute Local Legend
      </h3>
      <p class="text-sm text-gray-600 mb-4">
        Awards the yearly winner per city for the target year. Safe to re-run.
      </p>
      <label class="text-xs uppercase tracking-wide text-gray-500">
        Year
      </label>
      <TextInput
        v-model="yearInput"
        placeholder="2024"
        class="w-full my-2"
      />
      <div class="flex justify-end gap-2 mt-4">
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
          {{ isSubmitting ? 'Running…' : 'Run' }}
        </DefaultButton>
      </div>
    </div>
  </div>
</template>
