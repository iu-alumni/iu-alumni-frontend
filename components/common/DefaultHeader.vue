<script setup lang="ts">
import LogoSmall from '@/assets/icons/logo__small.svg'

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
      </ul>
    </div>
  </header>
</template>