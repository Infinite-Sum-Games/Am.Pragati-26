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
			className="px-4 py-2 bg-black/80 border-2 border-retro-yellow/60 text-retro-yellow font-vcr text-sm hover:bg-retro-yellow/10 hover:shadow-[0_0_15px_rgba(244,208,62,0.4)] transition-all duration-300"
		>
			{label} {open ? "▲" : "▼"}
		</button>
		{open && (
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				className="absolute z-20 mt-2 bg-black/95 border-2 border-retro-yellow/60 p-3 space-y-2 min-w-50 shadow-[0_0_20px_rgba(244,208,62,0.3)]"
			>
				{items.map((item: string) => (
					<label
						key={item}
						className="flex gap-2 text-gray-300 font-vcr text-sm cursor-pointer hover:text-retro-yellow transition-colors"
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
							className="accent-retro-cyan"
						/>
						{item}
					</label>
				))}
			</motion.div>
		)}
	</div>
);
