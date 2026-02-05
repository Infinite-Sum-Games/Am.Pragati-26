'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { TransactionService } from '@/services/TransactionVerificationService';
import type {
  TransactionVerificationPayload,
  TransactionVerificationResponse,
} from '@/types/transactionTypes';

/**
 * Hook for verifying transaction status
 * Automatically redirects to appropriate page based on status
 * Shows toast notifications for errors
 */
export function useVerifyTransaction() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (
      payload: TransactionVerificationPayload,
    ): Promise<TransactionVerificationResponse> => {
      const result = await TransactionService.verifyTransaction(payload);
      return result;
    },
    onSuccess: (data) => {
      // Redirect based on status
      setTimeout(() => {
        let redirectPath = '';
        switch (data.status) {
          case 'success':
            redirectPath = '/transactions/success';
            break;
          case 'failed':
            redirectPath = '/transactions/failure';
            break;
          default:
            redirectPath = '/transactions/pending';
        }

        router.push(redirectPath);
      }, 2000);
    },
    onError: (error: Error) => {
      toast.error(
        error.message || 'Failed to verify transaction. Please try again.',
      );

      // Redirect to pending page on error after a delay
      setTimeout(() => {
        router.push('/transactions/pending');
      }, 3000);
    },
  });
}
