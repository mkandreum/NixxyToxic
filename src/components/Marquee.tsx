export default function Marquee({ text, reverse = false, bg = "bg-black", textCol = "text-[#dfff00]" }: { text: string, reverse?: boolean, bg?: string, textCol?: string }) {
  return (
    <div className={`border-y-4 border-black ${bg} ${textCol} overflow-hidden py-4 flex whitespace-nowrap`}>
      <div
        className={`text-4xl md:text-6xl uppercase tracking-widest flex font-mono glitch-text will-change-transform ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
      >
        <span>{text.repeat(10)}</span>
        <span aria-hidden="true">{text.repeat(10)}</span>
      </div>
    </div>
  );
}
