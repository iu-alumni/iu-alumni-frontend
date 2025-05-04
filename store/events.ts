import { defineStore } from "pinia";
import eventsInstance from "~/api/events";
import type { Event, EventApprovalSettings } from "~/types";

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [] as Event[],
    approvalSettings: null as EventApprovalSettings | null
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
    },

    async approveEvent(eventId: string) {
      await eventsInstance.approveEvent(eventId)
      await this.updateEvents()
    },

    async declineEvent(eventId: string) {
      await eventsInstance.declineEvent(eventId)
      await this.updateEvents()
    },

    async fetchApprovalSettings() {
      this.approvalSettings = await eventsInstance.getEventApprovalSettings()
      return this.approvalSettings
    },

    async toggleAutoApprove() {
      this.approvalSettings = await eventsInstance.toggleAutoApprove()
      return this.approvalSettings
    }
  }
})