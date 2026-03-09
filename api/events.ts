import type { Event, EventApprovalSettings, EventListItem, EventParticipant, Paginated } from "~/types";
import axiosInstance from ".";

interface ListEventsParams {
  search?: string;
  cursor?: string;
  limit?: number;
}

function listEvents (params?: ListEventsParams): Promise<Paginated<EventListItem>> {
  return axiosInstance.get('api/v1/admin/events', { params }).then(req => req.data)
}

function getEventCover (eventId: string): Promise<{ cover: string | null }> {
  return axiosInstance.get(`api/v1/events/${eventId}/cover`).then(req => req.data)
}

function createEvent (event: Event): Promise<Event> {
  return axiosInstance.post('api/v1/events/', event).then(req => req.data)
}

function updateEvent (eventId: string, updatedEvent: Event): Promise<Event> {
  return axiosInstance.put(`api/v1/events/${eventId}`, updatedEvent).then(req => req.data)
}

function deleteEvent (eventId: string): Promise<unknown> {
  return axiosInstance.delete(`api/v1/events/${eventId}`).then(req => req.data)
}

function listEventParticipants (eventId: string): Promise<EventParticipant[]> {
  return axiosInstance.get(`api/v1/events/${eventId}/participants`).then(req => req.data)
}

function approveEvent(eventId: string): Promise<Event> {
  return axiosInstance.post(`api/v1/admin/events/approve/${eventId}`).then(req => req.data)
}

function declineEvent(eventId: string): Promise<Event> {
  return axiosInstance.post(`api/v1/admin/events/decline/${eventId}`).then(req => req.data)
}

function getEventApprovalSettings(): Promise<EventApprovalSettings> {
  return axiosInstance.get('api/v1/admin/settings/events').then(req => req.data)
}

function toggleAutoApprove(): Promise<EventApprovalSettings> {
  return axiosInstance.post('api/v1/admin/settings/events/toggle-auto-approve').then(req => req.data)
}

export default {
  listEvents,
  getEventCover,
  createEvent,
  updateEvent,
  deleteEvent,
  listEventParticipants,
  approveEvent,
  declineEvent,
  getEventApprovalSettings,
  toggleAutoApprove,
}
