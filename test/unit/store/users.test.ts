import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

// Store logic only — the API module is stubbed, so these cover pagination,
// the derived display fields, and the ban/verify toggles rather than HTTP.
const listUsers = vi.fn()
const listBannedUsers = vi.fn()
const getUserById = vi.fn()
const banUser = vi.fn()
const unbanUser = vi.fn()
const verifyUser = vi.fn()
const unverifyUser = vi.fn()

vi.mock('@/api/users', () => ({
  default: {
    listUsers: (...args: unknown[]) => listUsers(...args),
    listBannedUsers: (...args: unknown[]) => listBannedUsers(...args),
    getUserById: (...args: unknown[]) => getUserById(...args),
    banUser: (...args: unknown[]) => banUser(...args),
    unbanUser: (...args: unknown[]) => unbanUser(...args),
    verifyUser: (...args: unknown[]) => verifyUser(...args),
    unverifyUser: (...args: unknown[]) => unverifyUser(...args),
  },
}))

const { useUsersStore } = await import('~/store/users')

const user = (id: string, overrides: Record<string, unknown> = {}) =>
  ({
    id,
    first_name: 'Ada',
    last_name: 'Lovelace',
    email: `${id}@innopolis.university`,
    is_banned: false,
    is_verified: false,
    ...overrides,
  }) as never

