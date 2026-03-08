<script setup lang="ts">
import DefaultButton from "~/components/common/DefaultButton.vue";
import InstructionParagraph from "~/components/common/InstructionParagraph.vue";
import LoadingContent from "~/components/common/LoadingContent.vue";
import TextInput from "~/components/common/TextInput.vue";
import EventTable from "~/components/event/EventTable.vue";
import { useEventsStore } from "~/store/events";
import { ref, computed, onMounted, watch } from "vue";

const eventsStore = useEventsStore();

const isLoading = ref(true);

onMounted(() => {
    eventsStore.updateEvents().then(() => {
        isLoading.value = false;
    });

    eventsStore.fetchApprovalSettings();
});

const search = ref("");

let searchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(search, (value) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        eventsStore.updateEvents({ search: value || undefined });
    }, 300);
});

const changeStatus = async (id: string, status: "approved" | "rejected") => {
    const event = eventsStore.getEventById(id);
    if (status === "approved") {
        await eventsStore.approveEvent(id).then(() => {
            event.approved = true;
        });
    } else if (status === "rejected") {
        await eventsStore.declineEvent(id).then(() => {
            event.approved = false;
        });
    }
};

const isVerificationEnabled = computed(
    () => eventsStore.approvalSettings?.auto_approve ?? false,
);

const toggleVerification = async () => {
    await eventsStore.toggleAutoApprove();
};

const loadMore = () => {
    eventsStore.loadMoreEvents({ search: search.value || undefined });
};
</script>

<template>
  <div class="grid grid-cols-3 px-[36px] gap-[80px]">
    <div class="col-span-2">
      <div class="flex justify-between gap-[24px]">
        <h2>Events</h2>

        <div class="flex gap-[24px]">
          <TextInput
            v-model="search"
            class="max-w-[244px]"
            placeholder="Search..."
          />
          <DefaultButton
            v-if="isVerificationEnabled"
            size="small"
            @click="toggleVerification"
          >
            Auto-approve&nbsp;(On)
          </DefaultButton>
          <DefaultButton
            v-else
            size="small"
            type="inactive"
            @click="toggleVerification"
          >
            Auto-approve&nbsp;(Off)
          </DefaultButton>
        </div>
      </div>

      <LoadingContent :is-loading="isLoading">
        <EventTable
          class="mt-[36px]"
          :events="eventsStore.events"
          @approve="(id) => changeStatus(id, 'approved')"
          @reject="(id) => changeStatus(id, 'rejected')"
        />
        <div
          v-if="eventsStore.nextCursor"
          class="mt-4 flex justify-center"
        >
          <DefaultButton
            size="small"
            type="inactive"
            @click="loadMore"
          >
            Load more
          </DefaultButton>
        </div>
      </LoadingContent>
    </div>

    <InstructionParagraph class="col-span-1 mt-[54px]">
      <template #title>
        Event Management Guide
      </template>
      <template #text>
        <div class="space-y-4">
          <div>
            <h4 class="font-medium text-gray-900">
              Filtering Events
            </h4>
            <p class="text-sm text-gray-600">
              Use the search bar at the top of the event list to
              filter by event name.
            </p>
          </div>
          <div>
            <h4 class="font-medium text-gray-900">
              Event Actions
            </h4>
            <ul
              class="mt-2 space-y-2 text-sm text-gray-600 list-disc pl-5"
            >
              <li>
                <span class="font-medium">Approve:</span>
                Approve an event to allow it to be seen by users
              </li>
              <li>
                <span class="font-medium">Reject:</span> Reject
                an event to hide it from users
              </li>
              <li>
                <span class="font-medium">Edit:</span> View and
                edit event details
              </li>
            </ul>
          </div>
        </div>
      </template>
    </InstructionParagraph>
  </div>
</template>
