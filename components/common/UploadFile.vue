<script setup lang="ts">
import DefaultButton from './DefaultButton.vue';

const inputRef = ref(null)

const triggerUpload = () => {
  (inputRef.value as any).click()
}

</script>

<template>
  <input ref="inputRef" type='file' hidden/>
  <DefaultButton @click="triggerUpload" size="small">
    <slot />
  </DefaultButton>
  
</template>