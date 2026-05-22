export function AnimatedGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="absolute left-1/3 top-20 h-44 w-44 rounded-full bg-[#00FF99]/20 blur-3xl animate-pulse-glow" />
      <div className="absolute right-1/4 top-40 h-56 w-56 rounded-full bg-[#00D1FF]/20 blur-3xl animate-pulse-glow" />
    </div>
  );
}


