import { createFileRoute, createRoute, Link } from "@tanstack/react-router";
import React from "react";
import Lottie from "react-lottie";
import { GlassFormWrapper } from "@/components/GlassFormWrapper";
import { Button } from "@/components/ui/button";
// Import your pending animation
import animationData from "@/public/lotties/transactionPending.json";

export const Route = createRoute("/transactions/pending/")({
	path: "/transactions/pending",
	component: PaymentPending,
});

function PaymentPending() {
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
			<GlassFormWrapper className="max-w-lg w-full text-center">
				<div className="flex items-center justify-center mb-6">
					<Lottie options={defaultOptions} height={200} width={200} />
				</div>

				<h1 className="text-3xl font-bold text-foreground mb-6">
					Payment Pending
				</h1>

				<p className="text-lg text-muted-foreground mb-8">
					Your payment is being processed.
				</p>

				<p className="text-xs text-muted-foreground mb-4 leading-relaxed">
					Wait for 10 minutes and check your profile under "Transactions".
				</p>

				<p className="text-xs text-muted-foreground mb-8 leading-relaxed">
					Click "Verify" for the corresponding transaction to complete
					registration.
				</p>

				<div className="space-y-3">
					<Link to="/profile" className="block">
						<Button variant="outline" className="w-full">
							View Transactions
						</Button>
					</Link>

					<Link to="/" className="block pb-6">
						<Button className="w-full btn-primary-enhanced">
							Back to Home
						</Button>
					</Link>
				</div>
			</GlassFormWrapper>
		</main>
	);
}
