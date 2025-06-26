<script setup lang="ts">
import DefaultButton from '~/components/common/DefaultButton.vue';
import EntityHeader from '~/components/common/EntityHeader.vue';
import EntityParagraph from '~/components/common/EntityParagraph.vue';
import SmallIcon from '~/components/common/SmallIcon.vue';
import Edit from '@/assets/icons/misc/button__edit.svg'
import EventParticipants from '~/components/event/EventParticipants.vue';
import { useEventsStore } from '~/store/events';
import LoadingContent from '~/components/common/LoadingContent.vue';
import { useUsersStore } from '~/store/users';

const route = useRoute()

const eventsStore = useEventsStore()

const usersStore = useUsersStore()

const event = ref()

const isLoading = ref(true)

onMounted(async () => {
  await eventsStore.updateEvents()
  const eventId = route.params.id as string
  event.value = eventsStore.getEventById(eventId)
  const [participants, owner] = await Promise.all([eventsStore.listParticipants(eventId), usersStore.getUserById(event.value.owner_id)])
  event.value.participants = participants
  event.value.user = owner
  isLoading.value = false
})

const editUser = (id: string) => {
  navigateTo(`/users/${id}`)
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
    <div class="px-[36px] grid grid-cols-3 gap-x-[36px] gap-y-[54px]">
      <div class="col-span-2">
        <EntityHeader :logo="event.img" :title="event.title" :subtitle="event.user.name">
          <template #title>
            {{ event.title }}
          </template>
          <template #subittle>
            <div class="flex gap-[10px] items-center">
              <span>{{ event.user.name }}</span>
              <SmallIcon :src="Edit" @click="editUser(event.user.id)" />
            </div>
          </template>

          <template #buttons v-if="event.approved">
            <DefaultButton size="small">
              Approved
            </DefaultButton>
          </template>
          <template #buttons v-else-if="event.approved !== null">
            <DefaultButton type="error" size="small">
              Rejected
            </DefaultButton>
          </template>
          <template #buttons v-else>
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
        <div class="flex justify-between gap-[24px] mt-[12px]">
          <h4>Time: <span class="text-bluegray">{{ event.date }}</span></h4>
          <h4>Location: <span class="text-bluegray">{{ event.location }}</span></h4>
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
  </LoadingContent>
</template>