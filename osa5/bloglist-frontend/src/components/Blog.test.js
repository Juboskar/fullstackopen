import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  const mockHandleLike = jest.fn()
  const mockHandleDelete = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'testing is fun',
      author: 'random',
      url: 'http://example.com/test',
      likes: 42,
      user: {
        username: 'test user',
        name: 'Testi Usersson',
        id: '1337'
      },
      id: '1990'
    }
    const user = {
      username: 'hellotests',
      name: 'hello i am tester',
    }
    container = render(
      <Blog blog={blog} user={user} blogs={[]} handleLike={mockHandleLike} handleDelete={mockHandleDelete} />
    ).container
  })

  test('renders content', () => {
    const title = screen.getByText('testing is fun')
    expect(title).toBeDefined()
    const author = screen.getByText('random')
    expect(author).toBeDefined()
    const url = screen.getByText('http://example.com/test')
    expect(url).toBeDefined()
    const likes = screen.getByText('42')
    expect(likes).toBeDefined()
  })

  test('author and title visible', () => {
    const div = container.querySelector('.shownContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('url and likes not visible', () => {
    const div = container.querySelector('.hiddenContent')
    expect(div).toHaveStyle('display: none')
  })

  test('url and likes visible after click', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByText('view'))

    const div = container.querySelector('.hiddenContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('like button works', async () => {
    const user = userEvent.setup()

    await user.click(screen.getByText('like'))
    await user.click(screen.getByText('like'))

    expect(mockHandleLike.mock.calls).toHaveLength(2)
  })
})