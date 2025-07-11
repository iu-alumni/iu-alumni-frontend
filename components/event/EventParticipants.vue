<script setup lang="ts">
import Edit from '@/assets/icons/misc/button__edit.svg'
import type { EventParticipant } from '~/types';
import SmallIcon from '../common/SmallIcon.vue';
import DefaultSeparator from '../common/DefaultSeparator.vue';

defineProps<{
  users: EventParticipant[]
}>()

const edit = (id: string) => {
  navigateTo(`/users/${id}`)
}
</script>

<template>
  <div>
    <DefaultSeparator />
    <template v-for="user in users" :key="user.id">
      <div class="flex justify-between items-center w-full gap-[24px] py-[12px] px-4 hover:bg-gray-50">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <span class="font-medium">
              {{ user.first_name }} {{ user.last_name }}
              <span v-if="!user.is_verified" class="text-xs text-yellow-600 ml-1">(Unverified)</span>
              <span v-if="user.is_banned" class="text-xs text-red-600 ml-1">(Banned)</span>
            </span>
          </div>
          <div class="text-sm text-gray-600">
            {{ user.email }}
          </div>
          <div v-if="user.show_location && user.location" class="text-sm text-gray-500">
            {{ user.location }}
          </div>
          <div class="text-xs text-gray-400">
            Class of {{ user.graduation_year }}
          </div>
          <p v-if="user.biography" class="text-sm text-gray-600 mt-1 line-clamp-2">
            {{ user.biography }}
          </p>
        </div>

        <div class="flex items-center gap-4">
          <SmallIcon 
            :src="Edit" 
            @click="edit(user.id)" 
            class="hover:bg-gray-100 p-1.5 rounded-md transition-colors"
            title="Edit participant"
          />
        </div>
      </div>
      <DefaultSeparator />
    </template>
  </div>
</template>