import { createFileRoute, createRoute, Link } from "@tanstack/react-router";
import React, { useState } from "react";
import Lottie from "react-lottie";
import { GlassFormWrapper } from "@/components/GlassFormWrapper";
import { Button } from "@/components/ui/button";
// Import your success animation
import animationData from "@/public/lotties/transactionSuccess.json";

export const Route = createRoute("/transactions/success/")({
	path: "/transactions/success",
	component: PaymentSuccess,
});

function PaymentSuccess() {
	const defaultOptions = {
		loop: false, // Success animation should play once
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
					<Lottie options={defaultOptions} height={200} width={200} />
				</div>

				<h1 className="text-3xl font-bold text-foreground mb-2">
					Payment Successful!
				</h1>

				<p className="text-muted-foreground mb-6">
					Your transaction has been completed successfully.
				</p>

				<div className="space-y-3 pb-6">
					<Link to="/profile" className="block">
						<Button variant="outline" className="w-full">
							View Ticket
						</Button>
					</Link>

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
