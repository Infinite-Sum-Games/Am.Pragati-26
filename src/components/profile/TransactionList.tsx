import { Loader2 } from "lucide-react";
import { useState } from "react";

const mockTransactions = [
	{
		txn_id: "TXN123456789",
		created_at: "2026-03-10T10:30:00Z",
		registration_fee: 500.0,
		txn_status: "SUCCESS",
	},
	{
		txn_id: "TXN987654321",
		created_at: "2026-03-08T14:20:00Z",
		registration_fee: 300.0,
		txn_status: "PENDING",
	},
	{
		txn_id: "TXN123456789",
		created_at: "2026-03-10T10:30:00Z",
		registration_fee: 500.0,
		txn_status: "SUCCESS",
	},
	{
		txn_id: "TXN987654321",
		created_at: "2026-03-08T14:20:00Z",
		registration_fee: 300.0,
		txn_status: "PENDING",
	},
	{
		txn_id: "TXN123456789",
		created_at: "2026-03-10T10:30:00Z",
		registration_fee: 500.0,
		txn_status: "SUCCESS",
	},
	{
		txn_id: "TXN987654321",
		created_at: "2026-03-08T14:20:00Z",
		registration_fee: 300.0,
		txn_status: "PENDING",
	},
];

function formatDateTime(dateString: string) {
	if (!dateString) return "";
	const date = new Date(dateString);
	if (isNaN(date.getTime())) return dateString;
	const day = date.getDate().toString().padStart(2, "0");
	const month = date.toLocaleString("en-US", { month: "short" });
	const year = date.getFullYear();
	let hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12;
	hours = hours ? hours : 12;
	const time = `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
	return `${day} ${month} ${year}, ${time}`;
}

export default function TransactionList() {
	const data = mockTransactions;
	const isLoading = false;
	const error = null;
	const [verifyingTxId, setVerifyingTxId] = useState<string | null>(null);

	const onVerify = async (txn_id: string) => {
		setVerifyingTxId(txn_id);
		setTimeout(() => {
			setVerifyingTxId(null);
		}, 2000);
	};

	if (isLoading) {
		return (
			<div className="text-center py-12">
				<div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#00f0ff] border-t-transparent"></div>
				<p className="mt-4 text-white/70 font-vcr text-sm">Loading transactions...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-12">
				<p className="text-red-400 font-vcr">Unable to load Transactions</p>
				<p className="text-white/70 text-sm mt-2 font-vcr">Please try again later</p>
			</div>
		);
	}

	if (!data || data.length === 0) {
		return (
			<div className="max-w-3xl mx-auto px-4">
				<div className="bg-gradient-to-br from-black/90 via-[#0a0015]/95 to-black/90 rounded-xl border-2 border-[#00f0ff]/50 shadow-2xl shadow-[#00f0ff]/20 p-8">
					<div className="text-center text-white/70">
						<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#00f0ff]/20 to-[#ff00ff]/20 flex items-center justify-center border-2 border-[#00f0ff]/50">
							<svg
								className="w-8 h-8 text-[#00f0ff]"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
								/>
							</svg>
						</div>
						<h3 className="text-xl font-semibold text-[#00f0ff] mb-2 font-vcr">
							NO TRANSACTIONS
						</h3>
						<p className="font-vcr text-white/60 text-sm">You haven't made any transactions yet.</p>
					</div>
				</div>
			</div>
		);
	}

	const maxVisibleRows = 7;
	const isScrollable = data.length > maxVisibleRows;

	return (
		<div className="w-full max-w-4xl mx-auto px-4">
			<h2 className="text-2xl md:text-3xl font-bold text-center mb-6 font-vcr">
				<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#ff00ff] to-[#00f0ff]">
					TRANSACTION HISTORY
				</span>
			</h2>

			{/* Desktop Table */}
			<div className="hidden md:block">
				<div className="bg-gradient-to-br from-black/90 via-[#0a0015]/95 to-black/90 rounded-xl border-2 border-[#00f0ff]/50 shadow-2xl shadow-[#00f0ff]/20 overflow-hidden">
					{/* Top Neon Line */}
					<div className="h-0.5 bg-gradient-to-r from-[#ff00ff] via-[#00f0ff] to-[#ff00ff]"></div>

					<div className={isScrollable ? "max-h-80 overflow-y-auto" : ""}>
						<table className="min-w-full text-sm">
							<thead className="bg-gradient-to-r from-[#0a0033]/80 to-[#1a0033]/80 backdrop-blur-md border-b-2 border-[#00f0ff]/30 sticky top-0 z-10">
								<tr>
									<th className="py-3 px-3 text-center text-xs font-semibold text-[#00f0ff] uppercase tracking-wider w-[35%] font-vcr">
										Transaction ID
									</th>
									<th className="py-3 px-3 text-center text-xs font-semibold text-[#00f0ff] uppercase tracking-wider w-[25%] font-vcr">
										Date/Time
									</th>
									<th className="py-3 px-3 text-center text-xs font-semibold text-[#00f0ff] uppercase tracking-wider w-[15%] font-vcr">
										Amount
									</th>
									<th className="py-3 px-3 text-center text-xs font-semibold text-[#00f0ff] uppercase tracking-wider w-[15%] font-vcr">
										Status
									</th>
									<th className="py-3 px-3 text-center text-xs font-semibold text-[#00f0ff] uppercase tracking-wider w-[10%] font-vcr">
										Action
									</th>
								</tr>
							</thead>
							<tbody className="text-center">
								{data.map((tx, index) => (
									<tr
										key={tx.txn_id}
										className="border-t border-[#00f0ff]/10 text-xs hover:bg-[#00f0ff]/5 transition-colors duration-200"
									>
										<td className="py-3 px-3 text-white/90 font-mono truncate" title={tx.txn_id}>
											{tx.txn_id}
										</td>
										<td className="py-3 px-3 text-white/80 font-vcr">
											{formatDateTime(tx.created_at)}
										</td>
										<td className="py-3 px-3 text-[#00f0ff] font-bold font-vcr">
											₹{tx.registration_fee?.toFixed(2) ?? "0.00"}
										</td>
										<td className="py-3 px-3">
											<div className="flex justify-center">
												<span
													className={`px-3 py-1.5 rounded-lg text-xs font-bold font-vcr uppercase tracking-wider border-2 ${
														tx.txn_status === "SUCCESS"
															? "bg-green-500/20 border-green-500/60 text-green-400 shadow-md shadow-green-500/30"
															: tx.txn_status === "FAILED"
																? "bg-red-500/20 border-red-500/60 text-red-400 shadow-md shadow-red-500/30"
																: "bg-yellow-500/20 border-yellow-500/60 text-yellow-400 shadow-md shadow-yellow-500/30"
													}`}
												>
													{tx.txn_status}
												</span>
											</div>
										</td>
										<td className="py-3 px-3">
											<div className="flex justify-center">
												<button
													onClick={async () => {
														if (tx.txn_status === "PENDING") {
															setVerifyingTxId(tx.txn_id);
															try {
																await onVerify(tx.txn_id);
															} finally {
																setVerifyingTxId(null);
															}
														}
													}}
													disabled={tx.txn_status !== "PENDING" || verifyingTxId === tx.txn_id}
													className={`text-xs py-1.5 px-3 rounded-lg font-bold transition-all duration-300 min-w-14 font-vcr uppercase tracking-wider border-2 ${
														tx.txn_status === "PENDING"
															? "bg-green-500/20 border-green-500/60 text-green-400 hover:bg-green-500/30 hover:scale-105 cursor-pointer shadow-md shadow-green-500/30"
															: "bg-black/40 border-white/20 text-white/30 cursor-not-allowed"
													}`}
												>
													{verifyingTxId === tx.txn_id ? (
														<Loader2 className="h-3 w-3 animate-spin mx-auto" />
													) : (
														"Verify"
													)}
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Bottom Neon Line */}
					<div className="h-0.5 bg-gradient-to-r from-[#00f0ff] via-[#ff00ff] to-[#00f0ff]"></div>
				</div>
			</div>

			{/* Mobile Cards - Now with scrolling */}
			<div className="md:hidden">
				<div className="max-h-[32rem] overflow-y-auto pb-4 space-y-3 pr-1">
					{data.map((tx, index) => (
						<div
							key={`${tx.txn_id}-${index}`}
							className="bg-gradient-to-br from-black/90 via-[#0a0015]/95 to-black/90 border-2 border-[#00f0ff]/50 rounded-xl p-4 shadow-lg shadow-[#00f0ff]/20"
						>
							<div className="grid grid-cols-3 gap-2 text-xs">
								<div className="col-span-2">
									<span className="text-[#00f0ff] font-medium font-vcr uppercase text-xs">
										Transaction ID:
									</span>
									<p className="text-white/90 font-mono mt-1 break-all text-xs">{tx.txn_id}</p>
								</div>
								<div className="col-span-1">
									<span className="text-[#00f0ff] font-medium font-vcr uppercase text-xs">Amount:</span>
									<p className="text-white font-bold mt-1 text-[#00f0ff] text-sm">
										₹{tx.registration_fee?.toFixed(2) ?? "0.00"}
									</p>
								</div>
								<div className="col-span-2">
									<span className="text-[#00f0ff] font-medium font-vcr uppercase text-xs">
										Date/Time:
									</span>
									<p className="text-white/80 mt-1 text-xs">{formatDateTime(tx.created_at)}</p>
								</div>
								<div>
									<span className="text-[#00f0ff] font-medium font-vcr uppercase text-xs">Status:</span>
									<div className="mt-1.5">
										<span
											className={`px-2 py-1 rounded-lg text-xs font-bold font-vcr uppercase border-2 ${
												tx.txn_status === "SUCCESS"
													? "bg-green-500/20 border-green-500/60 text-green-400"
													: tx.txn_status === "FAILED"
														? "bg-red-500/20 border-red-500/60 text-red-400"
														: "bg-yellow-500/20 border-yellow-500/60 text-yellow-400"
											}`}
										>
											{tx.txn_status}
										</span>
									</div>
								</div>
								<div className="col-span-3 flex justify-center mt-2">
									<button
										onClick={async () => {
											if (tx.txn_status === "PENDING") {
												setVerifyingTxId(tx.txn_id);
												try {
													await onVerify(tx.txn_id);
												} finally {
													setVerifyingTxId(null);
												}
											}
										}}
										disabled={tx.txn_status !== "PENDING" || verifyingTxId === tx.txn_id}
										className={`flex items-center justify-center text-xs py-2 px-5 rounded-lg font-bold transition-all duration-300 w-full max-w-[160px] font-vcr uppercase border-2 ${
											tx.txn_status === "PENDING"
												? "bg-green-500/20 border-green-500/60 text-green-400 hover:bg-green-500/30 hover:scale-105 cursor-pointer"
												: "bg-black/40 border-white/20 text-white/30 cursor-not-allowed"
										}`}
									>
										{verifyingTxId === tx.txn_id ? (
											<Loader2 className="h-4 w-4 animate-spin mx-auto" />
										) : (
											"Verify"
										)}
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}