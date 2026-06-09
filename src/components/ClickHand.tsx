export function ClickHand({ style, className }: { style?: React.CSSProperties, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.25" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={style} 
      className={className}
    >
      <path d="M14 4.1L12 6" />
      <path d="M5.1 8l-2.9-.8" />
      <path d="M6 12l-1.9 2" />
      <path d="M7.2 2.2L8 5.1" />
      <path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z" />
    </svg>
  );
}
