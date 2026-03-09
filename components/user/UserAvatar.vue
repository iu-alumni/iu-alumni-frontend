<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { UserCircleIcon } from '@heroicons/vue/24/solid'
import usersApi from '~/api/users'

// Module-level cache — survives component unmount/remount (navigation away & back)
const cache = new Map<string, string | null>()

const props = defineProps<{
  userId: string
  size?: string
}>()

const avatar = ref<string | null>(null)

onMounted(async () => {
  if (cache.has(props.userId)) {
    avatar.value = cache.get(props.userId) ?? null
    return
  }
  try {
    const data = await usersApi.getUserAvatar(props.userId)
    cache.set(props.userId, data.avatar)
    avatar.value = data.avatar
  } catch {
    cache.set(props.userId, null)
  }
})
</script>

<template>
  <img
    v-if="avatar"
    :src="`data:image/jpeg;base64,${avatar}`"
    :class="size ?? 'w-10 h-10'"
    class="rounded-full object-cover flex-shrink-0"
    alt="User avatar"
  >
  <UserCircleIcon
    v-else
    :class="size ?? 'w-10 h-10'"
    class="text-gray-400 flex-shrink-0"
  />
</template>
