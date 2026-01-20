import { apiGet, apiPost } from '@/lib/api';

/**
 * ExampleService
 * Replace 'example' with your feature name
 * Use for both GET and POST APIs
 */

export const ExampleService = {
  // Public GET (no auth)
  getPublicData: <T>(): Promise<T> => apiGet('/example/public', { skipAuth: true }),

  // Protected GET (with token)
  getProtectedData: <T>(): Promise<T> => apiGet('/example/protected'),

  // Protected POST (with token)
  postProtectedAction: <T>(payload: unknown): Promise<T> => apiPost('/example/action', payload),
};