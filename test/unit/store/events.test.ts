import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

// The store calls the API module directly, so stub it — these tests cover store
// logic (pagination, cursor handling, local mutation), not HTTP.
const listEvents = vi.fn()
const updateEventApi = vi.fn()
const deleteEventApi = vi.fn()
const listEventParticipants = vi.fn()

vi.mock('~/api/events', () => ({
  default: {
    listEvents: (...args: unknown[]) => listEvents(...args),
    updateEvent: (...args: unknown[]) => updateEventApi(...args),
    deleteEvent: (...args: unknown[]) => deleteEventApi(...args),
    listEventParticipants: (...args: unknown[]) => listEventParticipants(...args),
    approveEvent: vi.fn(),
    declineEvent: vi.fn(),
    getEventApprovalSettings: vi.fn(),
    toggleAutoApprove: vi.fn(),
  },
}))

const { useEventsStore } = await import('~/store/events')

const event = (id: string, title = `event-${id}`) =>
  ({ id, title, owner_id: 'owner', participants_ids: [] }) as never

describe('events store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('updateEvents', () => {
    it('replaces events and stores the next cursor', async () => {
      listEvents.mockResolvedValue({ items: [event('1')], next_cursor: 'cursor-1' })
      const store = useEventsStore()

      await store.updateEvents()

      expect(store.events).toHaveLength(1)
      expect(store.nextCursor).toBe('cursor-1')
    })

    it('replaces rather than appends on a refetch', async () => {
      const store = useEventsStore()
      listEvents.mockResolvedValue({ items: [event('1')], next_cursor: null })
      await store.updateEvents()
      listEvents.mockResolvedValue({ items: [event('2')], next_cursor: null })
      await store.updateEvents()

      expect(store.events.map(e => e.id)).toEqual(['2'])
    })
  })

  describe('loadMoreEvents', () => {
    it('appends the next page and advances the cursor', async () => {
      const store = useEventsStore()
      listEvents.mockResolvedValue({ items: [event('1')], next_cursor: 'cursor-1' })
      await store.updateEvents()

      listEvents.mockResolvedValue({ items: [event('2')], next_cursor: 'cursor-2' })
      await store.loadMoreEvents()

      expect(store.events.map(e => e.id)).toEqual(['1', '2'])
      expect(store.nextCursor).toBe('cursor-2')
    })

    it('passes the stored cursor to the API', async () => {
      const store = useEventsStore()
      listEvents.mockResolvedValue({ items: [], next_cursor: 'cursor-1' })
      await store.updateEvents()

      listEvents.mockResolvedValue({ items: [], next_cursor: null })
      await store.loadMoreEvents({ search: 'party' })

      expect(listEvents).toHaveBeenLastCalledWith({ search: 'party', cursor: 'cursor-1' })
    })

    it('does nothing when there is no next cursor', async () => {
      const store = useEventsStore()
      listEvents.mockResolvedValue({ items: [event('1')], next_cursor: null })
      await store.updateEvents()
      listEvents.mockClear()

      await store.loadMoreEvents()

      expect(listEvents).not.toHaveBeenCalled()
      expect(store.events).toHaveLength(1)
    })
  })

  describe('updateEvent', () => {
    it('merges changes into the cached event', async () => {
      const store = useEventsStore()
      listEvents.mockResolvedValue({ items: [event('1', 'old')], next_cursor: null })
      await store.updateEvents()

      store.updateEvent('1', { title: 'new' })

      expect(store.events[0].title).toBe('new')
      expect(store.events[0].id).toBe('1')
    })

    it('leaves the cache untouched for an unknown id', async () => {
      const store = useEventsStore()
      listEvents.mockResolvedValue({ items: [event('1', 'old')], next_cursor: null })
      await store.updateEvents()

      store.updateEvent('missing', { title: 'new' })

      expect(store.events[0].title).toBe('old')
    })
  })

  describe('deleteEvent', () => {
    it('removes the matching event', async () => {
      const store = useEventsStore()
      listEvents.mockResolvedValue({ items: [event('1'), event('2')], next_cursor: null })
      await store.updateEvents()

      store.deleteEvent('1')

      expect(store.events.map(e => e.id)).toEqual(['2'])
      expect(deleteEventApi).toHaveBeenCalledWith('1')
    })

    it('does not drop an unrelated event when the id is unknown', async () => {
      const store = useEventsStore()
      listEvents.mockResolvedValue({ items: [event('1'), event('2')], next_cursor: null })
      await store.updateEvents()

      store.deleteEvent('missing')

      // findIndex returns -1 for an unknown id, and splice(-1, 1) removes the
      // LAST element — deleting a stale id would silently drop a real event.
      expect(store.events.map(e => e.id)).toEqual(['1', '2'])
    })
  })

  describe('getEventById', () => {
    it('returns the cached event', async () => {
      const store = useEventsStore()
      listEvents.mockResolvedValue({ items: [event('1')], next_cursor: null })
      await store.updateEvents()

      expect(store.getEventById('1')?.id).toBe('1')
      expect(store.getEventById('missing')).toBeUndefined()
    })
  })

  describe('listParticipants', () => {
    it('derives display name and institutional email', async () => {
      const store = useEventsStore()
      listEventParticipants.mockResolvedValue([
        { first_name: 'Ada', last_name: 'Lovelace' },
      ])

      const [participant] = await store.listParticipants('1')

      expect(participant.name).toBe('Ada Lovelace')
      expect(participant.email).toBe('a.lovelace@innopolis.university')
    })
  })
})
