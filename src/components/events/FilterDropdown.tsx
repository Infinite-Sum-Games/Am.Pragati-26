import { motion } from "framer-motion";

interface FilterDropdownProps {
	label: string;
	open: boolean;
	setOpen: (open: boolean) => void;
	items: string[];
	selected: string[];
	setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FilterDropdown = ({
	label,
	open,
	setOpen,
	items,
	selected,
	setSelected,
}: FilterDropdownProps) => (
	<div className="relative">
		<button
			type="button"
			onClick={() => setOpen(!open)}
			className={`px-4 py-2 border-2 font-vcr text-sm transition-all duration-200 ${
				open 
					? "bg-[#7c3aed] border-black text-white shadow-[4px_4px_0_rgba(0,0,0,1)]"
					: "bg-black/40 backdrop-blur-sm border-retro-cyan/30 text-retro-cyan hover:border-[#a855f7]/50 hover:text-[#a855f7]"
			}`}
		>
			{label} {open ? "▲" : "▼"}
		</button>
		{open && (
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				className="absolute z-20 mt-2 p-3 space-y-2 min-w-50 bg-black/80 backdrop-blur-md border border-retro-cyan/30 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
			>
				{items.map((item: string) => (
					<label
						key={item}
						className={`flex gap-2 font-vcr text-sm cursor-pointer transition-colors ${
							selected.includes(item) ? "text-[#a855f7]" : "text-white/80 hover:text-retro-cyan"
						}`}
					>
						<input
							type="checkbox"
							checked={selected.includes(item)}
							onChange={() =>
								setSelected((prev: string[]) =>
									prev.includes(item)
										? prev.filter((i) => i !== item)
										: [...prev, item],
								)
							}
							className="accent-[#a855f7]"
						/>
						{item}
					</label>
				))}
			</motion.div>
		)}
	</div>
);
