import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

/*test('renders Minimal UI Text', () => {//
  render(<App />);
  const linkElement = screen.getByText(/Minimal UI/i);
  expect(linkElement).toBeInTheDocument();
});*/

test('mocks GET request and displays the desired output', async () => {
  // Mock the fetch function
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          { date: '2024-01-01', temperatureC: 5, summary: 'Chilly' },
          { date: '2024-01-02', temperatureC: 10, summary: 'Mild' }
        ])
    })
  );

  render(<App />);

  // Click the GET button
  const button = screen.getByText(/get/i);
  fireEvent.click(button);

  // Wait for the textarea to update with the mocked data
  const textArea = await screen.findByRole('textbox');
  await waitFor(() => {
    expect(textArea.value).toContain('Chilly');
    expect(textArea.value).toContain('Mild');
  });

  // Clean up the fetch mock
  global.fetch.mockRestore();
});
