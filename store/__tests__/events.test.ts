import eventsInstance from '~/api/events';
import { test, vi, describe, expect } from 'vitest'
import { testEvents, testUsers } from '~/tests/data';
import { useEventsStore } from '../events';
import type { Event } from '~/types';
import { createPinia, setActivePinia } from 'pinia';
import { listSpyEvents } from '~/tests/mocks';

describe('events storage', () => {
  setActivePinia(createPinia())

  const storage = useEventsStore()

  const spyEvents = listSpyEvents()

  test('updateEvents', async () => {
    await storage.updateEvents()
    expect(storage.events).toEqual(testEvents)
    expect(spyEvents.listEvents).toBeCalled()
  })

  test('updateEvent', async () => {
    expect(await storage.updateEvent("test", {} as Event)).toEqual(testEvents[0])
    expect(spyEvents.updateEvent).toBeCalled()
  })

  test('deleteEvent', async () => {
    expect(await storage.deleteEvent("test")).toEqual(true)
    expect(spyEvents.deleteEvent).toBeCalled()
  })

  test('listParticipants', async () => {
    expect(await storage.listParticipants("test")).toEqual(testUsers)
    expect(spyEvents.listEventParticipants).toBeCalled()
  })

  test('approveEvent', async () => {
    await storage.approveEvent("test")
    expect(spyEvents.approveEvent).toBeCalled()
  })

  test('declineEvent', async () => {
    await storage.declineEvent("test")
    expect(spyEvents.declineEvent).toBeCalled()
  })

  test('fetchApprovalSettings', async () => {
    expect(await storage.fetchApprovalSettings()).toEqual({auto_approve: true})
    expect(spyEvents.getEventApprovalSettings).toBeCalled()
  })

  test('toggleAutoApprove', async () => {
    expect(await storage.toggleAutoApprove()).toEqual({auto_approve: false})
    expect(spyEvents.toggleAutoApprove).toBeCalled()
  })

  test('getEventById', () => {
    expect(storage.getEventById('001')).toEqual(testEvents[0])
    expect(storage.getEventById('test')).toEqual(undefined)
  })
})