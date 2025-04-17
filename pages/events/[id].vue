<script setup lang="ts">
import DefaultButton from '~/components/common/DefaultButton.vue';
import EntityHeader from '~/components/common/EntityHeader.vue';
import EntityParagraph from '~/components/common/EntityParagraph.vue';
import SmallIcon from '~/components/common/SmallIcon.vue';
import Edit from '@/assets/icons/misc/button__edit.svg'
import EventParticipants from '~/components/event/EventParticipants.vue';
import { useEventsStore } from '~/store/events';
import { testEvents } from '~/tests/data';
import type { Event } from '~/types';

const route = useRoute()

/*
const eventsStore = useEventsStore()

const event = ref()

onMounted(() => {
  eventsStore.updateEvents()
  event.value = eventsStore.getEventById(route.params.id as string)
})
*/

const event = ref(testEvents.find(testEvent => testEvent.id === route.params.id) as Event)

const editUser = (id: string) => {
  navigateTo(`/users/${id}`)
}

const approve = (id: string) => {
  event.value.status = 'approved'
}

const reject = (id: string) => {
  event.value.status = 'rejected'
}
</script>

<template>
  <div class="px-[36px] grid grid-cols-3 gap-x-[36px] gap-y-[54px]">
    <div class="col-span-2">
      <EntityHeader :logo="event.img" :title="event.name" :subtitle="event.user.name">
        <template #title>
          {{ event.name }}
        </template>
        <template #subittle>
          <div class="flex gap-[10px] items-center">
            <span>{{ event.user.name }}</span>
            <SmallIcon :src="Edit" @click="editUser(event.user.id)" />
          </div>
        </template>

        <template #buttons v-if="event.status === 'approved'">
          <DefaultButton size="small">
            Approved
          </DefaultButton>
        </template>
        <template #buttons v-else-if="event.status === 'rejected'">
          <DefaultButton type="error" size="small">
            Rejected
          </DefaultButton>
        </template>
        <template #buttons v-else-if="event.status === 'pending'">
          <DefaultButton size="small" @click="approve(event.id)">
            Approve
          </DefaultButton>
          <DefaultButton type="error" size="small" @click="reject(event.id)">
            Reject
          </DefaultButton>
        </template>
      </EntityHeader>
    </div>

    <div class="col-span-1" />

    <div class="col-span-2" >
      <div class="flex justify-between gap-[24px]">
        <h3>Time: <span class="text-bluegray">{{ event.date }}</span></h3>
        <h3>Location: <span class="text-bluegray">{{ event.location }}</span></h3>
      </div>

      <EntityParagraph class="mt-[18px]">
        <template #title>
          Description
        </template>
        <template #text>
          {{ event.descrption }}
        </template>
      </EntityParagraph>
    </div>

    <EntityParagraph class="mt-[0px]">
      <template #title>
        Participants
      </template>
      <template #text>
        <EventParticipants :users="event.participants" />
      </template>
    </EntityParagraph>
    
  </div>
</template>