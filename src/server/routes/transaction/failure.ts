import { Elysia } from "elysia";

/**
 * PayU Failure Callback Handler
 * ----------------------------------------------------------------------------
 * This route receives POST callback from PayU payment gateway after failed payment.
 * PayU sends transaction details which we can log or process.
 * Then redirect user to failure page.
 */
export const failureRoute = new Elysia()
	.post("/transaction/failure", async ({ request, set }) => {
		try {
			const formData = await request.formData();

			// Extract PayU response data
			const txnId = formData.get("txnid") as string;
			// const status = formData.get("status") as string;
			// const amount = formData.get("amount") as string;
			// const error = formData.get("error") as string;
			// const errorMessage = formData.get("error_Message") as string;
			// const firstname = formData.get("firstname") as string;
			// const email = formData.get("email") as string;
			// const productinfo = formData.get("productinfo") as string;
			// const mihpayid = formData.get("mihpayid") as string;
			// const mode = formData.get("mode") as string;

			// Redirect to failure page with transaction ID
			const baseUrl = process.env.APP_PUBLIC_URL || "http://localhost:3000";

			const redirectUrl = txnId
				? `${baseUrl}/transactions/verify/${encodeURIComponent(txnId)}`
				: `${baseUrl}/transactions/failure`;

			set.status = 303;
			set.headers.location = redirectUrl;
		} catch (error) {
			const baseUrl = process.env.APP_PUBLIC_URL || "http://localhost:3000";

			set.status = 303;
			set.headers.location = `${baseUrl}/transactions/failure`;
		}
	})

	// Handle GET requests (in case PayU redirects via GET)
	.get("/transaction/failure", ({ query, set }) => {
		const txnId = query.txnid as string | undefined;

		const baseUrl = process.env.APP_PUBLIC_URL || "http://localhost:3000";

		const redirectUrl = txnId
			? `${baseUrl}/transactions/verify/${encodeURIComponent(txnId)}`
			: `${baseUrl}/transactions/failure`;

		console.log("Redirecting to:", redirectUrl);
		console.log("===== PayU Failure GET Callback - Completed =====\n");

		set.status = 303;
		set.headers.location = redirectUrl;
	});
