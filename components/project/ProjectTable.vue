<script setup lang="ts">
import Approve from "@/assets/icons/misc/button__approve.svg";
import Reject from "@/assets/icons/misc/button__reject.svg";
import type { ProjectListItem } from "~/types";
import SmallIcon from "../common/SmallIcon.vue";

defineProps<{
    projects: ProjectListItem[];
}>();

const emit = defineEmits(["approve", "reject", "open"]);

const getStatusBadge = (project: ProjectListItem) => {
    if (project.approved === true) return { text: "Approved", class: "bg-green-100 text-green-800" };
    if (project.approved === false) return { text: "Declined", class: "bg-red-100 text-red-800" };
    return { text: "Pending", class: "bg-yellow-100 text-yellow-800" };
};

const formatDate = (iso: string) =>
    new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    }).format(new Date(iso));
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-gray-200">
    <!-- Header -->
    <div
      class="grid grid-cols-12 bg-gray-50 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      <div class="col-span-5">
        Project
      </div>
      <div class="col-span-2">
        Contributors
      </div>
      <div class="col-span-2">
        Created
      </div>
      <div class="col-span-2">
        Status
      </div>
      <div class="col-span-1 text-right">
        Actions
      </div>
    </div>

    <!-- Rows -->
    <div class="divide-y divide-gray-200">
      <div
        v-for="project in projects"
        :key="project.id"
        class="cursor-pointer bg-white hover:bg-gray-50"
        @click="emit('open', project.id)"
      >
        <div class="grid grid-cols-12 items-center px-4 py-4">
          <!-- Cover + title -->
          <div class="col-span-5 flex items-center space-x-3">
            <img
              v-if="project.cover"
              :src="`data:image/jpeg;base64,${project.cover}`"
              class="h-10 w-10 flex-shrink-0 rounded-lg object-cover"
              :alt="project.title"
            >
            <div
              v-else
              class="h-10 w-10 flex-shrink-0 rounded-lg bg-gray-200"
            />
            <div class="min-w-0">
              <div class="truncate text-sm font-medium text-gray-900">
                {{ project.title }}
              </div>
              <div class="truncate text-xs text-gray-500">
                {{ project.description }}
              </div>
            </div>
          </div>

          <!-- Contributors -->
          <div class="col-span-2 text-sm text-gray-500 flex items-center gap-2">
            <span>{{ project.contributors_ids.length }}</span>
            <span
              v-if="project.donation_link"
              class="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700"
              title="Has donation link"
            >
              💳 Link
            </span>
          </div>

          <!-- Created -->
          <div class="col-span-2 text-sm text-gray-500">
            {{ formatDate(project.created_at) }}
          </div>

          <!-- Status -->
          <div class="col-span-2">
            <span
              class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
              :class="getStatusBadge(project).class"
            >
              {{ getStatusBadge(project).text }}
            </span>
          </div>

          <!-- Actions (only when pending) -->
          <div
            class="col-span-1 flex justify-end space-x-2"
            @click.stop
          >
            <template v-if="project.approved === null">
              <button
                type="button"
                class="text-green-400 hover:text-green-500"
                @click="emit('approve', project.id)"
              >
                <SmallIcon :src="Approve" />
              </button>
              <button
                type="button"
                class="text-red-400 hover:text-red-500"
                @click="emit('reject', project.id)"
              >
                <SmallIcon :src="Reject" />
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty -->
    <div
      v-if="projects.length === 0"
      class="px-4 py-12 text-center"
    >
      <p class="text-sm text-gray-500">
        No projects found
      </p>
    </div>
  </div>
</template>
