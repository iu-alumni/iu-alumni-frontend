<script setup lang="ts">
import { createRandomId } from '~/misc';
import Eye from '@/assets/icons/misc/eye.svg'
import EyeBlack from '@/assets/icons/misc/eye__black.svg'

defineProps<{
  modelValue: string | number,
  placeholder?: string,
  isError?: boolean,
  errorMessage?: string,
  isPassword?: boolean,
}>()

const emit = defineEmits(['update:modelValue'])

const isPasswordShown = ref(false)
</script>

<template>
  <div>
    <div class="relative">
      <input
        :value="modelValue"
        :type="isPassword && !isPasswordShown ? 'password' : 'text'"
        class="py-[16px] px-[20px] rounded-[4px] bg-lightgray paragraph placeholder:button-text outline-none w-full h-full"
        :class="(isPassword ? 'pr-[40px' : '')"
        :placeholder="placeholder"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <img
        v-if="isPassword" :src="isPasswordShown ? Eye : EyeBlack"
        class="absolute -translate-y-1/2 top-1/2 right-[20px] cursor-pointer"
        @click="isPasswordShown = !isPasswordShown"
      />
    </div>
    
    <label v-if="isError" class="text-[12px] text-lightpink">
      {{ errorMessage }}
    </label>
  </div>
</template>