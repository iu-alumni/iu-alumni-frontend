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
</script>

<template>
  <div>
    <DefaultSeparator />
    <template v-for="event in events" :key="event.id">
      <div class="flex justify-between items-center w-full gap-[24px] py-[12px]">
        <div class="flex items-center gap-[24px]">
          <DefaultIcon :src="event.img" with-shadow />
          <span class="paragraph">
            {{ event.title }}
          </span>
          <span class="button-text">
            {{ event.location }}
          </span>
          <span class="button-text">
            {{ event.date }}
          </span>
        </div>

        <div class="flex items-center gap-[24px]">
          <template v-if="event.status === 'approved'">
            <SmallIcon :src="Edit" @click="edit(event.id)" />
            <SmallIcon :src="Approve"/>
          </template>

          <template v-else-if="event.status === 'pending'">
            <SmallIcon :src="Edit" @click="edit(event.id)" />
            <SmallIcon :src="Approve" @click="emit('approve', event.id)"/>
            <SmallIcon :src="Reject" @click="emit('reject', event.id)"/>
          </template>

          <template v-else-if="event.status === 'rejected'">
            <SmallIcon :src="Edit" @click="edit(event.id)" />
            <SmallIcon :src="Reject"/>
          </template>
        </div>
      </div>
      <DefaultSeparator />
    </template>
  </div>
</template>