interface FilterRadioPairProps {
	a: string;
	b: string;
	value: string | null;
	setValue: (value: string | null) => void;
}

export const FilterRadioPair = ({ a, b, value, setValue }: FilterRadioPairProps) => (
	<div className="flex gap-2">
		{[a, b].map((label) => {
			const v = label.toLowerCase().replace(" ", "-");
			const isActive = value === v;
			return (
				<button
					type="button"
					key={label}
					onClick={() => setValue(value === v ? null : v)}
					className={`px-4 py-2 border-2 font-vcr text-sm transition-all duration-200 ${
						isActive
							? "bg-[#7c3aed] border-black text-white shadow-[4px_4px_0_rgba(0,0,0,1)]"
							: "bg-black/40 backdrop-blur-sm border-retro-cyan/30 text-white/60 hover:border-[#a855f7]/50 hover:text-[#a855f7]"
					}`}
				>
					{label}
				</button>
			);
		})}
	</div>
);
