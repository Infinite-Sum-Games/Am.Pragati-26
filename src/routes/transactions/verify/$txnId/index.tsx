import { createFileRoute, createRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import Lottie from "lottie-react";
import { useVerifyTransaction } from "@/hooks/useVerifyTransaction";

// Import your verifying animation
import animationData from "../../../../../public/lotties/transactionVerify.json";

export const Route = createFileRoute("/transactions/verify/$txnId/")({
  component: PaymentVerifying,
});



function PaymentVerifying() {
	const { txnId } = Route.useParams();
	const { mutate: verifyTransaction, status, data } = useVerifyTransaction();

	useEffect(() => {
		if (txnId) {
			verifyTransaction({ txn_id: txnId });
		}
	}, [txnId, verifyTransaction]);

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	}

	const getStatusText = () => {
		if (status === "success" && data?.status === "success") {
			return {
				title: "Verification Complete!",
				subtitle: "Redirecting to success page...",
				description: "Your payment has been successfully verified.",
			}
		}

		if (status === "success" && data?.status === "failed") {
			return {
				title: "Verification Failed",
				subtitle: "Redirecting...",
				description: "There was an issue with your payment verification.",
			}
		}

		if (status === "error") {
			return {
				title: "Verification Error",
				subtitle: "Redirecting to pending page...",
				description: "Unable to verify transaction at this time.",
			}
		}

		return {
			title: "Verifying Payment",
			subtitle: "Please wait while we process your transaction...",
			description: "Do not close this page or navigate away.",
		}
	}

	const statusText = getStatusText();

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-4">
			<div className="flex items-center justify-center mb-6">
				<Lottie options={defaultOptions} height={200} width={200} />
			</div>

			<h1
				className={`text-3xl font-bold mb-2 ${
					status === "success" && data?.status === "success"
						? "text-green-400"
						: status === "error" || data?.status === "failed"
							? "text-destructive"
							: "text-foreground"
				}`}
			>
				{statusText.title}
			</h1>

			<p className="text-lg text-muted-foreground mb-4">
				{statusText.subtitle}
			</p>

			<div className="space-y-2 text-sm text-muted-foreground mb-4">
				<p>{statusText.description}</p>
				{txnId && (
					<p>
						Transaction ID:{" "}
						<span className="font-mono font-semibold text-foreground">
							{txnId}
						</span>
					</p>
				)}
			</div>
		</main>
	)
}
