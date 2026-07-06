<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import BadgeAwardsPanel from '~/components/badge/BadgeAwardsPanel.vue';
import BadgesTable from '~/components/badge/BadgesTable.vue';
import RecomputeLeaderboardsButton from '~/components/badge/RecomputeLeaderboardsButton.vue';
import InstructionParagraph from '~/components/common/InstructionParagraph.vue';
import LoadingContent from '~/components/common/LoadingContent.vue';
import badgesApi from '~/api/badges';
import { useToast } from '~/components/ui/toast/use-toast';
import type { BadgeCatalogItem } from '~/types';

const { toast } = useToast();
const badges = ref<BadgeCatalogItem[]>([]);
const isLoading = ref(true);
const selectedCode = ref<string | null>(null);

const load = async () => {
  isLoading.value = true;
  try {
    badges.value = await badgesApi.listBadges();
  } catch {
    toast({ variant: 'destructive', title: 'Failed to load badges' });
  } finally {
    isLoading.value = false;
  }
};

onMounted(load);

const localLegendBadge = computed(() =>
  badges.value.find((b) => b.code === 'local_legend'),
);
</script>

<template>
  <div class="grid grid-cols-3 px-[36px] gap-[80px]">
    <div class="col-span-2">
      <div class="flex justify-between items-center mb-6">
        <h2>Badges</h2>
        <div class="flex items-center gap-3">
          <RecomputeLeaderboardsButton @done="load" />
        </div>
      </div>

      <LoadingContent :is-loading="isLoading">
        <div class="grid grid-cols-12 gap-4">
          <div :class="selectedCode ? 'col-span-7' : 'col-span-12'">
            <BadgesTable
              :badges="badges"
              :selected-code="selectedCode"
              @select="(code) => (selectedCode = code)"
            />
          </div>
          <div
            v-if="selectedCode"
            class="col-span-5"
          >
            <BadgeAwardsPanel
              :code="selectedCode"
              @revoked="load"
              @close="selectedCode = null"
            />
          </div>
        </div>
      </LoadingContent>
    </div>

    <InstructionParagraph class="col-span-1 mt-[54px]">
      <template #title>
        Badges Management
      </template>
      <template #text>
        <div class="space-y-4">
          <div>
            <h4 class="font-medium text-gray-900">
              Catalog
            </h4>
            <p class="text-sm text-gray-600">
              Every badge in the system with its tier, criteria, and how
              many users have earned it. Click a row to see who holds it.
            </p>
          </div>
          <div>
            <h4 class="font-medium text-gray-900">
              Manual award / revoke
            </h4>
            <p class="text-sm text-gray-600">
              Open Source Contributor and Suggestion Box are admin-awarded.
              From the Users page you can award any badge to a specific user.
              Revoke from the side panel here.
            </p>
          </div>
          <div v-if="localLegendBadge">
            <h4 class="font-medium text-gray-900">
              Local Legend
            </h4>
            <p class="text-sm text-gray-600">
              Awarded yearly to the top attendee per city. Runs Jan 2 via
              cron; use "Recompute leaderboards" to backfill any year on
              demand.
            </p>
          </div>
        </div>
      </template>
    </InstructionParagraph>
  </div>
</template>
