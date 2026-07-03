<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import eventsApi from "~/api/events";
import usersApi from "~/api/users";
import LoadingContent from "~/components/common/LoadingContent.vue";
import type { EventListItem, UserListItem } from "~/types";

type DashboardMetric = {
    label: string;
    value: number | string;
    tone: "green" | "pink" | "gray" | "blue";
};

const isLoading = ref(true);
const unverifiedUsers = ref<UserListItem[]>([]);
const bannedUsers = ref<UserListItem[]>([]);
const events = ref<EventListItem[]>([]);

const pendingEvents = computed(() =>
    events.value
        .filter((event) => event.approved === null)
        .sort(
            (a, b) =>
                new Date(a.datetime).getTime() - new Date(b.datetime).getTime(),
        ),
);

const upcomingApprovedEvents = computed(() => {
    const now = Date.now();
    return events.value
        .filter(
            (event) =>
                event.approved === true &&
                new Date(event.datetime).getTime() >= now,
        )
        .sort(
            (a, b) =>
                new Date(a.datetime).getTime() - new Date(b.datetime).getTime(),
        );
});

const metrics = computed<DashboardMetric[]>(() => [
    {
        label: "Pending users",
        value: unverifiedUsers.value.length,
        tone: "pink",
    },
    {
        label: "Pending events",
        value: pendingEvents.value.length,
        tone: "blue",
    },
    {
        label: "Upcoming events",
        value: upcomingApprovedEvents.value.length,
        tone: "green",
    },
    {
        label: "Banned users",
        value: bannedUsers.value.length,
        tone: "gray",
    },
]);

const toneClasses: Record<DashboardMetric["tone"], string> = {
    green: "border-brandgreen text-brandgreen bg-green-50",
    pink: "border-darkpink text-darkpink bg-pink-50",
    gray: "border-bluegray text-darkgray bg-lightgray",
    blue: "border-bluegray text-bluegray bg-slate-50",
};

const formatDate = (value: Date | string) =>
    new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(value));

const loadDashboard = async () => {
    try {
        isLoading.value = true;
        const [unverifiedPage, bannedPage, eventsPage] = await Promise.all([
            usersApi.listUsers({ verified: false, banned: false, limit: 12 }),
            usersApi.listUsers({ banned: true, limit: 12 }),
            eventsApi.listEvents({ limit: 50 }),
        ]);

        unverifiedUsers.value = unverifiedPage.items;
        bannedUsers.value = bannedPage.items;
        events.value = eventsPage.items;
    } finally {
        isLoading.value = false;
    }
};

onMounted(loadDashboard);
</script>

<template>
  <main class="px-[36px]">
    <div
      class="mb-[28px] flex flex-wrap items-end justify-between gap-[16px]"
    >
      <div>
        <h2>Dashboard</h2>
        <p class="mt-[6px] text-sm text-gray-500">
          {{
            new Intl.DateTimeFormat("en-US", {
              dateStyle: "medium",
            }).format(new Date())
          }}
        </p>
      </div>
      <button
        class="rounded-[4px] border border-bluegray px-[14px] py-[10px] text-sm font-medium text-darkgray transition-colors hover:border-brandgreen hover:text-brandgreen"
        @click="loadDashboard"
      >
        Refresh
      </button>
    </div>

    <LoadingContent :is-loading="isLoading">
      <section class="grid gap-[16px] md:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="metric in metrics"
          :key="metric.label"
          class="rounded-[6px] border bg-white p-[18px]"
          :class="toneClasses[metric.tone]"
        >
          <p class="text-sm font-medium">
            {{ metric.label }}
          </p>
          <p class="mt-[10px] text-3xl font-semibold text-darkgray">
            {{ metric.value }}
          </p>
        </div>
      </section>

      <section class="mt-[28px] grid gap-[28px] xl:grid-cols-2">
        <div class="rounded-[6px] border border-gray-200 bg-white">
          <div
            class="flex items-center justify-between border-b border-gray-200 px-[18px] py-[14px]"
          >
            <h3 class="text-lg font-semibold">
              Verification queue
            </h3>
            <NuxtLink
              to="/users"
              class="text-sm font-medium text-brandgreen hover:underline"
            >
              Users
            </NuxtLink>
          </div>
          <div class="divide-y divide-gray-100">
            <NuxtLink
              v-for="user in unverifiedUsers.slice(0, 6)"
              :key="user.id"
              :to="`/users/${user.id}`"
              class="grid grid-cols-[1fr_auto] gap-[12px] px-[18px] py-[14px] transition-colors hover:bg-gray-50"
            >
              <div class="min-w-0">
                <p class="truncate font-medium text-darkgray">
                  {{ user.first_name }} {{ user.last_name }}
                </p>
                <p class="truncate text-sm text-gray-500">
                  {{ user.email }}
                </p>
              </div>
              <span
                class="self-center rounded-[4px] bg-pink-50 px-[8px] py-[4px] text-xs font-medium text-darkpink"
              >
                Pending
              </span>
            </NuxtLink>
            <div
              v-if="unverifiedUsers.length === 0"
              class="px-[18px] py-[28px] text-center text-sm text-gray-500"
            >
              No pending users
            </div>
          </div>
        </div>

        <div class="rounded-[6px] border border-gray-200 bg-white">
          <div
            class="flex items-center justify-between border-b border-gray-200 px-[18px] py-[14px]"
          >
            <h3 class="text-lg font-semibold">
              Event queue
            </h3>
            <NuxtLink
              to="/events"
              class="text-sm font-medium text-brandgreen hover:underline"
            >
              Events
            </NuxtLink>
          </div>
          <div class="divide-y divide-gray-100">
            <NuxtLink
              v-for="event in pendingEvents.slice(0, 6)"
              :key="event.id"
              :to="`/events/${event.id}`"
              class="grid grid-cols-[1fr_auto] gap-[12px] px-[18px] py-[14px] transition-colors hover:bg-gray-50"
            >
              <div class="min-w-0">
                <p class="truncate font-medium text-darkgray">
                  {{ event.title }}
                </p>
                <p class="truncate text-sm text-gray-500">
                  {{ formatDate(event.datetime) }} ·
                  {{
                    event.location ||
                      (event.is_online ? "Online" : "N/A")
                  }}
                </p>
              </div>
              <span
                class="self-center rounded-[4px] bg-slate-50 px-[8px] py-[4px] text-xs font-medium text-bluegray"
              >
                Review
              </span>
            </NuxtLink>
            <div
              v-if="pendingEvents.length === 0"
              class="px-[18px] py-[28px] text-center text-sm text-gray-500"
            >
              No pending events
            </div>
          </div>
        </div>
      </section>
    </LoadingContent>
  </main>
</template>
