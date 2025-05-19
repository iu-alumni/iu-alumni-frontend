import { createPinia, setActivePinia } from 'pinia';
import { describe, vi, expect, test, beforeEach } from 'vitest';
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen, fireEvent } from '@testing-library/vue'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { listSpyEvents, listSpyUsers } from '~/tests/mocks';

import Events from '../index.vue'

describe('events page', async () => {
  setActivePinia(createPinia())
  
  const spyEvents = listSpyEvents()
  const spyUsers = listSpyUsers()

  const page = await renderSuspended(Events)

  test('render', () => {
    expect(screen.getByText('Adakov\'s lecture')).toBeDefined()
    expect(screen.getByText('Adakov\'s lecture №2')).toBeDefined()
  })

  test('search', async () => {
    expect(page.baseElement.innerHTML).toContain('Adakov\'s lecture')
    const input = screen.getByRole('textbox')
    await fireEvent.update(input, '1212')
    expect(page.baseElement.innerHTML).not.toContain('Adakov\'s lecture')
    await fireEvent.update(input, '')
  })

  test('approve', async () => {
    const buttons = await screen.findAllByRole('img')
    console.log(buttons)
    console.log('-------------------------------')
    await fireEvent.click(buttons[6])
    expect(spyEvents.approveEvent).toBeCalled()
  })

  test('decline', async () => {
    const buttons = await screen.findAllByRole('img')
    await fireEvent.click(buttons[3])
    expect(spyEvents.declineEvent).toBeCalled()
  })

  test('toggleVerification', async () => {
    expect(page.baseElement.innerHTML).toContain('Auto-approve&nbsp;(Off)')
    const buttons = await screen.findAllByRole('button')
    await fireEvent.click(buttons[0])
    expect(spyEvents.toggleAutoApprove).toBeCalled()
  })
})