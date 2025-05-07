import type { Event, EventApprovalSettings, User } from "~/types";
import axiosInstance from ".";

function listEvents (): Promise<Event[]> {
  return axiosInstance.get('admin/events').then(req => req.data)
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
  return axiosInstance.get(`events/${eventId}/participants`).then(req => req.data)
}

function approveEvent(eventId: string): Promise<Event> {
  return axiosInstance.post(`admin/events/approve/${eventId}`).then(req => req.data)
}

function declineEvent(eventId: string): Promise<Event> {
  return axiosInstance.post(`admin/events/decline/${eventId}`).then(req => req.data)
}

function getEventApprovalSettings(): Promise<EventApprovalSettings> {
  return axiosInstance.get('admin/settings/events').then(req => req.data)
}

function toggleAutoApprove(): Promise<EventApprovalSettings> {
  return axiosInstance.post('admin/settings/events/toggle-auto-approve').then(req => req.data)
}

export default {
  listEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  listEventParticipants,
  approveEvent,
  declineEvent,
  getEventApprovalSettings,
  toggleAutoApprove,
}
