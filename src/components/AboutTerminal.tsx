const AboutTerminal = () => {
  return (
    <div className="font-['VT323',monospace] text-[#00ff00] p-8">
      <div className="inline-flex items-center gap-1 mb-4">
        <span
          className="text-8xl"
          style={{
            textShadow: "3px 3px 0 rgba(0, 255, 0, 0.3)",
          }}
        >
          ABOUT
        </span>
        <span
          className="w-5 h-14 bg-[#00ff00] animate-blink"
          style={{
            boxShadow: "2px 2px 0 rgba(0, 255, 0, 0.5)",
          }}
        />
      </div>

      <div
        className="space-y-2 text-5xl"
        style={{
          textShadow: "2px 2px 0 rgba(0, 255, 0, 0.3)",
        }}
      >
        <div>&gt; Pragati</div>
        <div>&gt; Amrita</div>
        <div>&gt; ASB</div>
      </div>
    </div>
  );
};

export default AboutTerminal;
