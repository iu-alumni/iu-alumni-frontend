<script setup lang="ts">
const emit = defineEmits(['upload'])

const inputRef = ref(null)

const imageUri = ref(null as any)

const triggerUpload = () => {
  (inputRef.value as any).click()
}

const onChange = (e: any) => {
  const file = e.target.files[0]
  imageUri.value = URL.createObjectURL(file)
  emit('upload', imageUri.value)
}

</script>

<template>
  <input ref="inputRef" type='file' hidden @change="onChange" />
  <button class="bg-bluegray bg-opacity-50 flex items-center justify-center w-[144px] h-[144px] rounded-[4px]" @click="triggerUpload">
    <span v-if="!imageUri">Upload image</span>
    <img v-else :src="imageUri" class="max-w-[144px] max-h-[144px]" />
  </button>
  
</template>