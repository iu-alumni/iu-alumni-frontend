import eventsInstance from '~/api/events';
import usersInstance from '@/api/users';
import { vi } from "vitest"
import { testEvents, testUsers } from './data';

export const listSpyUsers = () => {
  return {
    listUsers: vi.spyOn(usersInstance, 'listUsers').mockImplementation(() => Promise.resolve(testUsers)),
    getUserById: vi.spyOn(usersInstance, 'getUserById').mockImplementation(() => Promise.resolve(testUsers[0])),
    listBannedUsers: vi.spyOn(usersInstance, 'listBannedUsers').mockImplementation(() => Promise.resolve([testUsers[2]])),
    banUser: vi.spyOn(usersInstance, 'banUser').mockImplementation(() => Promise.resolve(testUsers[0])),
    unbanUser: vi.spyOn(usersInstance, 'unbanUser').mockImplementation(() => Promise.resolve(testUsers[0])),
  }
}

export const listSpyEvents = () => {
  let autoApprove = true
  return {
    listEvents: vi.spyOn(eventsInstance, 'listEvents').mockImplementation(() => Promise.resolve(testEvents)),
    updateEvent: vi.spyOn(eventsInstance, 'updateEvent').mockImplementation(() => Promise.resolve(testEvents[0])),
    deleteEvent: vi.spyOn(eventsInstance, 'deleteEvent').mockImplementation(() => Promise.resolve(true)),
    listEventParticipants: vi.spyOn(eventsInstance, 'listEventParticipants').mockImplementation(() => Promise.resolve(testUsers)),
    approveEvent: vi.spyOn(eventsInstance, 'approveEvent').mockImplementation(() => Promise.resolve(testEvents[0])),
    declineEvent: vi.spyOn(eventsInstance, 'declineEvent').mockImplementation(() => Promise.resolve(testEvents[0])),
    getEventApprovalSettings: vi.spyOn(eventsInstance, 'getEventApprovalSettings').mockImplementation(() => Promise.resolve({auto_approve: autoApprove})),
    toggleAutoApprove: vi.spyOn(eventsInstance, 'toggleAutoApprove').mockImplementation(() => {
      autoApprove = !autoApprove
      return Promise.resolve({auto_approve: autoApprove})
    }),
  }
}