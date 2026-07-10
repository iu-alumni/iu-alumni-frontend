<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import DefaultButton from "~/components/common/DefaultButton.vue";
import InstructionParagraph from "~/components/common/InstructionParagraph.vue";
import LoadingContent from "~/components/common/LoadingContent.vue";
import TextInput from "~/components/common/TextInput.vue";
import ProjectDetailModal from "~/components/project/ProjectDetailModal.vue";
import ProjectTable from "~/components/project/ProjectTable.vue";
import { useProjectsStore } from "~/store/projects";
import type { ProjectListItem, ProjectStatusFilter } from "~/types";

const projectsStore = useProjectsStore();

const isLoading = ref(true);
const search = ref(projectsStore.search);
const selectedId = ref<string | null>(null);

const filters: { label: string; value: ProjectStatusFilter }[] = [
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Declined", value: "declined" },
    { label: "All", value: "all" },
];

const activeFilter = computed(() => projectsStore.status);

onMounted(async () => {
    projectsStore.setStatus("pending");
    await projectsStore.fetchProjects();
    isLoading.value = false;
});

let searchTimeout: ReturnType<typeof setTimeout> | null = null;
watch(search, (value) => {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
        projectsStore.setSearch(value);
        await projectsStore.fetchProjects();
    }, 300);
});

const setFilter = async (status: ProjectStatusFilter) => {
    projectsStore.setStatus(status);
    isLoading.value = true;
    await projectsStore.fetchProjects();
    isLoading.value = false;
};

const selected = computed<ProjectListItem | null>(() => {
    if (!selectedId.value) return null;
    return (
        projectsStore.projects.find((p) => p.id === selectedId.value) ?? null
    );
});

const open = (id: string) => {
    selectedId.value = id;
};

const closeModal = () => {
    selectedId.value = null;
};

const approve = async (id: string) => {
    await projectsStore.approve(id);
    selectedId.value = null;
};
const decline = async (id: string) => {
    await projectsStore.decline(id);
    selectedId.value = null;
};
const unapprove = async (id: string) => {
    await projectsStore.unapprove(id);
    selectedId.value = null;
};

const loadMore = async () => {
    await projectsStore.loadMore();
};
</script>

<template>
  <div class="grid grid-cols-3 px-[36px] gap-[80px]">
    <div class="col-span-2">
      <div class="flex justify-between gap-[24px]">
        <h2>Projects</h2>
        <div class="flex gap-[24px]">
          <TextInput
            v-model="search"
            class="max-w-[244px]"
            placeholder="Search..."
          />
        </div>
      </div>

      <div class="mt-[24px] flex flex-wrap gap-2">
        <button
          v-for="f in filters"
          :key="f.value"
          type="button"
          class="rounded-full px-4 py-1 text-sm font-medium transition-colors"
          :class="[
            activeFilter === f.value
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          ]"
          @click="setFilter(f.value)"
        >
          {{ f.label }}
        </button>
      </div>

      <LoadingContent :is-loading="isLoading">
        <ProjectTable
          class="mt-[24px]"
          :projects="projectsStore.projects"
          @approve="approve"
          @reject="decline"
          @open="open"
        />
        <div
          v-if="projectsStore.nextCursor"
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
        Projects Management Guide
      </template>
      <template #text>
        <div class="space-y-4">
          <div>
            <h4 class="font-medium text-gray-900">
              Filtering
            </h4>
            <p class="text-sm text-gray-600">
              Use the pills above the table to switch between Pending,
              Approved, Declined, or All projects. Pending is where new
              alumnus submissions land.
            </p>
          </div>
          <div>
            <h4 class="font-medium text-gray-900">
              Approving
            </h4>
            <p class="text-sm text-gray-600">
              Click a row to open the detail panel and read the full
              description. Green check publishes the project (visible to
              all alumni). Red cross declines it.
            </p>
          </div>
          <div>
            <h4 class="font-medium text-gray-900">
              Post-decision
            </h4>
            <p class="text-sm text-gray-600">
              Already-decided projects can be sent back to review or
              re-approved from the detail panel — useful when the owner
              edits an approved project (which auto-resets it to pending).
            </p>
          </div>
        </div>
      </template>
    </InstructionParagraph>

    <ProjectDetailModal
      :project="selected"
      @close="closeModal"
      @approve="approve"
      @decline="decline"
      @unapprove="unapprove"
    />
  </div>
</template>
