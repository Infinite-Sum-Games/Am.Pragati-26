import { createFileRoute, createRoute, Link } from "@tanstack/react-router";
import React from "react";
import Lottie from "react-lottie";
import { GlassFormWrapper } from "@/components/GlassFormWrapper";
import { Button } from "@/components/ui/button";
// Import your failure animation
import animationData from "@/public/lotties/transactionFailed.json";

export const Route = createRoute("/transactions/failure/")({
	path: "/transactions/failure",
	component: PaymentFailure,
});

function PaymentFailure() {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-4">
			<GlassFormWrapper className="max-w-md w-full text-center">
				<div className="flex items-center justify-center mb-6">
					<Lottie options={defaultOptions} height={180} width={180} />
				</div>

				<h1 className="text-3xl font-bold text-destructive mb-2">
					Payment Failed
				</h1>

				<p className="text-muted-foreground mb-2">
					We couldn't process your payment.
				</p>

				<p className="text-sm text-muted-foreground mb-6">
					Please try again later or contact support if the issue persists.
				</p>

				<div className="space-y-3 pb-6">
					<Link to="/" className="block">
						<Button className="w-full btn-primary-enhanced">
							Back to Home
						</Button>
					</Link>
				</div>
			</GlassFormWrapper>
		</main>
	);
}
