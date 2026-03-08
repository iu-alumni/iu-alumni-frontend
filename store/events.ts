import { defineStore } from "pinia";
import eventsInstance from "~/api/events";
import type { Event, EventApprovalSettings, EventListItem } from "~/types";

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [] as EventListItem[],
    nextCursor: null as string | null,
    approvalSettings: null as EventApprovalSettings | null
  }),

  getters: {
      getEventById: (state) => {
        return (eventId: string) => state.events.find((event) => event.id === eventId) as EventListItem
      }
  },

  actions: {
    async updateEvents(params?: { search?: string; cursor?: string; limit?: number }) {
      const page = await eventsInstance.listEvents(params)
      this.events = page.items
      this.nextCursor = page.next_cursor
    },

    async loadMoreEvents(params?: { search?: string; limit?: number }) {
      if (!this.nextCursor) return
      const page = await eventsInstance.listEvents({ ...params, cursor: this.nextCursor })
      this.events = [...this.events, ...page.items]
      this.nextCursor = page.next_cursor
    },

    updateEvent(eventId: string, updatedEvent: Partial<Event>) {
      const index = this.events.findIndex(event => event.id === eventId)
      if (index !== -1) this.events[index] = {...this.events[index], ...updatedEvent}
      return eventsInstance.updateEvent(eventId, updatedEvent as Event)
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