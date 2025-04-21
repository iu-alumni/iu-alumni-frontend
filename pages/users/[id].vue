<script setup lang="ts">
import DefaultButton from '~/components/common/DefaultButton.vue';
import EntityHeader from '~/components/common/EntityHeader.vue';
import EntityParagraph from '~/components/common/EntityParagraph.vue';
import LoadingContent from '~/components/common/LoadingContent.vue';
import EventTable from '~/components/event/EventTable.vue';
import UserActivities from '~/components/user/UserActivities.vue';
import UserStickers from '~/components/user/UserStickers.vue';
import { useUsersStore } from '~/store/users';
const route = useRoute()

const usersStore = useUsersStore()

const user = ref()

const isLoading = ref(true)

onMounted(async () => {
  user.value = await usersStore.getUserById(route.params.id as string)
  console.log(user.value)
  isLoading.value = false
})

const ban = () => {
  usersStore.changeUserBanStatus(route.params.id as string)
}
</script>

<template>
  <LoadingContent :is-loading="isLoading">
    <div class="px-[36px] grid grid-cols-3 gap-x-[36px] gap-y-[54px]">
      <div class="col-span-2">
        <EntityHeader :logo="user.avatar">
          <template #title>
            {{ user.name }}
          </template>
          <template #subittle>
            {{ user.email }}
          </template>
          <template #buttons>
            <DefaultButton v-if="!usersStore.isUserBanned(user.id)" type="error" size="small" @click="ban">
              Ban
            </DefaultButton>
            <DefaultButton v-else type="inactive" size="small" @click="ban">
              Unban
            </DefaultButton>
          </template>
        </EntityHeader>
      </div>

      <div class="col-span-1" />

      <EntityParagraph class="col-span-2">
        <template #title>
          Biography
        </template>
        <template #text>
          {{ user.biography }}
        </template>
      </EntityParagraph>

      <UserStickers class="col-span-1" :stickers="user.stickers" />

      <EntityParagraph class="col-span-2">
        <template #title>
          Events
        </template>
        <template #text>
          <EventTable :events="user.events" />
        </template>
      </EntityParagraph>

      <EntityParagraph class="col-span-1">
        <template #title>
          Activity
        </template>
        <template #text>
          <UserActivities :activities="user.activities" />
        </template>
      </EntityParagraph>
    </div>
  </LoadingContent>
</template>