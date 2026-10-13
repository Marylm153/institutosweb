const motifs = [
  (
    <svg key="arcs" viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M4 13a10 10 0 0 1 20 0" />
      <path d="M8.5 13a5.5 5.5 0 0 1 11 0" />
      <path d="M12.5 13a1.5 1.5 0 0 1 3 0" />
    </svg>
  ),
  (
    <svg key="waves" viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M3 5q3-3 6 0t6 0 6 0" />
      <path d="M3 9q3-3 6 0t6 0 6 0" />
      <path d="M3 13q3-3 6 0t6 0 6 0" />
    </svg>
  ),
  (
    <svg key="rays" viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M14 15V3" />
      <path d="M14 8.5 8.5 4" />
      <path d="M14 8.5 19.5 4" />
      <path d="M14 12.5 7.5 10" />
      <path d="M14 12.5 20.5 10" />
    </svg>
  ),
  (
    <svg key="dots" viewBox="0 0 28 16" fill="currentColor">
      <circle cx="6" cy="5" r="1.5" />
      <circle cx="14" cy="5" r="1.5" />
      <circle cx="22" cy="5" r="1.5" />
      <circle cx="10" cy="11" r="1.5" />
      <circle cx="18" cy="11" r="1.5" />
    </svg>
  ),
]

export default function GovStrip({ className }: { className?: string }) {
  return (
    <div className={`gov-strip${className ? ` ${className}` : ''}`} aria-hidden="true">
      {motifs.map((motif, index) => (
        <span className="gov-strip__module" key={index}>{motif}</span>
      ))}
    </div>
  )
}
