import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AddForm from './AddForm'

describe('<AddForm />', () => {
  let component = null
  let mockHandler = null
  beforeEach(() => {
    mockHandler = jest.fn()
    component = render(
      <AddForm createBlog={mockHandler}/>
    )
  })


  test('clicking the like button twice calls event handler twice', () => {
    const input = component.container.querySelector('#author')
    const form = component.container.querySelector('form')

    fireEvent.change(input, {
      target: { value: 'checkauthor' }
    })
    fireEvent.submit(form)
    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].author).toBe('checkauthor' )
  })
})
