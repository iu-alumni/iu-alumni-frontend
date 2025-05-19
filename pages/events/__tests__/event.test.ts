import { createPinia, setActivePinia } from 'pinia';
import { describe, vi, expect, test, beforeEach } from 'vitest';
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen, fireEvent } from '@testing-library/vue'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { listSpyEvents, listSpyUsers } from '~/tests/mocks';
import Event from '../[id].vue'
import { useEventsStore } from '~/store/events';

describe('event page', async () => {
  mockNuxtImport('useRoute', () => {
    return () => ({
      params: {
        id: '001'
      }
    })
  })

  setActivePinia(createPinia())

  const spyEvents = listSpyEvents()
  const spyUsers = listSpyUsers()

  await renderSuspended(Event)

  test('rendered', () => {
    expect(screen.findByText('Boris Adakov')).toBeDefined()
    expect(screen.findByText('Lorem ipsum')).toBeDefined()
    expect(screen.findByText('Boris Adakovich')).toBeDefined()
  })

  test('approve', async () => {
    const button = screen.getByText('Approve')
    await fireEvent.click(button)
    expect(spyEvents.approveEvent).toBeCalled()
  })
})

