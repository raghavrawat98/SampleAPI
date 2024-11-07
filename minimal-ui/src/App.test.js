import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Minimal UI Text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Minimal UI/i);
  expect(linkElement).toBeInTheDocument();
});
