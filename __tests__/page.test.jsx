import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Page from '../app/page'
 
describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)
  })
})