<script setup lang="ts">
import { uploadAlumniXls } from "~/api/auth";
import DefaultButton from "~/components/common/DefaultButton.vue";
import InstructionParagraph from "~/components/common/InstructionParagraph.vue";
import LoadingContent from "~/components/common/LoadingContent.vue";
import TextInput from "~/components/common/TextInput.vue";
import UploadFile from "~/components/common/UploadFile.vue";
import UserTable from "~/components/user/UserTable.vue";
import { useUsersStore } from "~/store/users";
import type { User } from "~/types";

const search = ref("");

const usersStore = useUsersStore();

const users = ref([] as User[]);

const isLoading = ref(true);

onMounted(() => {
    usersStore.updateUsers().then(() => {
        users.value = usersStore.users;
        isLoading.value = false;
    });
});

const searchedUsers = computed(() =>
    users.value.filter((user) =>
        (user.name.toLowerCase() + user.email.toLowerCase()).includes(
            search.value.toLowerCase(),
        ),
    ),
);

const banUser = (userId: string) => {
    usersStore.changeUserBanStatus(userId);
};

const handleXlsUpload = async (file: File) => {
    await uploadAlumniXls(file);
    isLoading.value = true;

    usersStore.updateUsers().then(() => {
        isLoading.value = false;
        users.value = usersStore.users;
    });
};
</script>

<template>
    <div class="grid grid-cols-3 px-[36px] gap-[80px]">
        <div class="col-span-2">
            <h4 class="mb-[4px]">Manage users' access</h4>
            <div class="flex justify-between gap-[24px]">
                <h2>Users</h2>

                <div class="flex gap-[24px]">
                    <TextInput
                        v-model="search"
                        class="max-w-[244px]"
                        placeholder="Search..."
                    />
                    <DefaultButton size="small"> Add Alumni </DefaultButton>
                    <UploadFile :onUpload="handleXlsUpload">
                        Import from XLS
                    </UploadFile>
                </div>
            </div>

            <LoadingContent :is-loading="isLoading">
                <UserTable
                    class="mt-[36px]"
                    :users="searchedUsers"
                    @ban="banUser"
                />
            </LoadingContent>
        </div>

        <InstructionParagraph class="col-span-1 mt-[54px]">
            <template #title> How to manage? </template>
            <template #text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                aliquam tortor ipsum, sed vestibulum mauris sodales nec.
                Maecenas convallis id ipsum quis feugiat. Cras tincidunt tellus
                non libero luctus lacinia. Donec vestibulum ullamcorper posuere.
                Ut vitae ultricies augue. Sed quis tristique massa, ut cursus
                felis. Mauris sit amet leo sit amet sapien tempor commodo in
                vitae ex. Nam euismod ipsum at neque dapibus imperdiet.
                Phasellus a malesuada quam, sit amet facilisis erat. Aliquam at
                sem odio. Quisque volutpat hendrerit feugiat. Vestibulum non
                urna condimentum, ultricies nisl vel, auctor velit. Etiam at
                laoreet erat.
            </template>
        </InstructionParagraph>
    </div>
</template>