describe('users store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    listBannedUsers.mockResolvedValue([])
    // console.error is called on the error paths; keep test output readable.
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  describe('updateUsers', () => {
    it('stores users and the next cursor', async () => {
      listUsers.mockResolvedValue({ items: [user('1')], next_cursor: 'cursor-1' })
      const store = useUsersStore()

      await store.updateUsers()

      expect(store.users.map(u => u.id)).toEqual(['1'])
      expect(store.nextCursor).toBe('cursor-1')
    })

    it('derives the display name', async () => {
      listUsers.mockResolvedValue({
        items: [user('1', { first_name: 'Grace', last_name: 'Hopper' })],
        next_cursor: null,
      })
      const store = useUsersStore()

      await store.updateUsers()

      expect(store.users[0].name).toBe('Grace Hopper')
    })

    it('keeps a real email rather than deriving one', async () => {
      listUsers.mockResolvedValue({
        items: [user('1', { email: 'real@example.com' })],
        next_cursor: null,
      })
      const store = useUsersStore()

      await store.updateUsers()

      expect(store.users[0].email).toBe('real@example.com')
    })

    it('falls back to an institutional email when none is set', async () => {
      listUsers.mockResolvedValue({
        items: [user('1', { email: null, first_name: 'Grace', last_name: 'Hopper' })],
        next_cursor: null,
      })
      const store = useUsersStore()

      await store.updateUsers()

      expect(store.users[0].email).toBe('g.hopper@innopolis.university')
    })

    it('marks banned users from the global banned list', async () => {
      listUsers.mockResolvedValue({ items: [user('1'), user('2')], next_cursor: null })
      // listBannedUsers takes no params, so it covers users on every page.
      listBannedUsers.mockResolvedValue([{ id: '2' }])
      const store = useUsersStore()

      await store.updateUsers()

      expect(store.isUserBanned('2')).toBe(true)
      expect(store.isUserBanned('1')).toBe(false)
    })

    it('marks verified users from the current page', async () => {
      listUsers.mockResolvedValue({
        items: [user('1', { is_verified: true }), user('2')],
        next_cursor: null,
      })
      const store = useUsersStore()

      await store.updateUsers()

      expect(store.isUserVerified('1')).toBe(true)
      expect(store.isUserVerified('2')).toBe(false)
    })

    it('replaces previous results on a refetch', async () => {
      const store = useUsersStore()
      listUsers.mockResolvedValue({ items: [user('1')], next_cursor: null })
      await store.updateUsers()
      listUsers.mockResolvedValue({ items: [user('2')], next_cursor: null })
      await store.updateUsers()

      expect(store.users.map(u => u.id)).toEqual(['2'])
    })

    it('rethrows so the page can surface a failure', async () => {
      listUsers.mockRejectedValue(new Error('boom'))
      const store = useUsersStore()

      await expect(store.updateUsers()).rejects.toThrow('boom')
    })
  })

  describe('loadMoreUsers', () => {
    it('appends the next page and advances the cursor', async () => {
      const store = useUsersStore()
      listUsers.mockResolvedValue({ items: [user('1')], next_cursor: 'cursor-1' })
      await store.updateUsers()

      listUsers.mockResolvedValue({ items: [user('2')], next_cursor: 'cursor-2' })
      await store.loadMoreUsers()

      expect(store.users.map(u => u.id)).toEqual(['1', '2'])
      expect(store.nextCursor).toBe('cursor-2')
    })

    it('forwards the stored cursor alongside the filters', async () => {
      const store = useUsersStore()
      listUsers.mockResolvedValue({ items: [], next_cursor: 'cursor-1' })
      await store.updateUsers()

      listUsers.mockResolvedValue({ items: [], next_cursor: null })
      await store.loadMoreUsers({ search: 'ada', banned: true })

      expect(listUsers).toHaveBeenLastCalledWith({
        search: 'ada',
        banned: true,
        cursor: 'cursor-1',
      })
    })

    it('does nothing when there is no next page', async () => {
      const store = useUsersStore()
      listUsers.mockResolvedValue({ items: [user('1')], next_cursor: null })
      await store.updateUsers()
      listUsers.mockClear()

      await store.loadMoreUsers()

      expect(listUsers).not.toHaveBeenCalled()
      expect(store.users).toHaveLength(1)
    })

    it('derives display fields for appended users too', async () => {
      const store = useUsersStore()
      listUsers.mockResolvedValue({ items: [user('1')], next_cursor: 'cursor-1' })
      await store.updateUsers()

      listUsers.mockResolvedValue({
        items: [user('2', { email: null, first_name: 'Grace', last_name: 'Hopper' })],
        next_cursor: null,
      })
      await store.loadMoreUsers()

      expect(store.users[1].name).toBe('Grace Hopper')
      expect(store.users[1].email).toBe('g.hopper@innopolis.university')
    })
  })

  describe('changeUserBanStatus', () => {
    it('bans a user who is not banned', async () => {
      const store = useUsersStore()
      listUsers.mockResolvedValue({ items: [user('1')], next_cursor: null })
      await store.updateUsers()

      await store.changeUserBanStatus('1')

      expect(banUser).toHaveBeenCalledWith('1')
      expect(store.isUserBanned('1')).toBe(true)
      expect(store.users[0].is_banned).toBe(true)
    })

    it('unbans a user who is banned', async () => {
      const store = useUsersStore()
      listUsers.mockResolvedValue({ items: [user('1', { is_banned: true })], next_cursor: null })
      listBannedUsers.mockResolvedValue([{ id: '1' }])
      await store.updateUsers()

      await store.changeUserBanStatus('1')

      expect(unbanUser).toHaveBeenCalledWith('1')
      expect(store.isUserBanned('1')).toBe(false)
      expect(store.users[0].is_banned).toBe(false)
    })

    it('rethrows when the API call fails', async () => {
      const store = useUsersStore()
      listUsers.mockResolvedValue({ items: [user('1')], next_cursor: null })
      await store.updateUsers()
      banUser.mockRejectedValue(new Error('nope'))

      await expect(store.changeUserBanStatus('1')).rejects.toThrow('nope')
      // The optimistic flip must not stick when the request failed.
      expect(store.isUserBanned('1')).toBe(false)
    })
  })

  describe('changeUserVerificationStatus', () => {
    it('verifies an unverified user by email', async () => {
      const store = useUsersStore()
      listUsers.mockResolvedValue({ items: [user('1')], next_cursor: null })
      await store.updateUsers()

      await store.changeUserVerificationStatus('1')

      // The verify endpoint keys off email, not id.
      expect(verifyUser).toHaveBeenCalledWith('1@innopolis.university')
      expect(store.users[0].is_verified).toBe(true)
      expect(store.isUserVerified('1')).toBe(true)
    })

    it('unverifies a verified user', async () => {
      const store = useUsersStore()
      listUsers.mockResolvedValue({
        items: [user('1', { is_verified: true })],
        next_cursor: null,
      })
      await store.updateUsers()

      await store.changeUserVerificationStatus('1')

      expect(unverifyUser).toHaveBeenCalledWith('1@innopolis.university')
      expect(store.users[0].is_verified).toBe(false)
      expect(store.isUserVerified('1')).toBe(false)
    })

    it('does nothing for an unknown user', async () => {
      const store = useUsersStore()
      listUsers.mockResolvedValue({ items: [user('1')], next_cursor: null })
      await store.updateUsers()

      await store.changeUserVerificationStatus('missing')

      expect(verifyUser).not.toHaveBeenCalled()
      expect(unverifyUser).not.toHaveBeenCalled()
    })
  })

  describe('getUserById', () => {
    it('derives name and institutional email', async () => {
      const store = useUsersStore()
      getUserById.mockResolvedValue({ first_name: 'Grace', last_name: 'Hopper' })

      const result = await store.getUserById('1')

      expect(result.name).toBe('Grace Hopper')
      expect(result.email).toBe('g.hopper@innopolis.university')
    })
  })
})
