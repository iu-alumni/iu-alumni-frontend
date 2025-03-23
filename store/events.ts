import { defineStore } from "pinia";
import eventsInstance from "~/api/events";
import type { Event } from "~/types";

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [] as Event[]
  }),


  getters: {
    getEventById: (state) => {
      return (eventId: string) => state.events.find(event => event.id === eventId)
    }
  },


  actions: {
    async updateEvents() {
      this.events = await eventsInstance.listEvents()
    },

    async updateEvent(eventId: string, updatedEvent: Event) {
      const index = this.events.findIndex(event => event.id === eventId)
      this.events[index] = {...this.events[index], ...updatedEvent}
      return await eventsInstance.updateEvent(eventId, updatedEvent)
    }
  }
})