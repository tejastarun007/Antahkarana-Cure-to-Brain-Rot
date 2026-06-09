import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// iOS touch icon dimensions
export const size = {
  width: 512,
  height: 512,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#08060f', // Pure dark edge-to-edge! No white corners.
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" width="460" height="460">
          <g opacity=".48">
            <ellipse cx="100" cy="22" rx="7" ry="20" fill="#c8902a" opacity=".42"/>
            <ellipse cx="100" cy="22" rx="7" ry="20" fill="#c8902a" opacity=".42" transform="rotate(45 100 100)"/>
            <ellipse cx="100" cy="22" rx="7" ry="20" fill="#c8902a" opacity=".42" transform="rotate(90 100 100)"/>
            <ellipse cx="100" cy="22" rx="7" ry="20" fill="#c8902a" opacity=".42" transform="rotate(135 100 100)"/>
            <ellipse cx="100" cy="22" rx="7" ry="20" fill="#c8902a" opacity=".42" transform="rotate(180 100 100)"/>
            <ellipse cx="100" cy="22" rx="7" ry="20" fill="#c8902a" opacity=".42" transform="rotate(225 100 100)"/>
            <ellipse cx="100" cy="22" rx="7" ry="20" fill="#c8902a" opacity=".42" transform="rotate(270 100 100)"/>
            <ellipse cx="100" cy="22" rx="7" ry="20" fill="#c8902a" opacity=".42" transform="rotate(315 100 100)"/>
          </g>
          <g opacity=".58">
            <ellipse cx="100" cy="42" rx="5" ry="14" fill="#e8b84b" opacity=".5"/>
            <ellipse cx="100" cy="42" rx="5" ry="14" fill="#e8b84b" opacity=".5" transform="rotate(60 100 100)"/>
            <ellipse cx="100" cy="42" rx="5" ry="14" fill="#e8b84b" opacity=".5" transform="rotate(120 100 100)"/>
            <ellipse cx="100" cy="42" rx="5" ry="14" fill="#e8b84b" opacity=".5" transform="rotate(180 100 100)"/>
            <ellipse cx="100" cy="42" rx="5" ry="14" fill="#e8b84b" opacity=".5" transform="rotate(240 100 100)"/>
            <ellipse cx="100" cy="42" rx="5" ry="14" fill="#e8b84b" opacity=".5" transform="rotate(300 100 100)"/>
          </g>
          <circle cx="100" cy="100" r="75" stroke="#c8902a" strokeWidth=".7" opacity=".28"/>
          <circle cx="100" cy="100" r="62" stroke="#c8902a" strokeWidth=".6" opacity=".22"/>
          <circle cx="100" cy="100" r="48" stroke="#e8b84b" strokeWidth=".8" opacity=".3"/>
          <circle cx="100" cy="100" r="34" stroke="#e8b84b" strokeWidth=".8" opacity=".36"/>
          <path d="M100 62 L132 116 L68 116 Z" stroke="#c8902a" strokeWidth=".7" fill="rgba(200,144,42,.04)" opacity=".4"/>
          <path d="M100 138 L68 84 L132 84 Z" stroke="#c8902a" strokeWidth=".7" fill="rgba(200,144,42,.04)" opacity=".4"/>
          <circle cx="100" cy="100" r="9" fill="rgba(232,184,75,.28)"/>
          <circle cx="100" cy="100" r="4" fill="#e8b84b" opacity=".65"/>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
