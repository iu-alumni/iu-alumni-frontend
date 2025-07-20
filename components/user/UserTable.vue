<script setup lang="ts">
import Edit from "@/assets/icons/misc/button__edit.svg";
import {
    CheckCircleIcon,
    XCircleIcon,
    UserCircleIcon,
} from "@heroicons/vue/24/solid";
import { UserCircleIcon as OutlineUserCircleIcon } from "@heroicons/vue/24/outline";
import type { User } from "~/types";
import { useUsersStore } from "~/store/users";
import { computed, reactive } from "vue";

interface Props {
    users: User[];
    showFilters?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    showFilters: true,
});

const usersStore = useUsersStore();

const emit = defineEmits(["ban", "verify"]);

const filters = reactive({
    banned: null as boolean | null,
    verified: null as boolean | null,
});

const filteredUsers = computed(() => {
    return props.users.filter((user) => {
        // Filter by ban status
        const bannedMatch =
            filters.banned === null ||
            (filters.banned
                ? usersStore.isUserBanned(user.id)
                : !usersStore.isUserBanned(user.id));

        // Filter by verification status
        const verifiedMatch =
            filters.verified === null ||
            (filters.verified ? user.is_verified : !user.is_verified);

        return bannedMatch && verifiedMatch;
    });
});

const edit = (id: string) => {
    navigateTo(`/users/${id}`);
};

const toggleVerification = async (userId: string, isVerified: boolean) => {
    try {
        await usersStore.changeUserVerificationStatus(userId);
        emit("verify", { userId, isVerified: !isVerified });
    } catch (error) {
        console.error("Failed to toggle verification:", error);
    }
};

const toggleBan = async (userId: string) => {
    try {
        await usersStore.changeUserBanStatus(userId);
        emit("ban", userId);
    } catch (error) {
        console.error("Failed to toggle ban status:", error);
    }
};

const handleFilterChange = (
    type: "banned" | "verified",
    value: string | null,
) => {
    filters[type] = value === null ? null : value === "true";
};
</script>

