import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const user = {
    _id: '5a43e6b6c37f3d065eaaa581',
    username: 'mluukkai',
    name: 'Matti Luukkainen'
  }
  const blog = {
    _id: '5a43fde2cbd20b12a2c34e91',
    user: {
      _id: '5a43e6b6c37f3d065eaaa581',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    },
    likes: 0,
    author: 'Joel Spolsky',
    title: 'The Joel Test: 12 Steps to Better Code',
    url: 'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/'
  }
  let mockHandler = null
  beforeEach(() => {
    mockHandler = jest.fn()
    component = render(
      <Blog blog={blog} user={user} like={mockHandler}/>
    )
  })


  test('at start the url and likes are not displayed', () => {
    const div = component.container.querySelector('.fullblog')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.fullblog')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent('likes')

  })

  test('clicking the like button twice calls event handler twice', () => {
    const button = component.container.querySelector('.likebtn')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
