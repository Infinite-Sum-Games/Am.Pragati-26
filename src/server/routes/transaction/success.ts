import { Elysia } from "elysia";

/**
 * PayU Success Callback Handler
 * ----------------------------------------------------------------------------
 * This route receives POST callback from PayU payment gateway after successful payment.
 * PayU sends transaction details which we can log or process.
 * Then redirect user to success page.
 */
export const successRoute = new Elysia()
	.post("/transaction/success", async ({ request, set }) => {
		try {
			const formData = await request.formData();

			// Extract PayU response data
			const txnId = formData.get("txnid") as string;
			// const status = formData.get("status") as string;
			// const amount = formData.get("amount") as string;
			// const hash = formData.get("hash") as string;
			// const firstname = formData.get("firstname") as string;
			// const email = formData.get("email") as string;
			// const productinfo = formData.get("productinfo") as string;
			// const mihpayid = formData.get("mihpayid") as string;
			// const mode = formData.get("mode") as string;

			// Redirect to success page with transaction ID
			const baseUrl = process.env.APP_PUBLIC_URL || "http://localhost:3000";

			const redirectUrl = txnId
				? `${baseUrl}/transactions/verify/${encodeURIComponent(txnId)}`
				: `${baseUrl}/transactions/success`;

			set.status = 303;
			set.headers.location = redirectUrl;
		} catch (_error) {
			const baseUrl = process.env.APP_PUBLIC_URL || "http://localhost:3000";

			set.status = 303;
			set.headers.location = `${baseUrl}/transactions/pending`;
		}
	})

	// Handle GET requests (in case PayU redirects via GET)
	.get("/transaction/success", ({ query, set }) => {
		const txnId = query.txnid as string | undefined;

		const baseUrl = process.env.APP_PUBLIC_URL || "http://localhost:3000";

		const redirectUrl = txnId
			? `${baseUrl}/transactions/verify/${encodeURIComponent(txnId)}`
			: `${baseUrl}/transactions/success`;

		set.status = 303;
		set.headers.location = redirectUrl;
	});
