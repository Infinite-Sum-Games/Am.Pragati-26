"use client";

import { ArrowRight } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { GST_RATE } from "@/lib/constants";
import { formatCurrency } from "@/lib/utilityFunctions";

interface CheckoutSummaryDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	eventName: string;
	unitPrice: number;
	quantity: number;
	unit?: string;
	onConfirm: () => void;
}

export default function CheckoutSummaryDialog({
	open,
	onOpenChange,
	eventName,
	unitPrice,
	quantity,
	unit = "Item",
	onConfirm,
}: CheckoutSummaryDialogProps) {
	const subtotal = unitPrice * quantity;
	const gstAmount = +(subtotal * GST_RATE);
	const total = +(subtotal + gstAmount);

	const formattedUnit = quantity === 1 ? unit : `${unit}s`;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="w-[90%] sm:w-full sm:max-w-3xl rounded-lg px-4 md:px-6">
				<DialogHeader>
					<DialogTitle className="font-bold text-center md:text-left">
						Checkout Summary
					</DialogTitle>
				</DialogHeader>

				<div className="bg-card border border-border rounded-lg p-4 space-y-4">
					{/* Event Name & Details */}
					<div className="space-y-2">
						<div className="grid grid-cols-[1fr_auto] md:hidden items-center gap-x-2">
							<div className="font-medium text-foreground text-lg truncate min-w-0 flex-1">
								{eventName}
							</div>
							<div className="text-right text-foreground/70 font-mono whitespace-nowrap ml-2">
								x{quantity}
								{unit !== "Individual" ? ` ${formattedUnit}` : ""}
							</div>
						</div>

						<div className="md:hidden text-right font-semibold text-foreground">
							{subtotal === 0 ? "Free" : formatCurrency(subtotal)}
						</div>

						<div className="hidden md:grid grid-cols-[minmax(0,3fr)_auto_minmax(0,1fr)] items-center gap-x-4">
							<div className="font-medium text-foreground text-lg truncate min-w-0 flex-1">
								{eventName}
							</div>
							<div className="text-center text-foreground/70 font-mono whitespace-nowrap">
								x{quantity}
								{unit !== "Individual" ? ` ${formattedUnit}` : ""}
							</div>
							<div className="text-right font-semibold text-foreground">
								{subtotal === 0 ? "Free" : formatCurrency(subtotal)}
							</div>
						</div>
					</div>

					{/* GST */}
					<div className="flex items-center justify-between text-sm text-foreground/80">
						<div>GST ({GST_RATE * 100}%)</div>
						<div>{gstAmount === 0 ? "₹0.00" : formatCurrency(gstAmount)}</div>
					</div>

					{/* Total */}
					<div className="border-t border-border pt-3 flex items-center justify-between">
						<div className="font-bold text-xl text-foreground">Total</div>
						<div className="font-bold text-xl text-foreground">
							{total === 0 ? "Free" : formatCurrency(total)}
						</div>
					</div>

					<div className="flex gap-4 md:gap-8 pt-4">
						<button
							type="button"
							onClick={() => onOpenChange(false)}
							className="w-full px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 rounded-md transition-colors"
						>
							Cancel
						</button>

						<button
							type="button"
							onClick={() => {
								onConfirm();
							}}
							className="w-full px-4 py-2 bg-primary font-bold text-primary-foreground rounded-md flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors group"
						>
							<span className="hidden sm:inline">Confirm Checkout</span>
							<span className="sm:hidden">Checkout</span>
							<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
						</button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
