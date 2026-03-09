<script setup lang="ts">
import { ref, onMounted } from 'vue'
import eventsApi from '~/api/events'

const props = defineProps<{
  eventId: string
  title?: string
  size?: string
}>()

const cover = ref<string | null>(null)

onMounted(async () => {
  try {
    const data = await eventsApi.getEventCover(props.eventId)
    cover.value = data.cover
  } catch {
    // fallback to placeholder
  }
})
</script>

<template>
  <img
    v-if="cover"
    :src="`data:image/jpeg;base64,${cover}`"
    :class="size ?? 'h-10 w-10'"
    class="flex-shrink-0 rounded-full object-cover"
    :alt="title ?? 'Event cover'"
  >
  <div
    v-else
    :class="size ?? 'h-10 w-10'"
    class="flex-shrink-0 rounded-full bg-gray-200"
  />
</template>
