<script setup lang="ts">
import DefaultButton from "~/components/common/DefaultButton.vue";
import EntityHeader from "~/components/common/EntityHeader.vue";
import EntityParagraph from "~/components/common/EntityParagraph.vue";
import LoadingContent from "~/components/common/LoadingContent.vue";
import EventTable from "~/components/event/EventTable.vue";
import UserActivities from "~/components/user/UserActivities.vue";
import UserStickers from "~/components/user/UserStickers.vue";
import { useUsersStore } from "~/store/users";
import type { UserProfile } from "~/types";

const route = useRoute();
const usersStore = useUsersStore();

const user = ref<UserProfile>();
const isLoading = ref(true);
const isVerifying = ref(false);

onMounted(async () => {
    user.value = await usersStore.getUserById(route.params.id as string);
    isLoading.value = false;
});

const ban = async () => {
    if (user.value) {
        await usersStore.changeUserBanStatus(user.value.id);
    }
};

const formatGraduationYear = (year: string) => {
    return `Class of ${year}`;
};

const openTelegram = (username: string) => {
    window.open(`https://t.me/${username}`, "_blank");
};
</script>

<template>
    <LoadingContent :is-loading="isLoading">
        <div
            v-if="user"
            class="px-[36px] grid grid-cols-3 gap-x-[36px] gap-y-[54px]"
        >
            <div class="col-span-2">
                <EntityHeader
                    :logo="
                        user.avatar
                            ? `data:image/jpeg;base64,${user.avatar}`
                            : ''
                    "
                    :title="`${user.first_name} ${user.last_name}`"
                    :subtitle="
                        user.telegram_alias ? `@${user.telegram_alias}` : ''
                    "
                >
                    <template #title>
                        {{ user.first_name }} {{ user.last_name }}
                    </template>
                    <template #subtitle>
                        <div class="mt-1 space-y-1">
                            <p class="text-sm text-gray-600">
                                {{ formatGraduationYear(user.graduation_year) }}
                            </p>
                            <p
                                v-if="user.show_location && user.location"
                                class="text-sm text-gray-600"
                            >
                                {{ user.location }}
                            </p>
                            <p
                                v-if="user.telegram_alias"
                                class="text-sm text-blue-600 cursor-pointer hover:underline flex items-center"
                                @click="openTelegram(user.telegram_alias)"
                            >
                                <svg
                                    class="w-4 h-4 mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.72-.41.96-.67.98-.57.05-.96-.35-1.48-.69-.82-.45-1.28-.74-2.07-1.19-.92-.5-.13-.77.08-1.23.08-.18 1.18-1.14 1.2-1.24.02-.06.01-.12-.02-.17-.03-.06-.08-.08-.16-.05-.09.03-1.5.92-2.79 1.7-.27.17-.51.24-.73.24-.23 0-.35-.07-.5-.23-.17-.2-.65-.75-.99-1.23-.8-1.1-1.35-1.99-1.34-1.96.03-.06.09-.08.14-.06.06.01.29.04.4.03.13-.01.29-.2.38-.35.09-.15.32-.53.44-.73.12-.2.23-.22.39-.22h.47c.17 0 .25.03.32.1.07.07.06.13.1.25.12.5.4 1.74.43 1.86.03.12.06.14.11.13.1-.02.27-.15.38-.27.1-.12.18-.23.22-.3.06-.1.12-.09.2-.05.09.03.56.92 1.77 1.71.2.13.28.2.31.32.03.12-.01.18-.1.28-.09.1-.2.22-.29.3-.19.18-.38.37-.12.7.26.33 1.06 1.14 1.55 1.55.42.35.76.53 1.03.68.14.08.25.14.34.22.15.12.1.23.07.27-.06.06-.22.19-.43.3-.35.2-.7.38-1.09.52-.31.12-.59.2-.87.2-.2 0-.4-.02-.6-.06-.5-.08-1.2-.34-1.75-.56-.72-.29-1.29-.47-1.24-.99.03-.3.36-.42.98-.64z"
                                    ></path>
                                </svg>
                                @{{ user.telegram_alias }}
                            </p>
                        </div>
                    </template>
                    <template #buttons>
                        <div class="flex flex-wrap gap-2">
                            <DefaultButton
                                v-if="!usersStore.isUserBanned(user.id)"
                                type="error"
                                size="small"
                                @click="ban"
                            >
                                Ban User
                            </DefaultButton>
                            <DefaultButton
                                v-else
                                type="inactive"
                                size="small"
                                @click="ban"
                            >
                                Unban User
                            </DefaultButton>
                        </div>
                    </template>
                </EntityHeader>
            </div>

            <div class="col-span-1" />

            <!-- Biography Section -->
            <EntityParagraph class="col-span-2">
                <template #title> Biography </template>
                <template #text>
                    <div class="prose max-w-none">
                        {{ user.biography || "No biography provided." }}
                    </div>
                </template>
            </EntityParagraph>

            <!-- Location (if shown) -->
            <EntityParagraph
                v-if="user.show_location && user.location"
                class="col-span-1"
            >
                <template #title> Location </template>
                <template #text>
                    <p class="text-gray-700">{{ user.location }}</p>
                </template>
            </EntityParagraph>

            <!-- User Stickers -->
            <UserStickers class="col-span-1" :stickers="[]" />

            <!-- Events Section -->
            <EntityParagraph class="col-span-2">
                <template #title> Events </template>
                <template #text>
                    <div
                        class="rounded-lg border border-gray-200 p-4 text-center"
                    >
                        <p class="text-gray-500">
                            User's events will be displayed here
                        </p>
                    </div>
                </template>
            </EntityParagraph>

            <!-- Activity Section -->
            <EntityParagraph class="col-span-1">
                <template #title> Activity </template>
                <template #text>
                    <div
                        class="rounded-lg border border-gray-200 p-4 text-center"
                    >
                        <p class="text-gray-500">
                            User activity will be displayed here
                        </p>
                    </div>
                </template>
            </EntityParagraph>
        </div>
    </LoadingContent>
</template>
