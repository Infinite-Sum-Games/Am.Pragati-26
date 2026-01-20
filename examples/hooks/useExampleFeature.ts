import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ExampleService } from '../services/exampleFeatureService';
import { toast } from 'react-hot-toast';
import type { ExampleItem, ExampleActionPayload } from '../types/exampleFeatureTypes';

/**
 * Example hook: GET public data
 */
export function useExampleData() {
  return useQuery<ExampleItem[]>({
    queryKey: ['examplePublic'],
    queryFn: ExampleService.getPublicData,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Example hook: GET protected data
 */
export function useExampleProtectedData() {
  return useQuery<ExampleItem[]>({
    queryKey: ['exampleProtected'],
    queryFn: ExampleService.getProtectedData,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Example hook: POST protected action
 */
export function useExampleAction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ExampleActionPayload) => ExampleService.postProtectedAction(payload),
    onSuccess: () => {
      toast.success('Action successful!');
      queryClient.invalidateQueries({ queryKey: ['exampleProtected'] });
    },
    onError: () => {
      toast.error('Action failed.');
    },
  });
}