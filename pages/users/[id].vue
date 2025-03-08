<script setup lang="ts">
import DefaultButton from '~/components/common/DefaultButton.vue';
import EntityHeader from '~/components/common/EntityHeader.vue';
import EntityParagraph from '~/components/common/EntityParagraph.vue';
import EventTable from '~/components/event/EventTable.vue';
import UserActivities from '~/components/user/UserActivities.vue';
import UserStickers from '~/components/user/UserStickers.vue';
import { testUsers } from '~/tests/data';
import type { User } from '~/types';

const route = useRoute()

const user = ref(testUsers.find(user => user.id === route.params.id) as User)
</script>

<template>
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
          <DefaultButton type="error" size="small">
            Ban
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
</template>