import { apiPost } from "@/lib/api";
import { API_ROUTES } from "@/lib/routes";
import type {
	TransactionVerificationPayload,
	TransactionVerificationResponse,
} from "@/types/transactionTypes";

/**
 * TransactionService
 * ----------------------------------------------------------------------------
 * Service layer for handling transaction-related API calls.
 * Safe for client-side use (no Node.js dependencies).
 */

export const TransactionService = {
	/**
	 * Verify transaction status with the backend
	 * @param payload - Transaction ID to verify
	 * @returns Promise with verification response
	 */
	verifyTransaction: async (
		payload: TransactionVerificationPayload,
	): Promise<TransactionVerificationResponse> => {
		try {
			// biome-ignore lint/suspicious/noExplicitAny: allowed any
			const response = await apiPost<any>(
				API_ROUTES.TRANSACTIONS.VERIFY,
				payload,
			);

			// Normalize the response status to lowercase for consistency
			const normalizedResponse: TransactionVerificationResponse = {
				...response,
				status: (response.status?.toLowerCase() || "pending") as
					| "success"
					| "failed"
					| "pending",
			};

			return normalizedResponse;
			// biome-ignore lint/suspicious/noExplicitAny: allowed any
		} catch (error: any) {
			const message =
				error?.response?.data?.message ||
				error.message ||
				"Transaction verification failed";
			throw new Error(message);
		}
	},
};
