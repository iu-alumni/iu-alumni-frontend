<script setup lang="ts">
import { ref } from 'vue';
import DefaultButton from './DefaultButton.vue';

const { onUpload } = defineProps<{
  onUpload: (file: File) => void
}>();

const inputRef = ref<HTMLInputElement | null>(null);

const triggerUpload = () => {
  inputRef.value?.click();
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    onUpload(target.files[0]);
    target.value = '';
  }
};
</script>

<template>
  <input
    ref="inputRef"
    type="file"
    hidden
    accept=".xlsx,.xls"
    :multiple="false"
    @change="handleFileChange"
  />
  <DefaultButton @click="triggerUpload" size="small">
    <slot />
  </DefaultButton>
</template>