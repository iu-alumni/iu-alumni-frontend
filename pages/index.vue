<script setup lang="ts">
import Logo from '@/assets/icons/logo.svg'
import DefaultButton from '~/components/common/DefaultButton.vue'
import TextInput from '~/components/common/TextInput.vue'

definePageMeta({
  layout: 'login',
})

const signIn = () => {
    navigateTo('/users')
}

const credentials = ref({
  email: '',
  password: '',
})
</script>

<template>
  <div class="w-full h-[100vh] bg-lightgray flex items-center justify-center">
    <div class="p-[72px] pb-[114px] max-w-[504px] w-full mx-[36px] max-h-[664px] bg-white flex flex-col items-center gap-[92px] base-shadow">
      <img :src="Logo" alt="Logo" class="max-w-[192px] self-center" />
      <div class="flex flex-col gap-[15px] w-full">
        <h3 class="mb-[5px]">Sign in</h3>
        <TextInput v-model="credentials.email" placeholder="E-mail" />
        <TextInput v-model="credentials.password" placeholder="Password" is-password />
        <DefaultButton @click="signIn">
          Continue
        </DefaultButton>
        <button class="button-text">
          Forgot password?
        </button>
      </div>
    </div>
  </div>
</template>
