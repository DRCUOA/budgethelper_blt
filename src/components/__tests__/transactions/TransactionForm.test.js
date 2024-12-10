import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import TransactionForm from '../../transactions/TransactionForm.vue'
import { useTransactionStore } from '../../../stores/transaction'

describe('TransactionForm.vue', () => {
  let wrapper
  const mockOnSubmit = vi.fn()

  beforeEach(() => {
    wrapper = mount(TransactionForm, {
      props: {
        onSubmit: mockOnSubmit
      },
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            transaction: {
              categories: [
                { id: 1, name: 'Food' },
                { id: 2, name: 'Transport' }
              ]
            }
          }
        })]
      }
    })
  })

  it('initializes with default expense type', () => {
    const expenseRadio = wrapper.find('input[value="EXPENSE"]')
    expect(expenseRadio.element.checked).toBe(true)
  })

  it('shows validation error when submitting empty form', async () => {
    await wrapper.find('form').trigger('submit')
    expect(wrapper.text()).toContain('Please fill in all fields')
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('submits form with valid data', async () => {
    const store = useTransactionStore()
    
    // Fill form data
    await wrapper.find('input[type="number"]').setValue('100')
    await wrapper.find('input[type="text"]').setValue('Test transaction')
    await wrapper.find('select').setValue('1')
    
    // Submit form
    await wrapper.find('form').trigger('submit')
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      type: 'EXPENSE',
      amount: 100,
      description: 'Test transaction',
      categoryId: 1,
      date: expect.any(Date)
    })
  })

  it('resets form after successful submission', async () => {
    // Fill and submit form
    await wrapper.find('input[type="number"]').setValue('100')
    await wrapper.find('input[type="text"]').setValue('Test transaction')
    await wrapper.find('select').setValue('1')
    await wrapper.find('form').trigger('submit')
    
    // Check if form is reset
    expect(wrapper.find('input[type="number"]').element.value).toBe('')
    expect(wrapper.find('input[type="text"]').element.value).toBe('')
    expect(wrapper.find('select').element.value).toBe('')
  })
})