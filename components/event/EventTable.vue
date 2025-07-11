<script setup lang="ts">
import Approve from '@/assets/icons/misc/button__approve.svg'
import Reject from '@/assets/icons/misc/button__reject.svg'
import Edit from '@/assets/icons/misc/button__edit.svg'
import type { Event } from '~/types';
import SmallIcon from '../common/SmallIcon.vue';
import DefaultIcon from '../common/DefaultIcon.vue';
import DefaultSeparator from '../common/DefaultSeparator.vue';

defineProps<{
  events: Event[]
}>()

const emit = defineEmits(['approve', 'reject'])

const edit = (id: string) => {
  navigateTo(`/events/${id}`)
}

const getStatusBadge = (event: Event) => {
  if (event.approved === true) return { text: 'Approved', class: 'bg-green-100 text-green-800' }
  if (event.approved === false) return { text: 'Rejected', class: 'bg-red-100 text-red-800' }
  return { text: 'Pending', class: 'bg-yellow-100 text-yellow-800' }
}
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-gray-200">
    <!-- Table Header -->
    <div class="grid grid-cols-12 bg-gray-50 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      <div class="col-span-4">Event</div>
      <div class="col-span-2">Location</div>
      <div class="col-span-3">Date & Time</div>
      <div class="col-span-2">Status</div>
      <div class="col-span-1 text-right">Actions</div>
    </div>

    <!-- Table Rows -->
    <div class="divide-y divide-gray-200">
      <div v-for="event in events" :key="event.id" class="bg-white">
        <div class="grid grid-cols-12 items-center px-4 py-4 hover:bg-gray-50">
          <!-- Event Info -->
          <div class="col-span-4 flex items-center space-x-3">
            <img 
              :src="`data:image/jpeg;base64,${event.cover}`" 
              class="h-10 w-10 flex-shrink-0 rounded-full"
              :alt="event.title"
            />
            <span class="text-sm font-medium text-gray-900">
              {{ event.title }}
            </span>
          </div>
          
          <!-- Location -->
          <div class="col-span-2 text-sm text-gray-500">
            {{ event.location ? event.location : event.is_online ? 'Online' : 'N/A' }}
          </div>
          
          <!-- Date & Time -->
          <div class="col-span-3 text-sm text-gray-500">
            {{ new Intl.DateTimeFormat('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: '2-digit', 
              hour: '2-digit', 
              minute: '2-digit' 
            }).format(new Date(event.datetime)) }}
          </div>
          
          <!-- Status Badge -->
          <div class="col-span-2">
            <span 
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              :class="getStatusBadge(event).class"
            >
              {{ getStatusBadge(event).text }}
            </span>
          </div>
          
          <!-- Actions -->
          <div class="col-span-1 flex justify-end space-x-2">
            <button 
              type="button" 
              class="text-gray-400 hover:text-gray-500"
              @click="edit(event.id)"
            >
              <SmallIcon :src="Edit" />
            </button>
            
            <template v-if="event.approved === null">
              <button 
                type="button" 
                class="text-green-400 hover:text-green-500"
                @click="emit('approve', event.id)"
              >
                <SmallIcon :src="Approve" />
              </button>
              <button 
                type="button" 
                class="text-red-400 hover:text-red-500"
                @click="emit('reject', event.id)"
              >
                <SmallIcon :src="Reject" />
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-if="events.length === 0" class="px-4 py-12 text-center">
      <p class="text-sm text-gray-500">No events found</p>
    </div>
  </div>
</template>