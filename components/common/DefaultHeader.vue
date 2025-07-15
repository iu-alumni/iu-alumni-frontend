<script setup lang="ts">
import LogoSmall from '@/assets/icons/logo__small.svg'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/solid'

const { $auth } = useNuxtApp();
const route = useRoute()

const links = [
  {
    label: 'Users',
    link: '/users',
  },
  {
    label: 'Events',
    link: '/events',
  },
]

const logout = () => {
  $auth.logout()
  navigateTo('/')
}
</script>

<template>
  <header class="px-[36px] py-[16px] bg-bluegray bg-opacity-20 mb-[30px]">
    <div class="flex flex-row justify-between items-center">
      <img :src="LogoSmall" alt="Logo" class="max-h-[28px]" />
      <ul class="flex flex-row items-center gap-[24px] -mr-[12px]">
        <NuxtLink
          v-for="link in links" 
          :key="link.link" 
          :to="link.link" 
          class="py-[6px] px-[12px] cursor-pointer bg-opacity-20 hover:text-brandgreen rounded-[4px] duration-100 transition-all" 
          :class="{'bg-brandgreen text-brandgreen': route.fullPath.includes(link.link)}"
        >
          <h5>
            {{ link.label }}
          </h5>
        </NuxtLink>
        <button
          class="py-[6px] px-[12px] cursor-pointer bg-opacity-20 hover:text-red-500 rounded-[4px] duration-100 transition-all flex items-center gap-[6px]"
          @click="logout"
        >
        Logout
        <ArrowRightStartOnRectangleIcon class="h-[16px] w-[16px]" />
        </button>
      </ul>
    </div>
  </header>
</template>