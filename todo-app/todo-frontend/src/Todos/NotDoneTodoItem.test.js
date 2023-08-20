import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import NotDoneTodoItem from './NotDoneTodoItem'

test('renders content', () => {
  const todo = {
    text: 'test',
    done: true
  }

  render(<NotDoneTodoItem todo={todo} />)

  const element = screen.getByText('This todo is not done')
  expect(element).toBeDefined()
})