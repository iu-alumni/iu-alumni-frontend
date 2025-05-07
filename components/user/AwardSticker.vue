<script setup lang="ts">
import { resetErrorMessage } from '~/misc/validation';
import DefaultButton from '../common/DefaultButton.vue';
import DefaultModal from '../common/DefaultModal.vue';
import TextInput from '../common/TextInput.vue';
import UploadImage from '../common/UploadImage.vue';
import type { User } from '~/types';
import { useUsersStore } from '~/store/users';

const route = useRoute()

const usersStore = useUsersStore()

const user = usersStore.users.find(user => user.id === route.params.id) as User

const name = ref('')
const imageUri = ref(null)

const isOpened = ref(false)

const errorMessage = "Some fields are missing"
const isError = ref(false)

const award = () => {
  if (!name.value || !imageUri.value) {
    isError.value = true
  } else {
    user.stickers.push({
      id: user.stickers.length.toString(),
      label: name.value,
      img: imageUri.value
    })
    name.value = ''
    imageUri.value = null
    isOpened.value = false
  }
}

resetErrorMessage(name, isError)
</script>

<template>
  <DefaultModal :is-opened="isOpened" @open="isOpened = true">
    <template #button>
      Award
    </template>

    <template #content>
      <div class="flex flex-col items-center">
        <h4 class="mb-[16px]">
          Reward with a sticker
        </h4>

        <UploadImage @upload="uri => imageUri = uri" />

        <TextInput v-model="name" placeholder="Name" class="my-[16px]" :is-error="isError" :error-message="errorMessage" />

        <div class="flex justify-between gap-[24px]">
          <DefaultButton size="small" @click="award">
            Award
          </DefaultButton>
          <DefaultButton size="small" type="inactive" @click="isOpened = false">
            Close
          </DefaultButton>
        </div>
      </div>
    </template>
  </DefaultModal>
</template>