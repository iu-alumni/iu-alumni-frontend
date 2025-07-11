<script setup lang="ts">
import DefaultButton from '~/components/common/DefaultButton.vue';
import EntityHeader from '~/components/common/EntityHeader.vue';
import EntityParagraph from '~/components/common/EntityParagraph.vue';
import SmallIcon from '~/components/common/SmallIcon.vue';
import Edit from '@/assets/icons/misc/button__edit.svg'
import EventParticipants from '~/components/event/EventParticipants.vue';
import { useEventsStore } from '~/store/events';
import { useUsersStore } from '~/store/users';
import type { EventParticipant } from '~/types';

const route = useRoute()
const eventsStore = useEventsStore()
const usersStore = useUsersStore()

const event = ref()
const owner = ref()
const participants = ref<EventParticipant[]>([])
const isLoading = ref(true)

const formatDate = (dateString: string | Date) => {
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString))
}

onMounted(async () => {
  const eventId = route.params.id as string
  event.value = await eventsStore.getEventById(eventId)
  if (event.value) {
    const [participantsData, ownerData] = await Promise.all([
      eventsStore.listParticipants(eventId),
      usersStore.getUserById(event.value.owner_id)
    ])
    participants.value = participantsData
    owner.value = ownerData
  }
  isLoading.value = false
})

const editEvent = () => {
  // Implement edit functionality
  console.log('Edit event', event.value.id)
}

const approve = async (id: string) => {
  await eventsStore.approveEvent(id).then(() => {
    event.value.approved = true
  })
}

const reject = async (id: string) => {
  await eventsStore.declineEvent(id).then(() => {
    event.value.approved = false
  })
}
</script>

<template>
  <LoadingContent :is-loading="isLoading">
    <div v-if="event" class="px-[36px] grid grid-cols-3 gap-x-[36px] gap-y-[54px]">
      <div class="col-span-2">
        <EntityHeader 
          :logo="event.cover ? `data:image/jpeg;base64,${event.cover}` : ''" 
          :title="event.title" 
          :subtitle="owner?.first_name + ' ' + owner?.last_name"
        >
          <template #title>
            {{ event.title }}
            <SmallIcon 
              v-if="owner" 
              :src="Edit" 
              @click="editEvent" 
              class="ml-2"
            />
          </template>

          <template #buttons>
            <div v-if="event.approved" class="flex items-center gap-2">
              <span class="text-sm font-medium text-green-600">Event Approved</span>
            </div>
            <div v-else class="flex items-center gap-2">
              <span class="text-sm font-medium text-yellow-600">Pending Approval</span>
            </div>
          </template>
        </EntityHeader>
      </div>

      <div class="col-span-3 grid grid-cols-3 gap-6">
        <div class="col-span-2">
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-1">Date & Time</h4>
                <p class="text-gray-900">{{ formatDate(event.datetime) }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-1">Location</h4>
                <p class="text-gray-900">
                  {{ event.is_online ? 'Online Event' : event.location }}
                </p>
              </div>
              <div v-if="event.cost > 0">
                <h4 class="text-sm font-medium text-gray-500 mb-1">Cost</h4>
                <p class="text-gray-900">${{ event.cost.toFixed(2) }}</p>
              </div>
              <div v-if="event.participants_ids?.length > 0">
                <h4 class="text-sm font-medium text-gray-500 mb-1">Participants</h4>
                <p class="text-gray-900">{{ event.participants_ids.length }} registered</p>
              </div>
            </div>

            <EntityParagraph class="mt-6">
              <template #title>
                Description
              </template>
              <template #text>
                <div class="prose max-w-none">
                  {{ event.description || 'No description provided.' }}
                </div>
              </template>
            </EntityParagraph>
          </div>

          <EntityParagraph class="mt-6">
            <template #title>
              Participants ({{ participants.length }})
            </template>
            <template #text>
              <EventParticipants v-if="participants.length > 0" :users="participants" />
              <p v-else class="text-gray-500">No participants yet.</p>
            </template>
          </EntityParagraph>
        </div>

        <div class="space-y-6">
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <h3 class="font-medium text-lg mb-4">Event Organizer</h3>
            <div v-if="owner" class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                {{ owner.first_name[0] }}{{ owner.last_name[0] }}
              </div>
              <div>
                <p class="font-medium">{{ owner.first_name }} {{ owner.last_name }}</p>
                <p class="text-sm text-gray-500">Class of {{ owner.graduation_year }}</p>
              </div>
            </div>
            <p v-else class="text-gray-500">Organizer information not available</p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-sm">
            <h3 class="font-medium text-lg mb-4">Event Actions</h3>
            <div class="space-y-3">
              <DefaultButton 
                v-if="event.approved"
                type="error" 
                class="w-full justify-center"
                @click="reject(event.id)"
              >
                Cancel Event
              </DefaultButton>
              <DefaultButton 
                v-else
                class="w-full justify-center"
                @click="approve(event.id)"
              >
                Approve Event
              </DefaultButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </LoadingContent>
</template>