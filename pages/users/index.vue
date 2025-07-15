<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import DefaultButton from '~/components/common/DefaultButton.vue';
import InstructionParagraph from '~/components/common/InstructionParagraph.vue';
import LoadingContent from '~/components/common/LoadingContent.vue';
import TextInput from '~/components/common/TextInput.vue';
import UploadFile from '~/components/common/UploadFile.vue';
import UserTable from '~/components/user/UserTable.vue';
import { useUsersStore } from '~/store/users';
import type { User } from '~/types';
import { useToast } from '~/components/ui/toast/use-toast';
import usersApi from '~/api/users';
import AddAdmin from '~/components/user/AddAdmin.vue';

const search = ref('');
const usersStore = useUsersStore();
const users = ref<User[]>([]);
const isLoading = ref(true);
const { toast } = useToast();

// Filters
const activeFilters = ref({
  banned: null as boolean | null,
  verified: null as boolean | null
});

// Load users with optional filters
const loadUsers = async () => {
  try {
    isLoading.value = true;
    await usersStore.updateUsers(activeFilters.value);
    users.value = [...usersStore.users]; // Create a new array to trigger reactivity
  } catch (error) {
    console.error('Failed to load users:', error);
    toast({
      variant: 'destructive',
      title: 'Error',
      description: 'Failed to load users. Please try again.'
    });
  } finally {
    isLoading.value = false;
  }
};

// Initial load
onMounted(loadUsers);

// Apply search and filters
const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const matchesSearch = search.value === '' || 
      (user.name?.toLowerCase() || '').includes(search.value.toLowerCase()) ||
      (user.email?.toLowerCase() || '').includes(search.value.toLowerCase());
    
    return matchesSearch;
  });
});

// Handle filter changes
const handleFilterChange = (filters: { banned: boolean | null, verified: boolean | null }) => {
  activeFilters.value = { ...filters };
  loadUsers();
};

// Handle user actions
const handleBanUser = (userId: string) => {
  // The store will handle the API call and update the state
  // The UserTable component will emit an event that we can use for any side effects
  console.log('User ban status toggled:', userId);
};

const handleVerifyUser = ({ userId, isVerified }: { userId: string, isVerified: boolean }) => {
  // The store will handle the API call and update the state
  // The UserTable component will emit an event that we can use for any side effects
  console.log('User verification status toggled:', { userId, isVerified });
};

const handleAllowedEmailsUpload = async (file: File) => {
  try {
    isLoading.value = true;
    const response = await usersApi.uploadAllowedEmailsXls(file);
    
    toast({
      title: 'Emails uploaded successfully',
      description: response.message,
      variant: 'default',
    });
  } catch (error) {
    console.error('Failed to upload allowed emails:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="grid grid-cols-3 px-[36px] gap-[80px]">
    <div class="col-span-2">
      <div class="flex justify-between items-center mb-6">
        <h2>Users</h2>
        <div class="flex items-center gap-4">
          <TextInput
            v-model="search"
            class="w-64"
            placeholder="Search by name or email..."
          />
          <UploadFile
          accept=".xlsx,.xls"
          @upload="handleAllowedEmailsUpload"
          class="w-full"
        >
          Upload Allowed Emails (Excel)
        </UploadFile>
        <AddAdmin />
        </div>
      </div>

      <LoadingContent :is-loading="isLoading">
        <UserTable
          :users="filteredUsers"
          :show-filters="true"
          @ban="handleBanUser"
          @verify="handleVerifyUser"
          @filter-change="handleFilterChange"
        />
      </LoadingContent>
    </div>

    <InstructionParagraph class="col-span-1 mt-[54px]">
      <template #title>User Management Guide</template>
      <template #text>
        <div class="space-y-4">
          <div>
            <h4 class="font-medium text-gray-900">Filtering Users</h4>
            <p class="text-sm text-gray-600">
              Use the filters at the top of the user list to filter by verification status and ban status.
            </p>
          </div>
          <div>
            <h4 class="font-medium text-gray-900">User Actions</h4>
            <ul class="mt-2 space-y-2 text-sm text-gray-600 list-disc pl-5">
              <li><span class="font-medium">Verify/Unverify:</span> Toggle user verification status</li>
              <li><span class="font-medium">Ban/Unban:</span> Restrict or allow user access</li>
              <li><span class="font-medium">Edit:</span> View and edit user details</li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium text-gray-900">Allowed Emails</h4>
            <p class="mt-2 text-sm text-gray-600">
              The Excel file upload creates a database with encoded alumni emails in the backend. 
              When a new user signs up, their email is encoded and checked against this database. 
              If there's a match, the user is verified as a graduate. If not, they're marked as a non-graduate.
            </p>
          </div>
        </div>
      </template>
    </InstructionParagraph>
  </div>
</template>
