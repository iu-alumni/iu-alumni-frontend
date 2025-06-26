import usersInstance from '@/api/users';
import { createPinia, setActivePinia } from 'pinia';
import { describe, vi, expect, test } from 'vitest';
import { testUsers } from '~/tests/data';
import { useUsersStore } from '../users';
import { listSpyUsers } from '~/tests/mocks';

describe('users storage', () => {
  setActivePinia(createPinia())

  const storage = useUsersStore()

  const spyUsers = listSpyUsers()

  test('updateUsers', async () => {
    await storage.updateUsers()
    expect(storage.users).toEqual(testUsers)
    expect(storage.bannedUsersIds).toEqual(new Set(['003']))
    expect(spyUsers.listUsers).toBeCalled()
  })

  test('getUserById', async () => {
    expect(await storage.getUserById('001')).toEqual(testUsers[0])
    expect(spyUsers.getUserById).toBeCalled()
  })

  test('changeUserBanStatus', async () => {
    storage.changeUserBanStatus('001')
    await nextTick()
    expect(storage.bannedUsersIds).toHaveLength(2)
    storage.changeUserBanStatus('001')
    await nextTick()
    expect(storage.bannedUsersIds).toHaveLength(1)
  })

  test('isUserBanned', () => {
    expect(storage.isUserBanned('001')).toEqual(false)
    expect(storage.isUserBanned('003')).toEqual(true)
  })
})