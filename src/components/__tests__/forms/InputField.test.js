import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputField from '../../forms/InputField.vue'

describe('InputField.vue', () => {
  it('renders label correctly', () => {
    const wrapper = mount(InputField, {
      props: {
        modelValue: '',
        label: 'Test Label',
        type: 'text'
      }
    })
    
    expect(wrapper.find('label').text()).toBe('Test Label')
  })

  it('emits update:modelValue event on input', async () => {
    const wrapper = mount(InputField, {
      props: {
        modelValue: '',
        label: 'Test Label',
        type: 'text'
      }
    })
    
    const input = wrapper.find('input')
    await input.setValue('new value')
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['new value'])
  })

  it('displays error message when provided', () => {
    const wrapper = mount(InputField, {
      props: {
        modelValue: '',
        label: 'Test Label',
        type: 'text',
        error: 'Test error message'
      }
    })
    
    expect(wrapper.find('.text-red-500').text()).toBe('Test error message')
  })

  it('applies error class when error is present', () => {
    const wrapper = mount(InputField, {
      props: {
        modelValue: '',
        label: 'Test Label',
        type: 'text',
        error: 'Test error message'
      }
    })
    
    expect(wrapper.find('input').classes()).toContain('border-red-500')
  })
})