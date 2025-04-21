import type { Event, User } from "~/types";
import axiosInstance from ".";

function listEvents (): Promise<Event[]> {
  return axiosInstance.get('events/').then(req => req.data)
}

function getEventById (eventId: string): Promise<Event> {
  return axiosInstance.get(`events/${eventId}`).then(req => req.data)
}

function createEvent (event: Event): Promise<Event> {
  return axiosInstance.post('events/', event).then(req => req.data)
}

function updateEvent (eventId: string, updatedEvent: Event): Promise<Event> {
  return axiosInstance.put(`events/${eventId}`, updatedEvent).then(req => req.data)
}

function deleteEvent (eventId: string): Promise<any> {
  return axiosInstance.delete(`events/${eventId}`).then(req => req.data)
}

function listEventParticipants (eventId: string): Promise<User[]> {
  return axiosInstance.delete(`events/${eventId}/participant`).then(req => req.data)
}

export default {
  listEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  listEventParticipants,
}
