import { createPinia, setActivePinia } from 'pinia';
import { describe, vi, expect, test, beforeEach } from 'vitest';
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen, fireEvent } from '@testing-library/vue'
import Users from '../index.vue'
import { listSpyEvents, listSpyUsers } from '~/tests/mocks';

describe('users page', async () => {
  setActivePinia(createPinia())

  const spyEvents = listSpyEvents()
  const spyUsers = listSpyUsers()

  const page = await renderSuspended(Users)

  test('render', () => {
    expect(screen.getByText('Boris Adakov')).toBeDefined()
    expect(screen.getByText('Boris Adakovich')).toBeDefined()
  })

  test('search', async () => {
    expect(page.baseElement.innerHTML).toContain('Adakovish')
    const input = screen.getByRole('textbox')
    await fireEvent.update(input, 'Adakovich')
    expect(page.baseElement.innerHTML).not.toContain('Adakovish')
    await fireEvent.update(input, '')
  })

  test('ban', async () => {
    expect(spyUsers.banUser).not.toBeCalled()
    expect(spyUsers.unbanUser).not.toBeCalled()
    const buttons = await screen.findAllByRole('img')
    await fireEvent.click(buttons[2])
    await fireEvent.click(buttons[2])
    expect(spyUsers.banUser).toBeCalled()
    expect(spyUsers.unbanUser).toBeCalled()
  })
})