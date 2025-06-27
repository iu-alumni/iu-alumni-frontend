<script setup lang="ts">
import Approve from '@/assets/icons/misc/button__approve.svg'
import Reject from '@/assets/icons/misc/button__reject.svg'
import Rereject from '@/assets/icons/misc/button__rereject.svg'
import Edit from '@/assets/icons/misc/button__edit.svg'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/solid'
import type { User } from '~/types';
import SmallIcon from '../common/SmallIcon.vue';
import DefaultIcon from '../common/DefaultIcon.vue';
import DefaultSeparator from '../common/DefaultSeparator.vue';
import { useUsersStore } from '~/store/users';

interface Props {
  users: User[]
  showFilters?: boolean
  onFilterChange?: (filters: { banned: boolean | null, verified: boolean | null }) => void
}

defineProps<Props>()

const usersStore = useUsersStore()

const emit = defineEmits(['ban', 'verify', 'filter-change'])

const edit = (id: string) => {
  navigateTo(`/users/${id}`)
}

const toggleVerification = async (userId: string, isVerified: boolean) => {
  try {
    await usersStore.changeUserVerificationStatus(userId)
    emit('verify', { userId, isVerified: !isVerified })
  } catch (error) {
    console.error('Failed to toggle verification:', error)
  }
}

const toggleBan = async (userId: string) => {
  try {
    await usersStore.changeUserBanStatus(userId)
    emit('ban', userId)
  } catch (error) {
    console.error('Failed to toggle ban status:', error)
  }
}

const filters = reactive({
  banned: null as boolean | null,
  verified: null as boolean | null
})

const handleFilterChange = (type: 'banned' | 'verified', value: boolean | null) => {
  filters[type] = value
  // Emit the filter-change event to the parent component
  emit('filter-change', { ...filters })
  
  // Also call the onFilterChange prop if provided (for backward compatibility)
  if (props.onFilterChange) {
    props.onFilterChange({ ...filters })
  }
}
</script>

<template>
  <div class="w-full">
    <div v-if="showFilters" class="flex gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium text-gray-700">Status:</label>
        <select 
          :value="filters.verified === null ? 'null' : String(filters.verified)"
          @change="handleFilterChange('verified', $event.target.value === 'null' ? null : $event.target.value === 'true')"
          class="rounded-md border-gray-300 shadow-sm"
        >
          <option value="null">All</option>
          <option value="true">Verified</option>
          <option value="false">Unverified</option>
        </select>
      </div>
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium text-gray-700">Ban Status:</label>
        <select 
          :value="filters.banned === null ? 'null' : String(filters.banned)"
          @change="handleFilterChange('banned', $event.target.value === 'null' ? null : $event.target.value === 'true')"
          class="rounded-md border-gray-300 shadow-sm"
        >
          <option value="null">All</option>
          <option value="true">Banned</option>
          <option value="false">Not Banned</option>
        </select>
      </div>
    </div>

    <div class="border rounded-lg overflow-hidden">
      <div class="grid grid-cols-12 bg-gray-50 p-4 font-medium text-gray-500">
        <div class="col-span-4">User</div>
        <div class="col-span-3">Email</div>
        <div class="col-span-2 text-center">Status</div>
        <div class="col-span-3 text-right">Actions</div>
      </div>
      
      <template v-for="user in users" :key="user.id">
        <div class="grid grid-cols-12 items-center p-4 hover:bg-gray-50 border-t">
          <div class="col-span-4 flex items-center gap-3">
            <DefaultIcon :src="user.avatar" class="w-10 h-10" />
            <span class="font-medium">{{ user.name }}</span>
          </div>
          <div class="col-span-3 text-gray-600">
            {{ user.email }}
          </div>
          <div class="col-span-2 flex justify-center">
            <div v-if="user.is_verified" class="flex items-center text-green-600">
              <CheckCircleIcon class="w-5 h-5 mr-1" />
              <span>Verified</span>
            </div>
            <div v-else class="flex items-center text-gray-500">
              <XCircleIcon class="w-5 h-5 mr-1" />
              <span>Unverified</span>
            </div>
          </div>
          <div class="col-span-3 flex justify-end gap-2">
            <button 
              @click="toggleVerification(user.id, user.is_verified)" 
              :class="[
                'px-3 py-1 rounded-md text-sm',
                user.is_verified 
                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              ]"
            >
              {{ user.is_verified ? 'Unverify' : 'Verify' }}
            </button>
            <button 
              @click="toggleBan(user.id)" 
              :class="[
                'px-3 py-1 rounded-md text-sm',
                usersStore.isUserBanned(user.id)
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              ]"
            >
              {{ usersStore.isUserBanned(user.id) ? 'Unban' : 'Ban' }}
            </button>
            <button 
              @click="edit(user.id)" 
              class="p-1 text-gray-500 hover:text-gray-700"
              title="Edit user"
            >
              <img :src="Edit" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
select {
  @apply border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm;
}
</style>