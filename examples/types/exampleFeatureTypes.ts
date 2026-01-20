/**
 * Example types for a feature
 * - All example-related types go here
 * - Keep types small and readable
 */

export type ExampleItem = {
  id: string;
  title: string;
  description: string;
  date?: string;
};

export type ExampleActionPayload = {
  exampleId: string;
  actionType: 'register' | 'like';
};