<template>
    <div class="w-full">
        <!-- Filters -->
        <div
            v-if="showFilters"
            class="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-gray-50 rounded-lg"
        >
            <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <label class="text-sm font-medium text-gray-700 self-center"
                    >Status:</label
                >
                <select
                    :value="
                        filters.verified === null
                            ? 'null'
                            : String(filters.verified)
                    "
                    @change="
                        handleFilterChange(
                            'verified',
                            ($event.target as HTMLSelectElement).value ===
                                'null'
                                ? null
                                : ($event.target as HTMLSelectElement).value,
                        )
                    "
                    class="rounded-md border-gray-300 shadow-sm w-full sm:w-40"
                >
                    <option value="null">All</option>
                    <option value="true">Verified</option>
                    <option value="false">Unverified</option>
                </select>
            </div>
            <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <label class="text-sm font-medium text-gray-700 self-center"
                    >Ban Status:</label
                >
                <select
                    :value="
                        filters.banned === null
                            ? 'null'
                            : String(filters.banned)
                    "
                    @change="
                        handleFilterChange(
                            'banned',
                            ($event.target as HTMLSelectElement).value ===
                                'null'
                                ? null
                                : ($event.target as HTMLSelectElement).value,
                        )
                    "
                    class="rounded-md border-gray-300 shadow-sm w-full sm:w-40"
                >
                    <option value="null">All</option>
                    <option value="true">Banned</option>
                    <option value="false">Not Banned</option>
                </select>
            </div>
        </div>

        <!-- Table -->
        <div class="border rounded-lg overflow-hidden">
            <!-- Desktop Headers -->
            <div
                class="hidden md:grid grid-cols-12 bg-gray-50 p-4 font-medium text-gray-500"
            >
                <div class="col-span-4">User</div>
                <div class="col-span-3">Email</div>
                <div class="col-span-2 text-center">Status</div>
                <div class="col-span-3 text-right">Actions</div>
            </div>

            <!-- Rows -->
            <template v-for="user in filteredUsers" :key="user.id">
                <!-- Mobile Card -->
                <div class="md:hidden border-t p-4 hover:bg-gray-50">
                    <div class="flex items-start gap-3">
                        <img
                            v-if="user.avatar"
                            :src="`data:image/jpeg;base64,${user.avatar}`"
                            class="w-10 h-10 rounded-full object-cover"
                            alt="User avatar"
                        />
                        <UserCircleIcon
                            v-else
                            class="w-10 h-10 text-gray-400"
                        />
                        <div class="flex-1 min-w-0">
                            <div class="flex justify-between items-start">
                                <h4 class="font-medium text-gray-900 truncate">
                                    {{ user.name }}
                                </h4>
                                <div class="flex items-center gap-1">
                                    <button
                                        @click="
                                            toggleVerification(
                                                user.id,
                                                user.is_verified,
                                            )
                                        "
                                        class="p-1 text-sm rounded-md"
                                        :class="
                                            user.is_verified
                                                ? 'text-green-600'
                                                : 'text-gray-500'
                                        "
                                        :title="
                                            user.is_verified
                                                ? 'Verified'
                                                : 'Unverified'
                                        "
                                    >
                                        <CheckCircleIcon
                                            v-if="user.is_verified"
                                            class="w-5 h-5"
                                        />
                                        <XCircleIcon v-else class="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <p class="text-sm text-gray-600 truncate">
                                {{ user.email }}
                            </p>
                            <div class="mt-2 flex flex-wrap gap-2">
                                <button
                                    @click="
                                        toggleVerification(
                                            user.id,
                                            user.is_verified,
                                        )
                                    "
                                    class="px-2 py-1 text-xs rounded-md"
                                    :class="[
                                        user.is_verified
                                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200',
                                    ]"
                                >
                                    {{
                                        user.is_verified ? "Unverify" : "Verify"
                                    }}
                                </button>
                                <button
                                    @click="toggleBan(user.id)"
                                    class="px-2 py-1 text-xs rounded-md"
                                    :class="[
                                        usersStore.isUserBanned(user.id)
                                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                            : 'bg-red-100 text-red-700 hover:bg-red-200',
                                    ]"
                                >
                                    {{
                                        usersStore.isUserBanned(user.id)
                                            ? "Unban"
                                            : "Ban"
                                    }}
                                </button>
                                <button
                                    @click="edit(user.id)"
                                    class="p-1 text-gray-500 hover:text-gray-700"
                                    title="Open profile"
                                >
                                    <OutlineUserCircleIcon class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Desktop Row -->
                <div
                    class="hidden md:grid grid-cols-12 items-center p-4 hover:bg-gray-50 border-t"
                >
                    <div class="col-span-4 flex items-center gap-3">
                        <img
                            v-if="user.avatar"
                            :src="`data:image/jpeg;base64,${user.avatar}`"
                            class="w-10 h-10 rounded-full object-cover"
                            alt="User avatar"
                        />
                        <UserCircleIcon
                            v-else
                            class="w-10 h-10 text-gray-400"
                        />
                        <span class="font-medium truncate">{{
                            user.name
                        }}</span>
                    </div>
                    <div class="col-span-3 text-gray-600 truncate">
                        {{ user.email }}
                    </div>
                    <div class="col-span-2 flex justify-center">
                        <div
                            v-if="user.is_verified"
                            class="flex items-center text-green-600"
                        >
                            <CheckCircleIcon class="w-5 h-5 mr-1" />
                            <span>Verified</span>
                        </div>
                        <div v-else class="flex items-center text-gray-500">
                            <XCircleIcon class="w-5 h-5 mr-1" />
                            <span>Unverified</span>
                        </div>
                    </div>
                    <div class="col-span-3 flex justify-end gap-2">
                        <button
                            @click="
                                toggleVerification(user.id, user.is_verified)
                            "
                            :class="[
                                'px-3 py-1 rounded-md text-sm whitespace-nowrap',
                                user.is_verified
                                    ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200',
                            ]"
                        >
                            {{ user.is_verified ? "Unverify" : "Verify" }}
                        </button>
                        <button
                            @click="toggleBan(user.id)"
                            :class="[
                                'px-3 py-1 rounded-md text-sm whitespace-nowrap',
                                usersStore.isUserBanned(user.id)
                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                    : 'bg-red-100 text-red-700 hover:bg-red-200',
                            ]"
                        >
                            {{
                                usersStore.isUserBanned(user.id)
                                    ? "Unban"
                                    : "Ban"
                            }}
                        </button>
                        <button
                            @click="edit(user.id)"
                            class="p-1 text-gray-500 hover:text-gray-700"
                            title="Open profile"
                        >
                            <OutlineUserCircleIcon class="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </template>

            <!-- Empty State -->
            <div
                v-if="filteredUsers.length === 0"
                class="p-8 text-center text-gray-500"
            >
                No users found matching the current filters.
            </div>
        </div>
    </div>
</template>

<style scoped>
select {
    @apply border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm;
}
</style>
