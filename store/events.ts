import { defineStore } from "pinia";
import eventsInstance from "~/api/events";
import type { Event, EventApprovalSettings } from "~/types";

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [] as Event[],
    approvalSettings: null as EventApprovalSettings | null
  }),

  getters: {
      getEventById: (state) => {
        return (eventId: string) => state.events.find((event) => event.id === eventId) as Event
      }
  },

  actions: {
    async updateEvents() {
      this.events = await eventsInstance.listEvents()
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

    async listParticipants(eventId: string) {
      const allParticipants = await eventsInstance.listEventParticipants(eventId)
      return allParticipants.map(participant => {
        participant.name = participant.first_name + ' ' + participant.last_name
        participant.email = participant.first_name.charAt(0).toLowerCase() + '.' + participant.last_name.toLowerCase() + "@innopolis.university"
        return participant
      })
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