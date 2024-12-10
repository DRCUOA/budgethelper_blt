import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import TransactionList from '../../transactions/TransactionList.vue'
import { useTransactionStore } from '../../../stores/transaction'

describe('TransactionList.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(TransactionList, {
      global: {
        plugins: [createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            transaction: {
              transactions: [
                {
                  id: 1,
                  type: 'INCOME',
                  amount: 1000,
                  description: 'Salary',
                  date: new Date('2024-02-20'),
                  categoryId: 1
                },
                {
                  id: 2,
                  type: 'EXPENSE',
                  amount: 500,
                  description: 'Rent',
                  date: new Date('2024-02-21'),
                  categoryId: 2
                }
              ],
              categories: [
                { id: 1, name: 'Salary' },
                { id: 2, name: 'Housing' }
              ]
            }
          }
        })]
      }
    })
  })

  it('renders all transactions', () => {
    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(2)
  })

  it('formats currency correctly', () => {
    const amounts = wrapper.findAll('td:nth-child(5)')
    expect(amounts[0].text()).toBe('$1,000.00')
    expect(amounts[1].text()).toBe('$500.00')
  })

  it('displays correct category names', () => {
    const categories = wrapper.findAll('td:nth-child(4)')
    expect(categories[0].text()).toBe('Salary')
    expect(categories[1].text()).toBe('Housing')
  })

  it('applies correct styling for income and expense', () => {
    const typeLabels = wrapper.findAll('td:nth-child(2) span')
    expect(typeLabels[0].classes()).toContain('bg-green-100')
    expect(typeLabels[1].classes()).toContain('bg-red-100')
  })

  it('calls delete transaction when delete button is clicked', async () => {
    const store = useTransactionStore()
    const deleteButton = wrapper.find('button.text-red-600')
    
    await deleteButton.trigger('click')
    
    expect(store.deleteTransaction).toHaveBeenCalledWith(1)
  })
})