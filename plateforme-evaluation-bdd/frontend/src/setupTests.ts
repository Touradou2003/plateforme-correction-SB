import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Mock Chart.js
jest.mock('chart.js', () => ({
  Chart: jest.fn(),
  registerables: [],
  register: jest.fn(),
}));

// Mock des variables d'environnement
process.env.VITE_API_URL = 'http://localhost:3000';
process.env.VITE_APP_NAME = 'Plateforme Evaluation';

// Configure testing library
configure({
  testIdAttribute: 'data-testid',
}); 