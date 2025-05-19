import { describe, expect, test, vi } from "vitest";
import Auth from '../index.vue'
import authInstance from '@/api/auth'
import { setActivePinia, createPinia } from "pinia";
import { renderSuspended } from '@nuxt/test-utils/runtime'
import { screen, fireEvent } from '@testing-library/vue'

describe('auth page', async () => {
  setActivePinia(createPinia())

  await renderSuspended(Auth)

  test('signIn', async () => {
    const spy = vi.spyOn(authInstance, 'serverLogin').mockResolvedValue({data: {access_token: '000'}} as any)
    const button = screen.getByText('Continue')
    await fireEvent.click(button)
    await nextTick()
    expect(spy).toBeCalled()
  })

  test('failed signIn', async () => {
    const spy = vi.spyOn(authInstance, 'serverLogin').mockRejectedValue({data: {access_token: '000'}} as any)
    const button = screen.getByText('Continue')
    await fireEvent.click(button)
    await nextTick()
    expect(spy).toBeCalled()
    expect(screen.findByText('Incorrect password or e-mail')).toBeDefined()
  })
})