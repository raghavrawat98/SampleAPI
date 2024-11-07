// src/mocks/handlers.js

import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:5259/api/WeatherForecast/Get', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { date: '2024-01-01', temperatureC: 5, summary: 'Chilly' },
        { date: '2024-01-02', temperatureC: 10, summary: 'Mild' }
      ])
    );
  })
];
