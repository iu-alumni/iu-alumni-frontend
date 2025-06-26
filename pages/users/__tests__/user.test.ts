import { createPinia, setActivePinia } from 'pinia';
import { describe, vi, expect, test, beforeEach } from 'vitest';
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen, fireEvent } from '@testing-library/vue'
import User from'../[id].vue'
import { listSpyEvents, listSpyUsers } from '~/tests/mocks';

describe('user page', async () => {
  setActivePinia(createPinia())
  
  const spyEvents = listSpyEvents()
  const spyUsers = listSpyUsers()

  const page = await renderSuspended(User)

  test('render', async () => {
    expect(screen.getByText('Boris Adakov')).toBeDefined()
    expect(screen.getByText('b.adakov@innopolis.university')).toBeDefined()

    expect(await screen.findAllByRole('img')).toHaveLength(24)
    expect(screen.getByText('Platinum')).toBeDefined()

    expect(screen.getByText('Adakov\'s lecture')).toBeDefined()
  })

  test('ban', async () => {
    expect(spyUsers.banUser).not.toBeCalled()
    expect(spyUsers.unbanUser).not.toBeCalled()
    const buttons = await screen.findAllByRole('button')
    await fireEvent.click(buttons[0])
    await fireEvent.click(buttons[0])
    expect(spyUsers.banUser).toBeCalled()
    expect(spyUsers.unbanUser).toBeCalled()
  })
})