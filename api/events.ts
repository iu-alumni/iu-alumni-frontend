import type { Event, User } from "~/types";
import axiosInstance from ".";

function listEvents (): Promise<Event[]> {
  return axiosInstance.get('events/')
}

function getEventById (eventId: string): Promise<Event> {
  return axiosInstance.get(`events/${eventId}`)
}

function createEvent (event: Event): Promise<Event> {
  return axiosInstance.post('events/', event)
}

function updateEvent (eventId: string, updatedEvent: Event): Promise<Event> {
  return axiosInstance.put(`events/${eventId}`, updatedEvent)
}

function deleteEvent (eventId: string): Promise<any> {
  return axiosInstance.delete(`events/${eventId}`)
}

function listEventParticipants (eventId: string): Promise<User[]> {
  return axiosInstance.delete(`events/${eventId}/participant`)
}

export default {
  listEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  listEventParticipants,
}
