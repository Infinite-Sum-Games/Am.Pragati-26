import { PAYU_MERCHANT_KEY, PAYU_URL } from "@/lib/constants";
import type { BookingResponse } from "@/types/bookingTypes";

/**
 * usePaymentFromBooking
 * ----------------------------------------------------------------------------
 * Hook to handle PayU payment redirect after booking.
 * Takes booking response data and creates a form to redirect to PayU gateway.
 *
 * The booking endpoint returns all necessary payment data including:
 * - hash: Pre-computed payment hash from backend
 * - txnId: Transaction ID
 * - userEmail, name, phone: User details
 * - registrationFee: Amount to be paid
 * - productInfo: Product description
 */
export function usePaymentFromBooking() {
	/**
	 * Redirect to PayU payment gateway with booking response data
	 */
	const redirectToPayment = (bookingData: BookingResponse) => {
		// Check if booking response contains payment data
		if (
			!bookingData.hash ||
			!bookingData.txnId ||
			!bookingData.registrationFee
		) {
			throw new Error("Invalid payment data received from booking");
		}

		// Get PayU payment URL from configuration
		const paymentUrl = PAYU_URL;

		// Construct success and failure URLs
		// const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;
		// const successUrl = `${baseUrl}/api/transactions/success`;
		// const failureUrl = `${baseUrl}/api/transactions/failure`;

		// Frontend base URL (for redirects later)
		// const frontendBaseUrl =
		// 	import.meta.env.VITE_APP_URL || window.location.origin;

		// Backend base URL (for PayU callbacks)
		const backendBaseUrl =
			import.meta.env.VITE_API_URL || window.location.origin;

		const successUrl = `${backendBaseUrl}/transaction/success`;
		const failureUrl = `${backendBaseUrl}/transaction/failure`;

		// Create PayU payment form with data from booking response
		const paymentForm = {
			key: PAYU_MERCHANT_KEY,
			txnid: bookingData.txnId,
			amount: bookingData.registrationFee,
			productinfo: bookingData.productInfo || "Event Registration",
			firstname: bookingData.name || "User",
			email: bookingData.userEmail || "",
			phone: bookingData.phone || "",
			surl: successUrl,
			furl: failureUrl,
			hash: bookingData.hash,
		};

		// Create and submit hidden form to PayU
		const form = document.createElement("form");
		form.method = "POST";
		form.action = paymentUrl;

		// Add all form fields
		Object.entries(paymentForm).forEach(([key, value]) => {
			const input = document.createElement("input");
			input.type = "hidden";
			input.name = key;
			input.value = value;
			form.appendChild(input);
		});

		// Submit form
		document.body.appendChild(form);
		form.submit();
		document.body.removeChild(form);
	};

	return { redirectToPayment };
}
