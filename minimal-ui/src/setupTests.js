// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// src/setupTests.js

import { server } from './mocks/server';

// Start the server before all tests
beforeAll(() => server.listen());

// Reset any request handlers after each test
afterEach(() => server.resetHandlers());

// Stop the server after all tests
afterAll(() => server.close());
