<script setup lang="ts">
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/solid";
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
                        user.telegram_alias
                            ? `Telegram: @${user.telegram_alias}`
                            : ''
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
                                class="text-sm text-blue-600 cursor-pointer hover:underline flex gap-1 items-center"
                                @click="openTelegram(user.telegram_alias)"
                            >
                                @{{ user.telegram_alias }}
                                <ArrowTopRightOnSquareIcon class="w-4 h-4" />
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
