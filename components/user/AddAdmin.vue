<script setup lang="ts">
import { ref } from 'vue';
import DefaultButton from '~/components/common/DefaultButton.vue';
import DefaultModal from '~/components/common/DefaultModal.vue';
import TextInput from '~/components/common/TextInput.vue';
import { addAdmin } from '~/api/auth';
import { useToast } from '~/components/ui/toast/use-toast';

const isModalOpen = ref(false);
const email = ref('');
const password = ref('');
const isSubmitting = ref(false);
const { toast } = useToast();

// Form validation
const emailError = ref('');
const passwordError = ref('');

const validateForm = () => {
  let isValid = true;
  
  // Email validation
  if (!email.value) {
    emailError.value = 'Email is required';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = 'Please enter a valid email address';
    isValid = false;
  } else {
    emailError.value = '';
  }
  
  // Password validation
  if (!password.value) {
    passwordError.value = 'Password is required';
    isValid = false;
  } else if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters';
    isValid = false;
  } else {
    passwordError.value = '';
  }
  
  return isValid;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  
  try {
    isSubmitting.value = true;
    await addAdmin(email.value, password.value);
    
    // Show success message
    toast({
      title: 'Success',
      description: 'Admin user has been added successfully',
      variant: 'default',
    });
    
    // Reset form and close modal
    email.value = '';
    password.value = '';
    isModalOpen.value = false;
  } catch (error) {
    console.error('Failed to add admin:', error);
    // Error handling is already done in the axios interceptor in auth.ts
  } finally {
    isSubmitting.value = false;
  }
};

const openModal = () => {
  isModalOpen.value = true;
};
</script>

<template>
  <DefaultModal :is-opened="isModalOpen" @open="openModal">
    <template #button>
      Add Admin
    </template>
    
    <template #content>
      <div class="w-full">
        <h3 class="text-xl font-semibold mb-4">Add New Admin</h3>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block mb-1 text-sm font-medium">Email</label>
            <TextInput
              v-model="email"
              placeholder="Enter admin email"
              :is-error="!!emailError"
              :error-message="emailError"
            />
          </div>
          
          <div>
            <label class="block mb-1 text-sm font-medium">Password</label>
            <TextInput
              v-model="password"
              placeholder="Enter admin password"
              :is-password="true"
              :is-error="!!passwordError"
              :error-message="passwordError"
            />
          </div>
          
          <div class="flex justify-end space-x-3 mt-6">
            <DefaultButton 
              type="inactive" 
              size="small"
              @click="isModalOpen = false"
            >
              Cancel
            </DefaultButton>
            
            <DefaultButton 
              type="active" 
              size="small"
              @click="handleSubmit"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Adding...' : 'Add Admin' }}
            </DefaultButton>
          </div>
        </form>
      </div>
    </template>
  </DefaultModal>
</template>
