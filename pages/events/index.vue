<script setup lang="ts">
import DefaultButton from '~/components/common/DefaultButton.vue';
import InstructionParagraph from '~/components/common/InstructionParagraph.vue';
import TextInput from '~/components/common/TextInput.vue';
import EventTable from '~/components/event/EventTable.vue';
import { useEventsStore } from '~/store/events';
import { testEvents } from '~/tests/data';
import Id from './[id].vue';

/*
const eventsStore = useEventsStore()


const events = eventsStore.events

onMounted(() => {
  eventsStore.updateEvents()
})
*/

const events = ref(testEvents)

const search = ref('')

const searchedEvents = computed(() => events.value.filter(event => event.name.toLowerCase().includes(search.value.toLowerCase())))

const changeStatus = (id: string, status: 'approved' | 'rejected') => {
  const selectedEvent = events.value.find(event => event.id === id)
  if (selectedEvent)
    selectedEvent.status = status
}

const isVerificationEnabled = ref(true)
</script>

<template>
  <div class="grid grid-cols-3 px-[36px] gap-[80px]">
    <div class="col-span-2">
      <h4 class="mb-[4px]">
        Manage and verify events
      </h4>
      <div class="flex justify-between gap-[24px]">
        <h2>Events</h2>

        <div class="flex gap-[24px]">
          <TextInput v-model="search" class="max-w-[244px]" placeholder="Search..." />
          <DefaultButton v-if="isVerificationEnabled" size="small" @click="isVerificationEnabled = false">
            Verify&nbsp;(On)
          </DefaultButton>
          <DefaultButton v-else="isVerificationEnabled" size="small" type="inactive" @click="isVerificationEnabled = true">
            Verify&nbsp;(Off)
          </DefaultButton>
        </div>
      </div>

      <EventTable class="mt-[36px]" :events="searchedEvents" @approve="id => changeStatus(id, 'approved')" @reject="id => changeStatus(id, 'rejected')" />
    </div>

    <InstructionParagraph class="col-span-1 mt-[54px]">
      <template #title>
        How to manage?
      </template>
      <template #text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam tortor ipsum, sed vestibulum mauris sodales nec. Maecenas convallis id ipsum quis feugiat. 
        Cras tincidunt tellus non libero luctus lacinia. Donec vestibulum ullamcorper posuere. Ut vitae ultricies augue. Sed quis tristique massa, ut cursus felis. Mauris sit amet leo sit amet sapien tempor commodo in vitae ex. 
        Nam euismod ipsum at neque dapibus imperdiet. Phasellus a malesuada quam, sit amet facilisis erat. Aliquam at sem odio. Quisque volutpat hendrerit feugiat. 
        Vestibulum non urna condimentum, ultricies nisl vel, auctor velit. Etiam at laoreet erat.
      </template>
    </InstructionParagraph>
  </div>
</template>