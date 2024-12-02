import { Pact } from '@pact-foundation/pact';
import path from 'path';
import fetchMock from 'jest-fetch-mock';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import App from '../../src/App';

//fetchMock.enableMocks(); // Enable fetch-mock for testing

describe('Pact Consumer Test', () => {
  const provider = new Pact({
    consumer: 'MinimalUI', // Your React App
    provider: 'WeatherForecastAPI', // Your API service
    port: 5259, // Mock server port
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'info',
  });

  beforeAll(() => provider.setup()); // Start the mock server
  afterAll(() => provider.finalize()); // Generate the Pact file
  afterEach(() => provider.verify()); // Verify interactions after each test

  it('should fetch and display data from /api/WeatherForecast/Get', async () => {
    // Define the interaction
    await provider.addInteraction({
      state: 'Weather data exists',
      uponReceiving: 'a request for Weather data',
      withRequest: {
        method: 'GET',
        path: '/api/WeatherForecast/Get',
      },
      willRespondWith: {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: [
            {
              "date": "2024-11-22",
              "temperatureC": 45,
              "temperatureF": 112,
              "summary": "Freezing"
            },
            {
              "date": "2024-11-23",
              "temperatureC": -14,
              "temperatureF": 7,
              "summary": "Sweltering"
            }
          ]
      },// Response Data
    });

    // Mock fetch
    fetchMock.mockIf(/^http:\/\/localhost:5259\/api\/WeatherForecast\/Get$/, async () => {
      return JSON.stringify([
        {
          "date": "2024-11-22",
          "temperatureC": 45,
          "temperatureF": 112,
          "summary": "Freezing"
        },
        {
          "date": "2024-11-23",
          "temperatureC": -14,
          "temperatureF": 7,
          "summary": "Sweltering"
        }
      ]);
    });

    // Render the App
    render(<App />);

    // Simulate user interaction (button click)
    fireEvent.click(screen.getByText('GET'));

    // Wait for the textarea to update
    await waitFor(() => {
      const textarea = screen.getByRole('textbox');
      expect(textarea.value).toContain('date'); // Verify response content
      expect(textarea.value).toContain('temperatureC');
      expect(textarea.value).toContain('2024-11-22');
      expect(textarea.value).toContain('2024-11-23');
      expect(textarea.value).toContain('45');
      expect(textarea.value).toContain('-14');
    });
  });
});
