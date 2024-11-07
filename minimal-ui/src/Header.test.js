// src/Header.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders the text "Minimal UI"', () => {
  // Render the Header component
  render(<Header />);
  
  // Check if the text "Minimal UI" is in the document
  const headerElement = screen.getByText(/Minimal UI/i);
  expect(headerElement).toBeInTheDocument();
});
