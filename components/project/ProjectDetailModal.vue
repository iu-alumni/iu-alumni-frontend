<script setup lang="ts">
import DefaultButton from "~/components/common/DefaultButton.vue";
import type { ProjectListItem } from "~/types";

const props = defineProps<{
    project: ProjectListItem | null;
}>();

const emit = defineEmits(["close", "approve", "decline", "unapprove"]);

const formatDate = (iso: string) =>
    new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    }).format(new Date(iso));

const statusLabel = (approved: boolean | null) => {
    if (approved === true) return "Approved";
    if (approved === false) return "Declined";
    return "Pending review";
};
</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="project"
        class="fixed inset-0 z-40 bg-black/40"
        @click="emit('close')"
      />
    </transition>
    <transition name="slide">
      <aside
        v-if="project"
        class="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-xl"
      >
        <header class="flex items-start justify-between border-b border-gray-100 p-6">
          <div class="min-w-0">
            <p class="text-xs uppercase tracking-wider text-gray-400">
              {{ statusLabel(project.approved) }}
            </p>
            <h3 class="mt-1 truncate text-lg font-semibold text-gray-900">
              {{ project.title }}
            </h3>
          </div>
          <button
            type="button"
            class="ml-4 text-gray-400 hover:text-gray-600"
            @click="emit('close')"
          >
            ✕
          </button>
        </header>

        <div class="flex-1 overflow-y-auto p-6 space-y-6">
          <img
            v-if="project.cover"
            :src="`data:image/jpeg;base64,${project.cover}`"
            :alt="project.title"
            class="w-full rounded-lg object-cover"
            style="max-height: 220px;"
          >

          <div>
            <p class="text-xs uppercase tracking-wider text-gray-400 mb-1">
              Description
            </p>
            <p class="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
              {{ project.description }}
            </p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-xs uppercase tracking-wider text-gray-400 mb-1">
                Contributors
              </p>
              <p class="text-sm text-gray-900">
                {{ project.contributors_ids.length }}
              </p>
            </div>
            <div>
              <p class="text-xs uppercase tracking-wider text-gray-400 mb-1">
                Created
              </p>
              <p class="text-sm text-gray-900">
                {{ formatDate(project.created_at) }}
              </p>
            </div>
          </div>

          <div v-if="project.donation_link">
            <p class="text-xs uppercase tracking-wider text-gray-400 mb-1">
              Donation link
            </p>
            <a
              :href="project.donation_link"
              target="_blank"
              rel="noopener noreferrer"
              class="break-all text-sm text-blue-600 hover:underline"
            >
              {{ project.donation_link }}
            </a>
          </div>

          <div>
            <p class="text-xs uppercase tracking-wider text-gray-400 mb-1">
              Owner ID
            </p>
            <p class="break-all text-xs text-gray-600 font-mono">
              {{ project.owner_id }}
            </p>
          </div>
        </div>

        <footer class="border-t border-gray-100 p-4 flex flex-wrap gap-2 justify-end">
          <template v-if="project.approved === null">
            <DefaultButton
              type="inactive"
              size="small"
              @click="emit('decline', project.id)"
            >
              Decline
            </DefaultButton>
            <DefaultButton
              size="small"
              @click="emit('approve', project.id)"
            >
              Approve
            </DefaultButton>
          </template>
          <template v-else-if="project.approved === true">
            <DefaultButton
              type="inactive"
              size="small"
              @click="emit('unapprove', project.id)"
            >
              Send back to review
            </DefaultButton>
            <DefaultButton
              type="error"
              size="small"
              @click="emit('decline', project.id)"
            >
              Decline
            </DefaultButton>
          </template>
          <template v-else>
            <DefaultButton
              type="inactive"
              size="small"
              @click="emit('unapprove', project.id)"
            >
              Reopen for review
            </DefaultButton>
            <DefaultButton
              size="small"
              @click="emit('approve', project.id)"
            >
              Approve
            </DefaultButton>
          </template>
        </footer>
      </aside>
    </transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}
</style>
