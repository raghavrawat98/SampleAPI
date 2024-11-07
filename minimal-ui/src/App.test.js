import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Minimal UI Text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Minimal UI/i);
  expect(linkElement).toBeInTheDocument();
});

test('fetches and displays data on button click', async () => {
  render(<App />);

  // Find the GET button and click it
  const button = screen.getByText(/GET/i);
  fireEvent.click(button);

  // Expect the mocked data to appear in the text area
  const textArea = await screen.findByRole('div');
  expect(textArea.value).toContain('Chilly');
  expect(textArea.value).toContain('Mild');
});
