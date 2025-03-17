<script setup lang="ts">
import Approve from '@/assets/icons/misc/button__approve.svg'
import Reject from '@/assets/icons/misc/button__reject.svg'
import Edit from '@/assets/icons/misc/button__edit.svg'
import type { User } from '~/types';
import SmallIcon from '../common/SmallIcon.vue';
import DefaultIcon from '../common/DefaultIcon.vue';
import DefaultSeparator from '../common/DefaultSeparator.vue';

defineProps<{
  users: User[]
}>()

const ban = (id: string) => {
  return
}

const edit = (id: string) => {
  navigateTo(`/users/${id}`)
}
</script>

<template>
  <div>
    <DefaultSeparator />
    <template v-for="user in users" :key="user.id">
      <div class="flex justify-between items-center w-full gap-[24px] py-[12px]">
        <div class="flex items-center gap-[24px]">
          <DefaultIcon :src="user.avatar" />
          <span class="paragraph">
            {{ user.name }}
          </span>
          <span class="button-text">
            {{ user.email }}
          </span>
        </div>

        <div class="flex items-center gap-[24px]">
          <template v-if="user.isRegistered">
            <SmallIcon :src="Edit" @click="edit(user.id)" />
            <SmallIcon :src="Reject" @click="ban(user.id)" />
          </template>

          <template v-else>
            <SmallIcon :src="Approve" />
          </template>
        </div>
      </div>
      <DefaultSeparator />
    </template>
  </div>
</template>