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
	if (Number.isNaN(date.getTime())) return dateString;
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
				<div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#a855f7] border-t-transparent"></div>
				<p className="mt-4 text-white/70 font-vcr text-sm">
					Loading transactions...
				</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-12">
				<p className="text-red-400 font-vcr">Unable to load Transactions</p>
				<p className="text-white/70 text-sm mt-2 font-vcr">
					Please try again later
				</p>
			</div>
		);
	}

	if (!data || data.length === 0) {
		return (
			<div className="max-w-3xl mx-auto px-4">
				<div className="bg-black/60 backdrop-blur-sm border border-retro-cyan/30 p-8 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
					<div className="text-center text-white/50">
						<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-black/40 border border-[#a855f7]/30 flex items-center justify-center">
							<svg
								className="w-8 h-8 text-[#a855f7]/50"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								role="img"
								aria-label="No transactions icon"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
								/>
							</svg>
						</div>
						<h3 className="text-xl font-bold text-[#a855f7] mb-2 font-vcr tracking-wider">
							NO TRANSACTIONS
						</h3>
						<p className="font-vcr text-sm">
							You haven't made any transactions yet.
						</p>
					</div>
				</div>
			</div>
		);
	}

	const maxVisibleRows = 7;
	const isScrollable = data.length > maxVisibleRows;

	return (
		<div className="w-full max-w-4xl mx-auto px-4">
			<h2 className="text-3xl md:text-5xl font-bold text-center mb-8 font-jersey15 text-white drop-shadow-[2px_2px_0px_#a855f7]">
				TRANSACTION HISTORY
			</h2>

			{/* Desktop Table */}
			<div className="hidden md:block">
				<div className="bg-black/60 backdrop-blur-sm border border-retro-cyan/30 shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden">
					{/* Top Neon Line */}
					<div className="h-0.5 w-full bg-linear-to-r from-transparent via-[#a855f7] to-transparent"></div>

					<div
						className={
							isScrollable ? "max-h-80 overflow-y-auto custom-scrollbar" : ""
						}
					>
						<table className="min-w-full text-sm">
							<thead className="bg-black/40 border-b border-white/10 sticky top-0 z-10 backdrop-blur-md">
								<tr>
									<th className="py-4 px-4 text-center text-xs font-bold text-retro-cyan uppercase tracking-widest w-[35%] font-vcr">
										Transaction ID
									</th>
									<th className="py-4 px-4 text-center text-xs font-bold text-retro-cyan uppercase tracking-widest w-[25%] font-vcr">
										Date/Time
									</th>
									<th className="py-4 px-4 text-center text-xs font-bold text-retro-cyan uppercase tracking-widest w-[15%] font-vcr">
										Amount
									</th>
									<th className="py-4 px-4 text-center text-xs font-bold text-retro-cyan uppercase tracking-widest w-[15%] font-vcr">
										Status
									</th>
									<th className="py-4 px-4 text-center text-xs font-bold text-retro-cyan uppercase tracking-widest w-[10%] font-vcr">
										Action
									</th>
								</tr>
							</thead>
							<tbody className="text-center divide-y divide-white/5">
								{data.map((tx) => (
									<tr
										key={tx.txn_id}
										className="hover:bg-white/5 transition-colors duration-200"
									>
										<td
											className="py-4 px-4 text-white/70 font-vcr truncate"
											title={tx.txn_id}
										>
											{tx.txn_id}
										</td>
										<td className="py-4 px-4 text-white/60 font-vcr">
											{formatDateTime(tx.created_at)}
										</td>
										<td className="py-4 px-4 text-white font-bold font-vcr">
											₹{tx.registration_fee?.toFixed(2) ?? "0.00"}
										</td>
										<td className="py-4 px-4">
											<div className="flex justify-center">
												<span
													className={`px-3 py-1 text-[10px] font-bold font-vcr uppercase tracking-wider border ${
														tx.txn_status === "SUCCESS"
															? "bg-[#16a34a]/20 border-[#16a34a] text-[#16a34a]"
															: tx.txn_status === "FAILED"
																? "bg-red-500/20 border-red-500 text-red-500"
																: "bg-yellow-500/20 border-yellow-500 text-yellow-500"
													}`}
												>
													{tx.txn_status}
												</span>
											</div>
										</td>
										<td className="py-4 px-4">
											<div className="flex justify-center">
												<button
													type="button"
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
													disabled={
														tx.txn_status !== "PENDING" ||
														verifyingTxId === tx.txn_id
													}
													className={`text-[10px] py-1.5 px-3 font-bold transition-all duration-100 min-w-16 font-vcr uppercase tracking-wider border-2 border-black 
														${
															tx.txn_status === "PENDING"
																? "bg-[#7c3aed] text-white hover:bg-[#6d28d9] cursor-pointer shadow-[2px_2px_0_rgba(0,0,0,1)] hover:shadow-[3px_3px_0_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
																: "bg-gray-700 text-gray-500 border-gray-900 shadow-none cursor-not-allowed hidden"
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
				</div>
			</div>

			{/* Mobile Cards - Now with scrolling */}
			<div className="md:hidden">
				<div className="max-h-[32rem] overflow-y-auto pb-4 space-y-3 pr-1 custom-scrollbar">
					{data.map((tx, index) => (
						<div
							key={`${tx.txn_id}-${index}`}
							className="bg-black/60 backdrop-blur-sm border border-retro-cyan/30 p-5 shadow-[0_0_10px_rgba(0,0,0,0.3)] relative overflow-hidden"
						>
							<div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-[#a855f7] to-transparent"></div>

							<div className="grid grid-cols-3 gap-3 text-xs">
								<div className="col-span-3 pb-2 border-b border-white/10 flex justify-between items-center">
									<span className="text-retro-cyan font-bold font-vcr uppercase tracking-widest text-[10px]">
										Transaction ID
									</span>
									<span
										className={`px-2 py-0.5 text-[9px] font-bold font-vcr uppercase tracking-wider border ${
											tx.txn_status === "SUCCESS"
												? "bg-[#16a34a]/20 border-[#16a34a] text-[#16a34a]"
												: tx.txn_status === "FAILED"
													? "bg-red-500/20 border-red-500 text-red-500"
													: "bg-yellow-500/20 border-yellow-500 text-yellow-500"
										}`}
									>
										{tx.txn_status}
									</span>
								</div>

								<div className="col-span-3 pt-1">
									<p className="text-white font-vcr text-xs tracking-wider break-all">
										{tx.txn_id}
									</p>
								</div>

								<div className="col-span-2">
									<span className="text-white/40 font-bold font-vcr uppercase text-[10px] block mb-1">
										Date
									</span>
									<p className="text-white/80 text-xs font-vcr">
										{formatDateTime(tx.created_at)}
									</p>
								</div>

								<div className="col-span-1 text-right">
									<span className="text-white/40 font-bold font-vcr uppercase text-[10px] block mb-1">
										Amount
									</span>
									<p className="text-white font-bold text-sm">
										₹{tx.registration_fee?.toFixed(2) ?? "0.00"}
									</p>
								</div>

								{tx.txn_status === "PENDING" && (
									<div className="col-span-3 flex justify-end mt-2 pt-2 border-t border-white/5">
										<button
											type="button"
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
											disabled={verifyingTxId === tx.txn_id}
											className="flex items-center justify-center text-[10px] py-2 px-6 bg-[#7c3aed] border-2 border-black text-white font-bold font-vcr uppercase tracking-wider shadow-[3px_3px_0_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all"
										>
											{verifyingTxId === tx.txn_id ? (
												<Loader2 className="h-3 w-3 animate-spin mx-auto" />
											) : (
												"Verify Status"
											)}
										</button>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
