import { defineStore } from "pinia";
import eventsInstance from "~/api/events";
import type { Event } from "~/types";

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [] as Event[]
  }),

  actions: {
    async updateEvents() {
      this.events = await eventsInstance.listEvents()
    },

    getEventById(eventId: string) {
      return eventsInstance.getEventById(eventId)
    },

    updateEvent(eventId: string, updatedEvent: Event) {
      const index = this.events.findIndex(event => event.id === eventId)
      this.events[index] = {...this.events[index], ...updatedEvent}
      return eventsInstance.updateEvent(eventId, updatedEvent)
    },

    deleteEvent(eventId: string) {
      const index = this.events.findIndex(event => event.id === eventId)
      this.events.splice(index, 1)
      return eventsInstance.deleteEvent(eventId)
    },

    listParticipants(eventId: string) {
      return eventsInstance.listEventParticipants(eventId)
    }
  }
})