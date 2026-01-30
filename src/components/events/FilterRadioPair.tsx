interface FilterRadioPairProps {
	a: string;
	b: string;
	value: string | null;
	setValue: React.Dispatch<React.SetStateAction<any>>;
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
					onClick={() => setValue((prev: any) => prev === v ? null : v)}
					className={`px-4 py-2 border-2 font-vcr text-sm transition-all duration-300 ${
						isActive
							? "border-retro-cyan text-retro-cyan bg-retro-cyan/20 shadow-[0_0_15px_rgba(0,255,255,0.5)]"
							: "border-gray-600/60 text-gray-400 hover:border-retro-cyan/40 hover:text-gray-300"
					}`}
				>
					{label}
				</button>
			);
		})}
	</div>
);
