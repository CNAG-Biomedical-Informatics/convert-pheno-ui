import React from 'react'
import Home from './Home'
import { BrowserRouter as Router } from 'react-router-dom';

describe('<Home />', () => {
  it('renders', () => {
    cy.mount
    (
      <Router>
        <Home />
      </Router>
    )
  })
})