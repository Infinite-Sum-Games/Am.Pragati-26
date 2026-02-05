import { apiGet, apiPost } from '@/lib/api';
import { API_ROUTES } from '@/lib/routes';
import type {
  Transaction,
  TransactionVerificationResponse,
} from '@/types/transactionTypes';

export const transactionService = {
  getTransactions: async (): Promise<Transaction[]> => {
    const res = await apiGet<{ message: string; transactions: Transaction[] }>(
      API_ROUTES.TRANSACTIONS.GET,
    );
    return res.transactions;
  },

  verifyTransaction: async (
    txn_id: string,
  ): Promise<TransactionVerificationResponse> => {
    const payload = { txn_id: txn_id };
    const res = await apiPost<TransactionVerificationResponse>(
      API_ROUTES.TRANSACTIONS.VERIFY,
      payload,
    );

    const response: TransactionVerificationResponse = {
      ...res,
      status: (res.status ||
        'pending') as TransactionVerificationResponse['status'],
    };

    return response;
  },
};
