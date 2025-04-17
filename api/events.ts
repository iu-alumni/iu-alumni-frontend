import type { Event } from "~/types";
import axiosInstance from ".";

function listEvents (): Promise<Event[]> {
  return axiosInstance.get('events/events')
}

function createEvent (event: Event): Promise<Event> {
  return axiosInstance.post('events/events', event)
}

function updateEvent (eventId: string, updatedEvent: Event): Promise<Event> {
  return axiosInstance.put(`events/events/${eventId}`, updatedEvent)
}

function deleteEvent (eventId: string): Promise<any> {
  return axiosInstance.delete(`events/events/${eventId}`)
}

export default {
  listEvents,
  createEvent,
  updateEvent,
  deleteEvent
}
