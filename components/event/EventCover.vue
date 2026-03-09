<script setup lang="ts">
import { ref, onMounted } from 'vue'
import eventsApi from '~/api/events'

// Module-level cache — survives component unmount/remount (navigation away & back)
const cache = new Map<string, string | null>()

const props = defineProps<{
  eventId: string
  title?: string
  size?: string
}>()

const cover = ref<string | null>(null)

onMounted(async () => {
  if (cache.has(props.eventId)) {
    cover.value = cache.get(props.eventId) ?? null
    return
  }
  try {
    const data = await eventsApi.getEventCover(props.eventId)
    cache.set(props.eventId, data.cover)
    cover.value = data.cover
  } catch {
    cache.set(props.eventId, null)
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
